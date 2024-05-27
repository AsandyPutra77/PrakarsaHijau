import React from "react";
import { Article as Item} from "./item";
import { Box } from "@chakra-ui/react";

export const List = () => {
    return (
        <Box maxW="100vw" mx="auto" mt={5} p={4}>
            <Item />
        </Box>
    )
}