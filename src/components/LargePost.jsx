import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from './index'


const LargePost = () => {
    const [Post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()
    const [imgsrc, setimgsrc] = useState("")

    const userData = useSelector(state => state.auth.userData)

    const isAuthor = Post && userData ? Post.userid === userData.$id : false;





    const getPost = async () => {
        if (slug) {
            try {
                let res = await service.getPost(slug)
                if (res) {
                    setPost(res)
                } else { navigate('/') }

            } catch (error) {
                console.log(error)
            }
        } else { navigate("/") }

    }
    // console.log(Post)

    const getFeaturedImg = async () => {
        if (Post.featuredimg) {
            try {
                const img = await service.getFilePreview(Post.featuredimg)
                // console.log(Post)
                setimgsrc(img)
            } catch (error) {
                console.log(error)
            }

        }
    }

    const deletePost = async (e) => {
        e.preventDefault()
        const deletedPost = await service.deletePost(slug)
        if (deletedPost) {
            const deletedImg = await service.deleteFlie(Post.featuredimg)
            console.log(deletedImg)
            navigate("/")
        }

    }

    useEffect(() => {
        getPost()
        getFeaturedImg()

    }, [slug, navigate])
    useEffect(() => {
        getFeaturedImg()
    }, [Post])




    return (
        <Container>
            <div className='w-3/5 bg-black rounded-lg'>
                <div className='h-full w-full bg-slate-200 rounded-t-lg' >
                    <img className='rounded-t-lg w-full' src={imgsrc} alt={Post && Post.title} />
                </div >
                <h1 className='text-xl p-1 text-white'>{Post && Post.title}</h1>
                <h4 className='text-stone-200'>Description</h4>
                <p className='text-white'>{Post && Post.content}</p>
                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${Post.$id}`}>
                            <button className="bg-green-500 mr-3">
                                Edit
                            </button>
                        </Link>
                        <button className="bg-red-500" onClick={(e) => deletePost(e)}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default LargePost
