import { NavBar } from "../../components/commons/NavigationBar"
import { ProfileCard } from "../../components/commons/ProfileCard"
import { Box } from "@chakra-ui/react"

export const Profile = () => {
    return (
        <div>
            <NavBar/>
            <Box pt="auto">
                <ProfileCard/>
            </Box>
        </div>
    )
}