import React from 'react'
import logo from '../assets/images/housesale.png'
import {
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from 'react-icons/ai'

export default function Header() {
  return (
    <div
      className="header items-center justify-between px-40 flex bg-lime-200 w-full"
      style={{ height: '6rem' }}
    >
      <div className="flex items-center gap-1">
        <img
          src={logo}
          className=" w-50 px-5 cursor-pointer"
          style={{ height: '80px' }}
        ></img>
        <AiOutlineFacebook
          size={30}
          className="cursor-pointer hover:bg-sky-200"
        />
        <AiOutlineYoutube
          size={30}
          className="cursor-pointer hover:bg-sky-200"
        />
        <AiOutlinePhone size={30} className="cursor-pointer hover:bg-sky-200" />
      </div>

      <div className=" flex gap-5">
        <div className=" flex items-center cursor-pointer">
          <AiOutlineWhatsApp size={30} className=" hover:bg-sky-200" />
          <h5>0222777999</h5>
        </div>
        <div className=" flex items-center cursor-pointer">
          <AiOutlineMail size={30} className=" hover:bg-sky-200" />
          <h5>housesale@gmail.com</h5>
        </div>
      </div>
    </div>
  )
}
