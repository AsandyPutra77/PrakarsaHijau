import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase"; // Import the Firestore instance
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Select,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const initialData = [
  { id: "1", date: "29 July 2023", day: "Monday", userId: "121hagsja", timeRequest: "18:00", status: "Granted" },
  { id: "2", date: "29 July 2023", day: "Saturday", userId: "4095alsfia", timeRequest: "00:00", status: "Denied" },
  { id: "3", date: "29 July 2023", day: "Saturday", userId: "asafh1240", timeRequest: "18:00", status: "Denied" },
  { id: "4", date: "29 July 2023", day: "Thursday", userId: "MKD2290j", timeRequest: "18:00", status: "Granted" },
  { id: "5", date: "29 July 2023", day: "Saturday", userId: "2enKlsdbal[", timeRequest: "18:00", status: "Granted" },
  { id: "6", date: "29 July 2023", day: "Saturday", userId: "mLAsk03ja", timeRequest: "18:00", status: "Granted" },
];

export const Request = () => {
  const [requests, setRequests] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
}


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await db.collection("requests").get();
        const requestsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(requestsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={5} maxWidth="80%" mx="auto">
      <Text fontSize="2xl" mb={5}>Role Request Overview</Text>
      <Box overflowX="auto">
        <TableContainer>
          <Table variant="striped" colorScheme="green" size="md" border="1px solid" borderColor="gray.500" borderRadius="md">
            <Thead>
              <Tr>
                <Th border="1px solid" borderColor="gray.500">Date</Th>
                <Th border="1px solid" borderColor="gray.500">Day</Th>
                <Th border="1px solid" borderColor="gray.500">User ID</Th>
                <Th border="1px solid" borderColor="gray.500">Time Request</Th>
                <Th border="1px solid" borderColor="gray.500">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map(request => (
                <Tr key={request.id}>
                  <Td border="1px solid" borderColor="gray.500">{request.date}</Td>
                  <Td border="1px solid" borderColor="gray.500">{request.day}</Td>
                  <Td border="1px solid" borderColor="gray.500">{request.userId}</Td>
                  <Td border="1px solid" borderColor="gray.500" color={request.timeRequest === "00:00" ? "red.500" : "blue.500"}>
                    {request.timeRequest}
                  </Td>
                  <Td border="1px solid" borderColor="gray.500">
                    <Select
                      value={request.status}
                      onChange={e => handleStatusChange(request.id, e.target.value)}
                      variant="outline"
                      borderColor="gray.500"
                      width="150px" // Adjust the width as needed
                      // Custom styling for options
                      _focus={{ bg: request.status === 'Denied' ? 'red' : 'green.300' }}
                    >
                      <option value="Granted">Granted</option>
                      <option value="Denied">Denied</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
