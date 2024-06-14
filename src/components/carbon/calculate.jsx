import React, { useState, useEffect } from 'react';
import { useFormCalculate } from '../../utils/hooks/useFormCalculate';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Grid,
  GridItem,
  Text,
  useToast,
  Stack,
  Heading,
  Icon,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  FaBolt,
  FaCar,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaTrash,
} from "react-icons/fa";
import {
  saveEmissionResult,
  clearEmissionHistory,
  listenToEmissionHistory,
} from "../../utils/history/firebaseHelper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const Calculate = () => {
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const unsubscribeHistory = listenToEmissionHistory(user.uid, (newHistory) => {
          const formattedHistory = newHistory.map((item) => ({
            ...item,
            timestamp: item.timestamp.toDate(),
          }));

          formattedHistory.sort((a, b) => b.timestamp - a.timestamp);
          setHistory(formattedHistory);
        });

        return () => unsubscribeHistory();
      } else {
        console.error("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateEmissions = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const emissions = inputs.electricityUsage * 0.5 + inputs.distanceTraveled * 0.3;
    let emissionStatus = "";

    if (emissions < 50) {
      emissionStatus = "Good";
    } else if (emissions < 100) {
      emissionStatus = "Ok";
    } else {
      emissionStatus = "Bad";
    }

    await saveEmissionResult(userId, emissions);

    let statusColor = "info";
    if (emissionStatus === "Bad") {
      statusColor = "error";
    } else if (emissionStatus === "Ok") {
      statusColor = "warning";
    }

    toast({
      title: "Emission Status",
      description: `Your carbon emissions are: ${emissions}. Emission status: ${emissionStatus}.`,
      status: statusColor,
      duration: 9000,
      isClosable: true,
    });

    setHistory((prevHistory) => [
      {
        emissions: emissions,
        timestamp: new Date(),
        ...prevHistory,
      },
    ]);
  };

  const handleClearHistory = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    await clearEmissionHistory(userId);
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "Emission history has been cleared successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const { inputs, handleInputChange, handleSubmit } = useFormCalculate(
    calculateEmissions
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem>
        <Box
          as="form"
          onSubmit={handleSubmit}
          p={4}
          borderWidth={2}
          borderRadius="lg"
          w="full"
          boxShadow="lg"
          bg="gray.50"
        >
          <Grid templateRows="repeat(5, 1fr)" gap={4}>
            <GridItem rowSpan={2} colSpan={1}>
              <Box
                bg="gray.900"
                color="white"
                borderRadius="md"
                p={4}
                textAlign="right"
                fontSize="2xl"
              >
                <Text>{`Electricity: ${inputs.electricityUsage || 0} kWh`}</Text>
                <Text>{`Distance: ${inputs.distanceTraveled || 0} km`}</Text>
              </Box>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl id="electricityUsage" isRequired>
                <FormLabel>Electricity Usage (kWh)</FormLabel>
                <Box position="relative">
                  <Box
                    position="absolute"
                    top="50%"
                    left="3px"
                    transform="translateY(-50%)"
                  >
                    <FaBolt color="gray.500" />
                  </Box>
                  <NumberInput min={0} w="full" ml={6} pr={6}>
                    <NumberInputField
                      name="electricityUsage"
                      onChange={handleInputChange}
                      value={inputs.electricityUsage || ""}
                      placeholder="Enter kWh used"
                    />
                  </NumberInput>
                </Box>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl id="distanceTraveled" isRequired>
                <FormLabel>Distance Traveled by Car (km)</FormLabel>
                <Box position="relative">
                  <Box
                    position="absolute"
                    top="50%"
                    left="3px"
                    transform="translateY(-50%)"
                  >
                    <FaCar color="gray.500" />
                  </Box>
                  <NumberInput min={0} w="full" ml={6} pr={6}>
                    <NumberInputField
                      name="distanceTraveled"
                      onChange={handleInputChange}
                      value={inputs.distanceTraveled || ""}
                      placeholder="Enter distance traveled"
                    />
                  </NumberInput>
                </Box>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                size="lg"
                w="full"
              >
                Calculate
              </Button>
            </GridItem>
          </Grid>
        </Box>
        <Box mt={4} p={4} borderWidth={2} borderRadius="lg" boxShadow="lg" bg="gray.50">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Carbon Emission Range:
          </Text>
          <Text>
            - Less than 50: Good
          </Text>
          <Text>
            - 50 to 100: OK
          </Text>
          <Text>
            - Greater than 100: Bad
          </Text>
        </Box>
        <Button mt={4} colorScheme='gray' onClick={() => navigate(-1)}>
          Back
        </Button>
      </GridItem>

      <GridItem>
        <Box
          p={4}
          borderWidth={2}
          borderRadius="lg"
          w="full"
          boxShadow="lg"
          bg="gray.50"
        >
          <Box p={4} borderBottomWidth={1} position={"sticky"}>
            <HStack spacing={4} justify="space-between">
              <Heading as="h3" size="lg">
                Emission History
              </Heading>
              <Button
                leftIcon={<FaTrash />}
                aria-label="Clear History"
                colorScheme="red"
                onClick={handleClearHistory}
                isDisabled={history.length === 0}
              >
                Clear History
              </Button>
            </HStack>
          </Box>
          <Stack spacing={4} pt={4}>
            {currentItems.length === 0 ? (
              <Text>No emission history found.</Text>
            ) : (
              currentItems.map((result, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  bg="white"
                >
                  <Text fontSize="lg">Emissions: {result.emissions}</Text>
                  <Text fontSize="sm">
                    Date:{" "}
                    {result.timestamp
                      ? new Date(result.timestamp).toLocaleString()
                      : "Unknown"}
                  </Text>
                  {index > 0 && (
                    <Text fontSize="sm">
                      Difference from newest calculation:{" "}
                      {Math.abs(
                        result.emissions - history[index - 1].emissions
                      ).toFixed(2)}
                      {result.emissions > history[index - 1].emissions ? (
                        <Icon as={FaArrowDown} color="green" ml={2} />
                      ) : result.emissions < history[index - 1].emissions ? (
                        <Icon as={FaArrowUp} color="red" ml={2} />
                      ) : (
                        <Icon as={FaEquals} color="blue" ml={2} />
                      )}
                    </Text>
                  )}
                </Box>
              ))
            )}
            {/* Pagination Controls */}
            <Flex justify="center" mt={4}>
              <Button
                onClick={() => paginate(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(Math.ceil(history.length / itemsPerPage))].map(
                (_, index) => (
                  <Button
                    key={index}
                    ml={2}
                    onClick={() => paginate(index + 1)}
                    colorScheme={currentPage === index + 1 ? "teal" : "gray"}
                  >
                    {index + 1}
                  </Button>
                )
              )}
              <Button
                onClick={() => paginate(currentPage + 1)}
                isDisabled={currentPage === Math.ceil(history.length / itemsPerPage)}
                ml={2}
              >
                Next
              </Button>
            </Flex>
          </Stack>
        </Box>
      </GridItem>
    </Grid>
  );
};
