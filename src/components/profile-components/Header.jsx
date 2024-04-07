"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';
import { useRouter } from "next/navigation";

const Header = () => {
  const [userData, setUserData] = useState("username")
  const router = useRouter()
  const [buttonClicked, setButtonClicked] = useState(false)

  const getUserDetails = async() =>{
      const res = await axios.get('/api/users/userdata')
      console.log(res.data);
      setUserData(res.data.data.username)
  }
  const handleLogout = async ()=>{
    try {
      await axios.get("api/users/logout")
      console.log("successfully loggedout")
      router.push('/signin')
    } catch (error) {
      console.log(error.message)
    }
  }
useEffect(()=>{
  getUserDetails();
},[])
  return (
    <header className=".mx-auto lg:px-10 px-6 w-full flex justify-between text-white py-2 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] lugrasimo-regular">
      <div className="">
        <Link href="/">
          <h1 className="text-3xl">GenZid</h1>
        </Link>
      </div>
      <div className="flex flex-col item-center">
        <button onClick={()=>setButtonClicked(!buttonClicked)}>
          <FaCircleUser className="text-3xl"/>
        </button>
        {buttonClicked && <div className="absolute top-10 right-2 p-4 [&_*]:mb-2 bg-black">
            <h2>{userData === 'username' ? "Username" : `${userData}`}</h2>
            <p>settings</p>
            <p>Update</p>
            <button onClick={handleLogout}>Logout</button>
        </div>}
      </div>
    </header>
  );
};

export default Header;
