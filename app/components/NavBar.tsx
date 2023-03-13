'use client'

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

export default function NavBvar() {
  const { data, loading } = useContext(AuthenticationContext)
  const { logOut } = useAuth()

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
      <div>
        <div className="flex">
          {data ? <button onClick={logOut} className="p-1 px-4 rounded border">Log Out</button> :
            <>
              <AuthModal />
              <AuthModal isSignUp />
            </>
          }
        </div>
      </div>
    </nav>
  )
}