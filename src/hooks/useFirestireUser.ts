import { useState, useEffect } from 'react'
import { FIREBASE_DB } from '@/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const useFirestoreUser = uid => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    useEffect(() => {
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
                    setUserData(null) // Устанавливаем null, если пользователь не найден
                }

                setLoading(false)
            } catch (error) {
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
