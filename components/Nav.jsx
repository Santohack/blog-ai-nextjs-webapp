"use client"

import Image from "next/image"
import Link from "next/link"
import { signOut,useSession,getProviders } from "next-auth/react"
import { useEffect, useState } from "react"
const Nav = () => {
    const isSignIn= true
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const Providers = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        Providers()
    },[])
  
  return (
  <nav className="flex justify-between items-center mb-16 pt-6 w-full">
    <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className="object-contain" />
       <p className="logo_text">Promptopia</p>
        </Link>
   {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isSignIn ? (
                <div className="flex gap-3 items-center">
                    <Link href="/create-prompt" className="black_btn">Create Post</Link>
                    <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                    <Link href="/profile">
                        <Image
                        src={"/assets/images/logo.svg"}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        />
                    </Link>
                </div>
            ): (
                <>
                    {
                        providers && Object.values(providers).map((provider) => (
                            <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
                        ))
                    }
                </>
            )}
        </div>
  {/* Mobile Navigation  */}
        <div className="sm:hidden flex ralative">
            {isSignIn ? (
                <div className="flex">
                    
                        <Image
                        src={"/assets/images/logo.svg"}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                        onClick={()=>setToggleDropdown((pre)=> !pre)}
                        />

                        {
                            toggleDropdown && (
                                <div className="dropdown absolute right-0 top-12 mt-3 w-[40vw] bg-white overflow-hidden rounded-lg shadow-lg">
                                    <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                        My Profile
                                    </Link>
                                    <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                        Create Prompt
                                    </Link>
  <button type="button" className="w-full black_btn" onClick={() => {
    setToggleDropdown(false)
    signOut()
  }}>Sign Out</button>
                                    </div> 
                            )
                        }
                  
                </div>
                
            ): (
                <>
                {
                    providers && Object.values(providers).map((provider)=>(
                        <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
                    ))
                }
                </>
            )}

        </div>
  </nav>
  )
}

export default Nav