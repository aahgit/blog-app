import React, { useEffect, useState } from 'react'
import service from "../appwrite/appwriteConfig"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimg, content, likes }) {
  const [imgsrc, setimgsrc] = useState("")
  const [like, setlike] = useState(likes)

  const liked = async () => {
    setlike(like + 1)
    try {
      await service.updatePost($id, {
        title, content, featuredimg, likes: like
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    (async () => {
      const img = await service.getFilePreview(featuredimg)
      setimgsrc(img)
    })()

  }, []);


  return (

    <div className='w-64 bg-black rounded-lg flex flex-col text-wrap'>

      < div className='h-full w-full bg-slate-200 rounded-t-lg' >
        <Link to={`/post/${$id}`}>
          <img className='rounded-t-lg' src={imgsrc} alt={title} />
        </Link>
      </div >

      <div className='flex items-center justify-between px-2'>
        <h1 className='text-white cursor-pointer' onClick={liked}>Like {likes}</h1>
        <h1 className='text-white'>Comments 100</h1>
      </div>
      <h1 className='text-xl p-1 text-white'>{title}</h1>

    </div >

  )
}


export default PostCard

