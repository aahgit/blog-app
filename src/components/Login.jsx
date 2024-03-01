import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/appwriteAuth'
import { login as authLogin } from '../features/authSlice'



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [error, setError] = useState("")
  const navigat = useNavigate();
  const dispatch = useDispatch()


  const submitHandler = async (e) => {




    e.preventDefault()
    setError("")
    try {
      const user = await authService.login({ email, password })

      if (user) {
        const userData = await authService.getCurrentUser()

        console.log(userData)
        if (userData) {
          navigat("/")
          return dispatch(authLogin(userData))
        }

      } else if (!user) {
        // user already exist

        console.log(user)
      }
    } catch (error) {
      setError(error.massage)
      console.log(error)
    }
  }


  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="text" value={password} onChange={(e) => setPass(e.target.value)} />
        <button type='submit'>Login to your account</button>
      </form>
    </div>
  )
}

export default Login
