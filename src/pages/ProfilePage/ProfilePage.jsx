import { useParams } from "react-router-dom"
import ProfilePageHeader from "./ProfilePageHeader"
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername"
import ProfileGallery from "./ProfileGallery"

const ProfilePage = () => {
    const { username } = useParams()
    const { isLoading, userProfile } = useGetUserProfileByUsername(username)

    const userNotFound = !isLoading && !userProfile
    if (userNotFound) return <h1>Brak profilu o podanej nazwie</h1>

    return (
        <>
            { !isLoading && userProfile && <ProfilePageHeader /> }
            { !isLoading && userProfile && <ProfileGallery /> }
        </>
    )
}

export default ProfilePage