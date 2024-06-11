import React, { useEffect, useState } from "react";
import { Grid, Center, VStack, Text, Box, Heading } from "@chakra-ui/react";
import { ItemTips } from "./ItemTips";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loading } from "../helper/Loading";
import { SearchBar } from "../helper/SearchBar";

export const ListTips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("likes");

    const handleSearchResults = (results) => {
        setTips(results);
    };

    const resetTips = async () => {
        setLoading(true);
        try {
            const tipsCollection = collection(db, "tips");
            const tipsSnapshot = await getDocs(tipsCollection);
            const tipsList = tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTips(tipsList);
        } catch (error) {
            console.error("Error fetching tips:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resetTips();
    }, []);

    if (loading) {
        return (
            <Center h="100vh">
                <Loading />
            </Center>
        );
    }

    return (
        <VStack spacing={6} mt={2} width="100%">
            <Box width="100%" padding={4}>
                <Heading as="h2" size="lg" mb={4} textColor={'#0B9586'}>Search Tips</Heading>
                <SearchBar 
                    onResults={handleSearchResults} 
                    onReset={resetTips} 
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            </Box>
            {tips.length > 0 ? (
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} width="100%">
                    {tips.map((tip, index) => (
                        <ItemTips key={index} id={tip.id} tip={tip} />
                    ))}
                </Grid>
            ) : (
                <Text fontSize="xl" color="gray.500" mt={10}>
                    No tips found.
                </Text>
            )}
        </VStack>
    );
};
