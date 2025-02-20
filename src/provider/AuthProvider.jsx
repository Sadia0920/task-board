import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from './../firebase/firebase.init';

export const AuthContext = createContext(null)

export default function AuthProvider({children}) {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Create User
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // SignIn User
    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // SignIn With Google
    const signInWithGoogle = () => {
        return signInWithPopup(auth,googleProvider)
    }

    // SignOut User
    const signOutUser = () => {
        setLoading(false)
        return signOut(auth)
    }

    // update user info
  const updateUserInfo = (profile) => {
    return updateProfile(auth.currentUser,profile)
  }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser => {
            if(currentUser){
                setUser(currentUser)
                setLoading(false)
            }
            return () => {
                unSubscribe();
            }
        })
    },[])

    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
        updateUserInfo,
    }
  return (
    <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
  )
}