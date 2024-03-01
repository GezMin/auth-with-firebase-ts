'use client'
import { FIREBASE_AUTH } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SingIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const logInUser = e => {
        e.preventDefault()

        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(userCredential => {
                const user = userCredential.user
                setEmail('')
                setPassword('')
                setError('')
                router.push('/')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className='w-full h-[90vh] flex justify-center items-center '>
            <div className='flex flex-col justify-center item-center gap-3 border w-[320px] border-slate-600 p-10 m-3'>
                <h1 className='text-2xl'>Log In</h1>
                <input
                    className='p-2 text-black'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className='p-2 text-black'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className='p-2 bg-slate-600 text-white hover:bg-slate-700'
                    onClick={logInUser}
                >
                    Log In
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    )
}

export default SingIn
