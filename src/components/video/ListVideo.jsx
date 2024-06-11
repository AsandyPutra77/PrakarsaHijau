import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { videos } from "../../utils/mock/mockData";
import { ItemVideo } from "./ItemVideo";

export const ListVideo = () => {
  return (
    <Box p="6">
      <Flex align="center" mb="6">
        <Heading as="h1" size="lg">Environment Videos</Heading>
        <Text fontSize="7xl" ml="2">🌳</Text>
      </Flex>
      <Flex overflowX="auto" py="2">
        {videos.map((video) => (
          <ItemVideo key={video.id} video={video} />
        ))}
      </Flex>
    </Box>
  );
};