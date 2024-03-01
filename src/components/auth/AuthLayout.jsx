import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../features/authSlice'
import authService from '../../appwrite/appwriteAuth'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.auth.status)




    useEffect(() => {


        const checkCurrentUser = async () => {
            const userData = await authService.getCurrentUser()
            if (userData) {
                // console.log(userData)
                // navigate("/")
                return dispatch(authLogin(userData))
            } else {
                if (authentication && authStatus !== authentication) {

                    navigate("/login")
                } else if (!authentication && authStatus !== authentication) {


                    navigate("/")
                }
            }
        }

        checkCurrentUser()///


        setLoader(false)
    }, [authStatus, navigate, authentication])



    return loader ? <h1>Loading...</h1> : <>{children}</>
}