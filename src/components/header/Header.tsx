'use client'
import { FIREBASE_AUTH } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listener = onAuthStateChanged(FIREBASE_AUTH, user => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listener()
        }
    }, [])

    const logAuthUser = () => {
        FIREBASE_AUTH.signOut()
            .then(() => {
                setAuthUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <header className='w-full flex justify-center items-center h-14 bg-slate-600 '>
            <div className='sm:container sm:mx-auto w-full flex justify-between items-center space-x-5 px-3'>
                <Link href='/' className='text-white text-2xl font-bold  '>
                    YOU LOGO
                </Link>

                <div className='flex items-center space-x-5'>
                    {authUser ? (
                        <>
                            <Link
                                href='/profile'
                                className='cursor-pointer underline'
                            >
                                {authUser.email}
                            </Link>
                            <Link
                                href='#'
                                className='text-white cursor-pointer  hover:bg-slate-800 p-2  rounded-full shadow-md'
                                onClick={logAuthUser}
                            >
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <Link
                            href='/login'
                            className='text-white cursor-pointer  hover:bg-slate-800 p-2  rounded-full shadow-md'
                        >
                            Log In
                        </Link>
                    )}
                    {!authUser ? (
                        <Link
                            href='/singup'
                            className='text-white cursor-pointer  bg-slate-700 hover:bg-slate-800 p-2  rounded-full shadow-md'
                        >
                            Sing Up
                        </Link>
                    ) : null}
                </div>
            </div>
        </header>
    )
}

export default Header
