import React, {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import Home from './Home'
import Login from '../Login/Login'

const Index = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) return setUser(null)
            return setUser(user)
        })
    }, [])
  return (
    <div>
        {user ? <Home /> : <Login />}
    </div>
  )
}

export default Index