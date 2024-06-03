import React from "react";
import { DetailTips } from "../../components/tips/DetailTips";
import { NavBar } from "../../components/commons/NavigationBar";
import { Box } from "@chakra-ui/react";

export const DetailTipsPage = () => {
    return (
        <div>
             <NavBar />
             <Box pt="60px">
                 <DetailTips />
             </Box>
        </div>
    )
}