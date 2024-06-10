import React, { useState, useCallback } from "react";
import { Input, Box, HStack } from "@chakra-ui/react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import debounce from "lodash.debounce";

export const SearchBar = ({ onResults, onReset }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = useCallback(
        debounce(async (searchTerm) => {
            if (searchTerm.trim() === "") {
                onReset();
                return;
            }

            const tipsCollection = collection(db, "tips");
            const tipsSnapshot = await getDocs(tipsCollection);
            const tipsList = tipsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const filteredTips = tipsList.filter((tip) => {
                const titleMatch = tip.title.toLowerCase().includes(searchTerm.toLowerCase());
                const tagMatch = tip.tag.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                return titleMatch || tagMatch;
            });

            onResults(filteredTips);
        }, 500),
        [onResults, onReset]
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <Box width="100%" padding={4}>
            <HStack>
                <Input
                    placeholder="Search tips or tags..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size="md"
                    border="1px"
                    borderColor="gray.300"
                    focusBorderColor="teal.500"
                    width={{ base: "100%", md: "80" }}
                    maxWidth={{ md: "full" }}
                    transition="width 0.2s"
                    _hover={{ width: "100%" }}
                />
            </HStack>
        </Box>
    );
};