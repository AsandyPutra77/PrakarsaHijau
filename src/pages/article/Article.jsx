import { NavBar } from "../../components/commons/NavigationBar"
import { List} from "../../components/article/list"
import { Box } from "@chakra-ui/react"

export const Article = () => {
    return (
        <div>
            <NavBar/>
            <Box pt="60px">
                <List />
            </Box>
        </div>
    )
}