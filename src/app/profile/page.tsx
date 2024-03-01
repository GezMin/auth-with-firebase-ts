'use client'
import { FIREBASE_AUTH } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import useFirestoreUser from '../../hooks/useFirestireUser'
import Image from 'next/image'
import infinityLoading from './infinityLoading.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const page = () => {
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

    const { userData, loading, error } = useFirestoreUser(authUser?.uid)

    if (loading) {
        return (
            <div className='w-full h-[90vh] flex  flex-col justify-center items-center '>
                <Image
                    src={infinityLoading}
                    alt='loading'
                    width={150}
                    height={150}
                    priority={true}
                />
                {!authUser && (
                    <Link
                        className='text-white rounded-full bg-slate-600 px-5 py-2 hover:bg-slate-700'
                        href='/login'
                    >
                        Login
                    </Link>
                )}
            </div>
        )
    }

    if (error) {
        return (
            <div className='w-full h-[90vh] flex justify-center items-center '>
                Error: {error.message}
            </div>
        )
    }

    if (!userData) {
        return (
            <div className='w-full h-[90vh] flex justify-center items-center '>
                User not found
            </div>
        )
    }

    return (
        <div className='w-full h-[90vh] flex flex-col justify-center items-center gap-3'>
            {authUser && (
                <>
                    <h2 className='text-2xl'>User Profile:</h2>
                    <p>Name: {userData.name}</p>
                    <p>Money: {userData.money}</p>
                </>
            )}
        </div>
    )
}

export default page
