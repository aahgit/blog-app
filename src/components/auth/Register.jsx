import React, { useState } from 'react'
import authService from '../../appwrite/appwriteAuth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../../features/authSlice"


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [error, setError] = useState("")
  const navigat = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const user = await authService.createAccount({ email, password, name })

      if (user) {
        const userData = await authService.getCurrentUser()
        await authService.updatePrefs({ avatar: "65e02fc9d902a6543c0f", bio: null })
        console.log(userData)
        if (userData) {
          console.log(userData)
          dispatch(authLogin(userData))
        }
        navigat("/")
      } else if (!user) {
        // user already exist
        // navigat("/login")
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
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="text" value={password} onChange={(e) => setPass(e.target.value)} />
        <button type='submit'>Create Account</button>
      </form>
    </div>
  )
}

export default Register
