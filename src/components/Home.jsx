import React, { useEffect, useState } from 'react'
import service from "../appwrite/appwriteConfig"
import { Container, PostCard } from '../components'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const [post, setPost] = useState([])






    useEffect(() => {
        (async () => {
            const res = await service.getallPosts([])
            if (res) {
                setPost(res.documents)

            }

        })()

    }, [navigate])
    console.log(post)


    return (
        <div className='w-full'>
            <Container>
                <div className='flex flex-wrap gap-4 justify-center'>
                    {post.length ? post.map((p) => (
                        <div key={p.$id}>
                            <PostCard {...p} />
                        </div>
                    )) : <h1 className='text-xl'>loading...</h1>}
                </div>
            </Container>

        </div>
    )
}

export default Home
