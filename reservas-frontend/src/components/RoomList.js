import React, { useEffect, useState } from 'react';
import { getRooms } from '../api';
import { Box, Text, Heading, SimpleGrid, VStack } from '@chakra-ui/react';

const colors = [
    "red.100",
    "blue.100",
    "green.100",
    "yellow.100",
    "purple.100",
    "orange.100",
    "teal.100",
    "pink.100"
];

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [filter] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await getRooms();
            setRooms(response.data);
            console.log(response.data); 
        };

        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room => {
        const matches = room.name.toLowerCase().includes(filter.toLowerCase());
        console.log(`Filtrando: ${room.name} | Filter: ${filter} | Match: ${matches}`); 
        return matches;
    });

    return (
        <Box p={8}>
            <Heading mb={6} textAlign="center" color="teal.600">Salas Disponíveis</Heading>
            <Heading size="md" mb={1} textAlign="center" color="red.300">
                Atenção: As reservas de salas devem ser feitas com um dia de antecedência.
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                {filteredRooms.map((room, index) => (
                    <Box
                        key={room.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={8}
                        minH="100px"
                        bg={colors[index % colors.length]}
                        _hover={{ shadow: 'md', transform: "scale(1.02)" }}
                        transition="0.2s"
                    >
                        <VStack>
                            <Text fontSize="xl" fontWeight="bold">{room.name}</Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default RoomList;
