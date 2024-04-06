"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const signin = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log("signin successful", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("Signin Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-[calc(100vh-40px)] bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-auto flex justify-center items-center">
      <div className="flex justify-center items-center text-white w-[440px] bg-gradient-to-r from-[#2a0845] to-[#1d2671] rounded-2xl shadow-xl shadow-[#002]">
        <div className="flex flex-col w-[340px] p-10 [&_*]:outline-none [&_input]:text-black">
          <h2 className="text-4xl -mt-16 mb-4 text-center font-bold lugrasimo-regular z-10">
            Signin
          </h2>
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-black rounded-lg mt-4 p-1 hover:bg-[#845EC2] transition duration-300 ease-in-out"
            onClick={onSignin}
          >
            {buttonDisabled ? "no signup" : "Signin"}
          </button>
          <div className="text-center">{loading && <p>Processing...</p>}</div>
          <p className="text-center mt-4 text-slate-400">
            Getting Started?
            <Link href="/signup" className="pl-1 text-white">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default signin;
