import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
// import { RiTwitterXLine } from "react-icons/ri";
import { TiHome } from "react-icons/ti";

export default function Sidebar() {
  return (
    <div>
      <Link href='/'>
        <FaXTwitter />
      </Link>
      <Link href='/'>
        <TiHome />
      </Link>
    </div>
  )
}
