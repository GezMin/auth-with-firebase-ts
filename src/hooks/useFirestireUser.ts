import { useState, useEffect, SetStateAction } from 'react'
import { FIREBASE_DB } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { Error, UserData } from '@/types/types'

const useFirestoreUser = (uid: string) => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setUserData(null)
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(FIREBASE_DB, 'users', uid)
                const userDocSnapshot = await getDoc(userDocRef)

                if (userDocSnapshot.exists()) {
                    const userDataFromSnapshot: UserData = {
                        id: userDocSnapshot.id,
                        name: userDocSnapshot.data().name,
                        money: userDocSnapshot.data().money,
                        createdAt: userDocSnapshot.data().createdAt,
                        address: userDocSnapshot.data().address,
                    }
                    setUserData(userDataFromSnapshot)
                } else {
                    setUserData(null)
                }

                setLoading(false)
            } catch (error: Error | any) {
                console.error(error || error.message)
                setError(error)
                setLoading(false)
            }
        }

        if (uid) {
            fetchUserData()
        }
    }, [uid])

    return { userData, loading, error }
}

export default useFirestoreUser
