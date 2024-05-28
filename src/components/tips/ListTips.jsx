import React, { useEffect, useState } from "react";
import { Grid, Center } from "@chakra-ui/react";
import { ItemTips } from "./ItemTips";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { Loading } from "../helper/Loading";

export const ListTips = () => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTips = async () => {
            setLoading(true);
            const tipsCollection = collection(db, 'tips');
            const tipsSnapshot = await getDocs(tipsCollection);
            const tipsList = tipsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTips(tipsList);
            setLoading(false);
        };

        getTips();
    }, []);

    if (loading) {
        return (
            <Center h="100vh">
                <Loading />
            </Center>
        );
    }

    return (
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            {tips.map((tip, index) => (
                <ItemTips key={index} id={tip.id} tip={tip} />
            ))}
        </Grid>
    );
}