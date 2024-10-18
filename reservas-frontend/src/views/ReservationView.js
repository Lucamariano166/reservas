import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Flex, useDisclosure } from '@chakra-ui/react';
import UserReservations from '../components/UserReservations';
import ReservationFormModal from '../components/ReservationFormModal';
import RoomList from '../components/RoomList';
import { getUserReservations } from '../api'; // Adicione essa importação

const ReservationView = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userReservations, setUserReservations] = useState([]);

    const fetchReservations = async () => {
        const response = await getUserReservations(); 
        setUserReservations(response.data);
    };

    useEffect(() => {
        fetchReservations(); 
    }, []);

    const handleNewReservation = () => {
        fetchReservations(); 
    };

    return (
        <Box p={8} bg="yellow.50" minH="100vh">
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="lg" color="teal.600">Gerenciar Reservas</Heading>
                <Button colorScheme="teal" onClick={onOpen}>
                    Reservar Sala
                </Button>
            </Flex>

            <RoomList />
            <UserReservations reservations={userReservations} /> 

            <ReservationFormModal
                isOpen={isOpen}
                onClose={onClose}
                onNewReservation={handleNewReservation}
            />
        </Box>
    );
};

export default ReservationView;
