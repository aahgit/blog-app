import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/appwriteConfig";
import { Container, PostCard } from "../components"
import authService from "../appwrite/appwriteAuth";

const Profile = () => {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("")
    const [editProfile, setEditProfile] = useState(false)

    const [Post, setPost] = useState([])

    const userData = useSelector(state => state.auth.userData)

    const updateAvatar = async (e) => {
        console.log(userData.prefs)
        if (userData.prefs) {
            if (userData.prefs.avatar == "65e02fc9d902a6543c0f") {
                return;
            } else {
                await service.deleteFlie(userData.prefs.avatar)
            }
        }
        if (e.target.files[0]) {
            const img = await service.uploadFlie(e.target.files[0])
            if (img) {
                await authService.updatePrefs({ avatar: img.$id, bio: userData.prefs.bio })
            }
        }


        console.log(userData.prefs)



    }








    const getAllPost = async () => {
        try {
            const res = await service.getallUsersPosts([])



            if (res && userData) {
                const userPosts = res.documents.filter(doc => doc.userid === userData.$id);

                setPost(userPosts);
            }



        } catch (error) {
            console.log("get all post error", error)
        }




    }

    console.log(userData)
    useEffect(() => {
        getAllPost()

            ; (async () => {
                if (userData) {
                    if (userData.prefs) {
                        const img = await service.getFilePreview(userData.prefs.avatar)
                        setAvatar(img)
                    }
                }
            })()
    }, [navigate, userData])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center flex-wrap">
                    <div className="mr-4">
                        {/* <div>user dp</div> */}
                        {avatar && <div className="flex flex-col  items-center "><img src={avatar} alt="User Avatar" className="w-16 h-16 rounded-full object-cover" />

                            {editProfile && <><label htmlFor="avatarInput" className="cursor-pointer text-blue-700">
                                Edit DP
                            </label>
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => { updateAvatar(e) }}
                                /></>}
                        </div>}
                    </div>
                    <div>
                        {userData && <>
                            <h2 className="text-2xl font-bold">{userData.name}</h2>
                            <p className="text-gray-600">User ID: {userData.$id}</p>
                            <h4 className="text-xl">Bio</h4>
                            {userData.prefs ? <p>{userData.prefs.bio}</p> : <p>no Bio</p>}

                        </>}
                    </div>
                </div>
                <div className="cursor-pointer hover:underline text-blue-700 text-xl" onClick={() => { setEditProfile(!editProfile) }}>Edit Profile</div>

            </div>
            <div className='w-full'>
                <Container>
                    <div className='flex flex-wrap gap-4 justify-center'>
                        {Post.length ? Post.map((p) => (
                            <div key={p.$id}>
                                <PostCard {...p} />
                            </div>
                        )) : <h1 className='text-xl'>No post</h1>}
                    </div>
                </Container>

            </div>
        </div >
    );
}

export default Profile
