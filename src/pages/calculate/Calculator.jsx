import React from "react";
import { Box, Heading, Divider } from "@chakra-ui/react";
import { Calculate } from "../../components/carbon/calculate";

export const Calculator = () => {
    return (
        <Box p={4} bg="gray.50" minH="100vh">
            <Box mb={6} textAlign="center">
                <Heading as="h1" size="2xl" mb={2} bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">
                    Carbon Emission Calculator
                </Heading>
                <Divider orientation="horizontal" borderColor="teal.500" />
            </Box>
            <Calculate />
        </Box>
    );
};
