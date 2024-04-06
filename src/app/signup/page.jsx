"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const[loading, setLoading] = useState(false)

  //on signup button click
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("signup successful", response.data);
      router.push("/signin")
    } catch (error) {
      console.log("signup failed",error.message);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.username.length>0 && user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <main className="w-full h-[calc(100vh-40px)] bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-auto flex justify-center items-center">
      <div className="flex justify-center items-center text-white w-[440px] bg-gradient-to-r from-[#2a0845] to-[#1d2671] rounded-2xl shadow-xl shadow-[#002]">
        <div
          className="flex flex-col w-[340px] p-10 [&_*]:outline-none [&_input]:text-black"
        >
          <h2 className="text-4xl -mt-16 mb-4 text-center font-bold lugrasimo-regular z-10">
            Signup
          </h2>
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input
            type="text"
            name=""
            id="username"
            className="rounded-lg p-1 px-2 mb-3"
            placeholder="username"
            value={user.username}
            onChange={(e)=>setUser({...user, username:e.target.value})}
          />
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            name=""
            id="email"
            className="rounded-lg p-1 px-2 mb-3"
            placeholder="@gmail.com"
            value={user.email}
            onChange={(e)=>setUser({...user, email:e.target.value})}
          />
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            name=""
            id="password"
            className="rounded-lg p-1 px-2 mb-3"
            placeholder="password"
            value={user.password}
            onChange={(e)=>setUser({...user, password:e.target.value})}
          />
          <button
            type="submit"
            className="bg-black rounded-lg mt-4 p-1 hover:bg-[#845EC2] transition duration-300 ease-in-out"
            onClick={onSignUp}
          >
            {buttonDisabled ? "no signup" : "Signup"}
          </button>
          <div className="text-center">
          {loading && <p>Processing...</p>}
          </div>
          <p className="text-center mt-4 text-slate-400">
            Already have an account?
            <Link href="/signin" className="pl-1 text-white">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default signup;
