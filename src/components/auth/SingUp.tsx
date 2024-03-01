'use client'
import { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [copyPassword, setCopyPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const saveDataToUser = async userUID => {
        const userDocRef = doc(FIREBASE_DB, 'users', userUID)
        try {
            await setDoc(userDocRef, {
                // можно добавить любые  данные по умолчанию в firestore
                name,
                money: 5000, // default value
                createdAt: serverTimestamp(),
                address: '',
            })
        } catch (error) {
            console.error('Error saving user data:', error)
        }
    }

    const registerUser = async e => {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password,
            )
            const user = userCredential.user
            setName('')
            setEmail('')
            setPassword('')
            setCopyPassword('')
            setError('')
            await saveDataToUser(user.uid)
            router.push('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='w-full h-[90vh] flex justify-center items-center '>
            <div className='flex flex-col justify-center item-center gap-3 border w-[320px] border-slate-600 p-10 m-3'>
                <h1 className='text-2xl'>Registration</h1>
                <input
                    value={name}
                    className='p-2 text-black'
                    type='text'
                    placeholder='Name or nickname'
                    onChange={e => setName(e.target.value)}
                />
                <input
                    value={email}
                    className='p-2 text-black'
                    type='email'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    className='p-2 text-black'
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    value={copyPassword}
                    className='p-2 text-black'
                    type='password'
                    placeholder='Password'
                    onChange={e => setCopyPassword(e.target.value)}
                />

                <button
                    className='p-2 bg-slate-600 text-white hover:bg-slate-700'
                    onClick={registerUser}
                >
                    SingUp
                </button>
                {error ? <p className='text-red-500'>{error}</p> : null}
            </div>
        </div>
    )
}

export default SignUp
