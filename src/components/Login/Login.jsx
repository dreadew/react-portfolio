import React, { useState } from 'react'
import styles from './Login.module.scss'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      toast.success('Success!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    catch (error)
    {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setErrorMsg(error.message);
    }
  }
  return (
    <section className={styles['dashboard-login']}>
        <div className={styles['login-wrapper']}>
          <input className={styles['login-input']} type="email" placeholder='Enter your email' onChange={(event) => {setRegisterEmail(event.target.value)}}/>
          <input className={styles['login-input']} type="password" placeholder='Enter your password' onChange={(event) => {setRegisterPassword(event.target.value)}}/>
          <button onClick={login} className={styles['login-btn']}>
              Sign in
          </button>
        </div>
    </section>
  )
}

export default Login