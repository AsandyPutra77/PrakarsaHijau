import React from "react";
import { Spinner, Text, Flex } from "@chakra-ui/react";

export const Loading = () => {
    return (
        <Flex direction='column' justify="center" align="center" h="100vh">
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.500"
            size="xl"
        />
        <Text fontSize="xl" fontWeight="bold" color="green.500" mt={4}>
            Loading...
        </Text>
        </Flex>
    );
}