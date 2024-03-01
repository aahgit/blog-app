import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadForm } from '../index'
import service from '../../appwrite/appwriteConfig'

const EditPost = () => {
    const [post, setPost] = useState([])
    const { ParamsSlug } = useParams()
    const navigate = useNavigate()

    const getPost = async () => {
        if (ParamsSlug) {
            try {
                let res = await service.getPost(ParamsSlug)
                if (res) {
                    setPost(res)
                } else { navigate('/') }

            } catch (error) {
                console.log(error)
            }
        } else { navigate("/") }

    }

    useEffect(() => {
        getPost()
    }, [ParamsSlug, navigate])


    return (
        <div>
            <UploadForm post={post} />
        </div>
    )
}

export default EditPost
