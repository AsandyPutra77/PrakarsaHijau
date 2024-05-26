import { Box, Flex, Image, HStack, Button, Spacer, Text } from "@chakra-ui/react"

export const NavBar = () => {
    return (
        <Box bg="green" w="100%" p={4} color={"white"}>
            <Flex>
                <Text m="10px">PrakarsaHijau</Text>
            <HStack spacing="24px" ml="20%">
                <Box>
                    Home
                </Box>
                <Box>
                    Tips
                </Box>
                <Box>
                    Contribute
                </Box>
                <Box>
                    About Us
                </Box>
            </HStack>
            <Spacer/>
            <HStack>
            <Button>Log Out</Button>
            <Image
                borderRadius='full'
                boxSize='30px'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
                />
            </HStack>
            </Flex>

        </Box>
    )
}