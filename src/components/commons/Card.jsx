/* eslint-disable no-unused-vars */
import { 
    Card as ChakraCard, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Avatar,
    Button,
    Flex,
    Heading,
    Text,
    Image,
    IconButton,
    Box

} from '@chakra-ui/react';
import {timeFormatter} from '../../utils/formatter/timeFormatter.js';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

export const Card = ({
    owner, 
    createdAt,
    isShowContent,
    category,
    title,
    content,
    actions,
}) => {
    return (
        <ChakraCard maxW="md">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
    
                <Box>
                  <Heading size="sm">{"Asandy"}</Heading>
                  <Text>{parse(content)}</Text>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              With Chakra UI, I wanted to sync the speed of development with the
              speed of design. I wanted the developer to be just as excited as the
              designer to create a screen.
            </Text>
          </CardBody>
          <Image
            objectFit="cover"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Chakra UI"
          />
    
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost">
              Like
            </Button>
            <Button flex="1" variant="ghost">
              Comment
            </Button>
            <Button flex="1" variant="ghost">
              Share
            </Button>
          </CardFooter>
        </ChakraCard>
      );
}