import React, { useEffect, useState } from "react";
import { doc, updateDoc, deleteField, deleteDoc} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import {
  Box,
  Button,
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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsCollection = collection(db, "upgradeRequests");
      const snapshot = await getDocs(requestsCollection);

      if (!snapshot.empty) {
        setRequests(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } else {
        console.log("No such document!");
      }
      
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const changeUserRole = async (id, newRole) => {
    const userRef = doc(db, 'users', id);
    
    if (newRole === 'advance') {
      await updateDoc(userRef, {
        role: newRole,
        status: 'success'
      });
    } else if (newRole === 'normal') {
      await updateDoc(userRef, {
        role: newRole,
        status: deleteField()
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const requestRef = doc(db, 'upgradeRequests', id);
  
    if (newStatus === 'Granted') {
      await changeUserRole(id, 'advance');
      await updateDoc(requestRef, {
        status: newStatus
      });
    } else if (newStatus === 'Denied') {
      await changeUserRole(id, 'normal');
      await deleteDoc(requestRef);
    } else {
      await updateDoc(requestRef, {
        status: newStatus
      });
    }
  
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
          <Table variant="striped" colorScheme="green" size="md" border='1px solid' borderColor="gray.500" borderRadius="md">
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
                <Tr key={request.id} >
                  <Td borderColor="gray.500">{request.date}</Td>
                  <Td borderColor="gray.500">{request.day}</Td>
                  <Td borderColor="gray.500">{request.userId}</Td>
                  <Td borderColor="gray.500" color={request.timeRequest === "00:00" ? "red.500" : "blue.500"}>
                    {request.timeRequest}
                  </Td>
                  <Td borderColor="gray.500">
                    <Select
                      defaultValue={request.status}
                      onChange={e => handleStatusChange(request.id, e.target.value)}
                      variant="outline"
                      borderColor="gray.500"
                      width="150px"
                      _focus={{ bg: request.status === 'Denied' ? 'red' : 'green.300' }}
                    >
                      <option value="Pending">Pending</option>
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

        <Button leftIcon={<ArrowBackIcon />} colorScheme="green" mt={4} onClick={handleBack} mr={4}>
            Back
        </Button>
    </Box>
  );
};