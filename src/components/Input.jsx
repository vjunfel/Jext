'use client'

import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { app } from "@/app/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp, getFirestore } from 'firebase/firestore'

export default function Input() {
  const { data: session } = useSession()
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState(false)
  // console.log(imageFileUrl)
  const db = getFirestore(app)
  const imagePickRef = useRef(null)
  const addImageToPost = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage()
    }
  }, [selectedFile])

  const uploadImageToStorage = () => {
    uploadImageToStorage(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' + selectedFile.name // Add date and time to make every filename unique.
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.log(error)
        setImageFileUploading(false)
        setImageFileUrl(null)
        setSelectedFile(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleSubmit = async () => {
    setPostLoading(true)
    const docRef = await addDoc(collection(db, 'post'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
      image: imageFileUrl,
    })
    setPostLoading(false)
    setText('')
    setImageFileUrl(null)
    setSelectedFile(null)
  }

  if(!session) return null;
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
      <img 
        src={session.user.image} 
        alt='user-img' 
        className="h-10 w-10 rounded-full cursor-pointer hover:brightness-90" />
      <div className="w-full divide-y divide-gray-200">
        <textarea 
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          placeholder="What's happening?" 
          rows="2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        { selectedFile && (
            <img src={imageFileUrl} 
              alt='image' 
              className={`w-full max-h-[250px] object-cover cursor-pointer
              ${imageFileUploading ? 'animate-pulse' : ''}`}
            />
        )}
        <div className="flex justify-between items-center pt-2.5">
          <HiOutlinePhotograph 
            onClick={() => imagePickRef.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"/>
          <input 
            type='file' 
            ref={imagePickRef} 
            accept='image/*' 
            onChange={addImageToPost}
            hidden
          />
          <button 
            disabled={text.trim() === '' || postLoading || imageFileUploading}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95"
            onClick={handleSubmit}
          >Post</button>
        </div>
      </div>
    </div>

  )
}
