import React from "react";
import { Box, Heading, Text, VStack, HStack, Image, Tag, TagLabel, TagRightIcon} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";

export const ItemTips = ({ tip }) => {
    return (
        <Box
            bg="#ffffff"
            color="#333"
            borderRadius="lg"
            m={4}
            p={5}
            boxShadow="2xl">
            <Heading mb={4} fontSize="2xl" textAlign="center">{tip.title}</Heading>
            <VStack spacing={3} align="start">
                <Image  objectFit='cover'  h={300} w='100%' src={tip.imageUrl} alt={tip.title} />

                <HStack spacing={4}>
                {['md'].map((size) => (
                    <Tag size={size} key={size} variant='outline' colorScheme='blue'>
                    <TagLabel>#{tip.tag}</TagLabel>
                    <TagRightIcon as={IoIosPricetags} />
                    </Tag>
                ))}
                </HStack>
                <VStack spacing={3} align="start">
                    <Text fontSize="xl" mb={2}><strong>Description:</strong></Text>
                    <Text fontSize="xl" mb={2}>{tip.description}</Text>
                </VStack>
            </VStack>
        </Box>
    )
}