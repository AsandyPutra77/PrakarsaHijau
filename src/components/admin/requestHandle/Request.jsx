import React, { useEffect, useState } from "react";
import { doc, updateDoc, deleteField, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";
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

export const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchRequests = async () => {
      const requestsCollection = collection(db, "upgradeRequests");
      const snapshot = await getDocs(requestsCollection);

      if (!snapshot.empty) {
        const requestWithUsernames = await Promise.all(
          snapshot.docs.map(async (requestDoc) => {
            const requestData = requestDoc.data();
            const userSnapshot = await getDoc(doc(db, 'users', requestData.userId));
            return { ...requestData, id: requestDoc.id, username: userSnapshot.data().displayName };
          })
        );
        setRequests(requestWithUsernames);
      } else {
        console.log("No such document!");
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  const changeUserRole = async (userId, newRole) => {
    const userRef = doc(db, 'users', userId);

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

  const handleStatusChange = async (requestId, newStatus) => {
    const requestRef = doc(db, 'upgradeRequests', requestId);
    const request = requests.find(req => req.id === requestId);

    if (newStatus === 'Granted') {
      await changeUserRole(request.userId, 'advance');
      await updateDoc(requestRef, {
        status: newStatus
      });
    } else if (newStatus === 'Denied') {
      await changeUserRole(request.userId, 'normal');
      await deleteDoc(requestRef);
    } else {
      await updateDoc(requestRef, {
        status: newStatus
      });
    }

    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  };

  const sortRequests = () => {
    const sortedRequests = [...requests].sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setRequests(sortedRequests);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={[2, 4, 5]} maxWidth={["90%", "85%", "80%"]} mx="auto" bg="gray.50" borderRadius="md" boxShadow="lg" mb={'8'} mt={8}>
      <Text fontSize={["lg", "xl", "2xl"]} mb={5} color="#0B9586" fontWeight="bold">Role Request Overview</Text>
      <Box overflowX="auto">
        <TableContainer>
          <Table variant="striped" colorScheme="green" size="sm" border='1px solid' borderColor="gray.500" borderRadius="md">
            <Thead bg="#6ED840">
              <Tr>
                <Th border="1px solid" borderColor="gray.500" color="white" onClick={sortRequests} cursor="pointer">
                  Date {sortOrder === 'asc' ? '↑' : '↓'}
                </Th>
                <Th border="1px solid" borderColor="gray.500" color="white">Day</Th>
                <Th border="1px solid" borderColor="gray.500" color="white">User ID</Th>
                <Th border="1px solid" borderColor="gray.500" color="white">Username</Th>
                <Th border="1px solid" borderColor="gray.500" color="white">Time Request</Th>
                <Th border="1px solid" borderColor="gray.500" color="white">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map(request => (
                <Tr key={request.id}>
                  <Td borderColor="gray.500">{request.date}</Td>
                  <Td borderColor="gray.500">{request.day}</Td>
                  <Td borderColor="gray.500">{request.userId}</Td>
                  <Td borderColor="gray.500">{request.username}</Td>
                  <Td borderColor="gray.500" color={request.timeRequest === "00:00" ? "red.500" : "blue.500"}>
                    {request.timeRequest}
                  </Td>
                  <Td borderColor="gray.500">
                    <Select
                      defaultValue={request.status}
                      onChange={e => handleStatusChange(request.id, e.target.value)}
                      variant="outline"
                      borderColor="gray.500"
                      width={["100px", "120px", "150px"]}
                      _focus={{ bg: request.status === 'Denied' ? 'red.300' : 'green.300' }}
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
      <Box mt={4} display="flex" justifyContent="center">
        {[...Array(totalPages)].map((_, i) => (
          <Button key={i} onClick={() => paginate(i + 1)} mx={1} colorScheme="green">
            {i + 1}
          </Button>
        ))}
      </Box>
      <Button leftIcon={<ArrowBackIcon />} colorScheme="green" mt={4} onClick={handleBack} mr={4}>
        Back
      </Button>
    </Box>
  );
};
