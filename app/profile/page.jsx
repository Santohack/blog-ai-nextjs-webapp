"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch (`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
            setPosts(data)
        }
       if(session?.user?.id) fetchData();
    },[])
    const handleEdit = () => {};
    const handleDelete = () => {};
    console.log("posts", posts);
  return (
    <Profile
     name="My"
     desc="Welcome to your personalized profile page"
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />
  )
}

export default MyProfile