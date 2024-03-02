import firebase from 'firebase/compat/app'

export interface CustomError {
    message: string
}

export interface UserData {
    id: string
    name: string
    money: number
    createdAt: firebase.firestore.Timestamp
    address: string
}
export interface FirestoreUserData {
    userData: UserData | null
    loading: boolean
    error: Error | null
}
