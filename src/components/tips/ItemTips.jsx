import React from "react";
import { Box, Heading, Text, HStack, Image, Tag, TagLabel, TagRightIcon, Link as ReactRouterLink} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { IoIosPricetags } from "react-icons/io";
import { Link } from "react-router-dom";

export const ItemTips = ({ tip }) => {
    return (
        <Box 
            m={4} 
            bg="#FFFFFF" 
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)" 
            width="auto" 
            height="auto"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Image 
                height="200px"
                width="435px"
                src={tip.imageUrl} 
                alt={tip.title} 
                objectFit="cover"
            />

            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="stretch" 
                padding="20px" 
                gap="24px"
                flex='1'
            >
                <Heading 
                    fontFamily="'Inter'" 
                    fontWeight="600" 
                    fontSize="20px" 
                    lineHeight="30px" 
                    color="#101828"
                >
                    {tip.title}
                </Heading>

                <HStack spacing={4}>
                    {['md'].map((size) => (
                        <Tag size={size} key={size} variant='outline' colorScheme='blue'>
                        <TagLabel>#{tip.tag}</TagLabel>
                        <TagRightIcon as={IoIosPricetags} />
                        </Tag>
                    ))}
                </HStack>

                <Text 
                    fontFamily="'Inter'"
                    flex='1'
                >
                    {tip.description}
                </Text>

                <Link as={ReactRouterLink} to={`/tips/${tip.id}`}>
                <Text
                    fontFamily="'Inter'"
                    fontSize='16px'
                    color="#3CAB90"
                    flex='1'
                >
                    Lihat Details <ArrowForwardIcon />
                </Text>
            </Link>
            </Box>
        </Box>
    )
}