import { useState, useEffect, SetStateAction } from 'react'
import { FIREBASE_DB } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

interface Error {
    message: string
}

const useFirestoreUser = (uid: string) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setUserData(null as SetStateAction<null>)
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(FIREBASE_DB, 'users', uid)
                const userDocSnapshot = await getDoc(userDocRef)

                if (userDocSnapshot.exists()) {
                    setUserData({
                        id: userDocSnapshot.id,
                        ...userDocSnapshot.data(),
                    })
                } else {
                    // Устанавливаем null, если пользователь не найден
                    setUserData(null)
                }

                setLoading(false)
            } catch (error: Error | any) {
                console.error('Error fetching user data:', error)
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
