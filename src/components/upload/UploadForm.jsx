import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/appwriteConfig'
import { Container } from '../index'


const UploadForm = ({ post }) => {
    const [loader, setloader] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // setTitle(post?.content || "")
    const [slug, setSlug] = useState("")
    // setTitle(postdata?.slug || "")
    const [img, setImg] = useState("")///
    // setTitle(postdata?.img || "")
    const [status, setStatus] = useState("active")
    // setStatus(postdata?.status || "active")
    const [imgsrc, setimgsrc] = useState("")
    const setVal = async () => {
        if (post) {
            setTitle(post.title || "")
            setContent(post.content || "")
            setImg(post.featuredimg || "")
            setStatus(post.status || "")
            console.log(post)
        }
    }


    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    




    const uploadImg = async (e) => {
        setloader(true)
        if (e.target.files[0]) {
            try {
                const file = await service.uploadFlie(e.target.files[0])
                setImg(file.$id)
                console.log(file.$id)
            } catch (error) {
                console.log("img uploading to appwrite error", error)
            }
        }
        setloader(false)

    }

    const deleteImg = async (e) => {
        e.preventDefault()
        setloader(true)
        if (img) {
            await service.deleteFlie(img)
            setImg("")
            setimgsrc("")
        }
        setloader(false)

    }



    useEffect(() => {

        if (img) {
            (async () => {

                const image = await service.getFilePreview(img)
                setimgsrc(image)
                // console.log(image)

            })()



        }

    }, [img]);

    const submit = async (e) => {

        // create new post
        e.preventDefault()

        // const featuredimg = img
        // const fileId = img
        if (!post) {
            if (img) {
                await service.createPost({
                    title, slug, content, featuredimg: img, status, userid: userData.$id
                })
            }

        } else if (post) {
            if (img) {
                await service.updatePost(post.$id, {
                    title, content, featuredimg: img, status
                })
            }


        }
        navigate("/")

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        setVal()
    }, [navigate, post])



    useEffect(() => {
        setSlug(slugTransform(title))
    }, [title])



    return (
        <div className=' w-full bg-slate-500 flex flex-col items-center justify-center'>
            {imgsrc ? (<div className='w-80 h-56'><img className='w-full' src={imgsrc} alt="" /></div>) : (<div>Select an image</div>)}

            {loader && <div>Loading please wait...</div>}
            <form className='h-96 flex flex-col w-3/6' onSubmit={(e) => { submit(e) }}>
                <label>Image</label>
                {/* {img.length < 0 && <div className='h-11 w-11 bg-gray-950'></div>} */}
                <div>
                    <input type="file" onChange={(e) => { uploadImg(e) }} />
                    <button onClick={(e) => deleteImg(e)}>Delete</button>
                </div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <label>Content</label>
                <input type="text" value={content} onChange={(e) => { setContent(e.target.value) }} />
                <label>Slug</label>
                <input type="text" value={slug} onChange={(e) => { e.target.value = slug }} /> {/**/}
                <label>Status</label>
                <select defaultValue={"active"} onChange={(e) => { setStatus(e.target.value) }}>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                </select>
                <button type='submit'>post</button>
            </form>

        </div>
    )
}

export default UploadForm
