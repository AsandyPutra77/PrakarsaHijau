import React from "react";
import { ListTips } from "../../components/tips/ListTips";
import { NavBar } from "../../components/commons/NavigationBar";
import { Box } from "@chakra-ui/react";

export const Tips = () => {
    return (
        <div>
             <NavBar />
             <Box pt="60px">
                 <ListTips />
             </Box>
        </div>
    )
}