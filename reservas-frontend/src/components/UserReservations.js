import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    IconButton,
    List,
    ListItem,
    Spinner,
    useToast,
    Input, 
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getUserReservations, cancelReservation, getRooms } from '../api';
import EditReservationModal from './EditReservationModal';
import Swal from 'sweetalert2';

const UserReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await getUserReservations();
                setReservations(response.data);
            } catch (error) {
                toast({
                    title: "Erro ao carregar reservas",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await getRooms();
                setRooms(response.data);
            } catch (error) {
                toast({
                    title: "Erro ao carregar salas",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchReservations();
        fetchRooms();
    }, [toast]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await cancelReservation(id);
                    setReservations(reservations.filter(reservation => reservation.id !== id));
                    Swal.fire('Excluído!', 'A reserva foi excluída.', 'success');
                } catch (error) {
                    Swal.fire('Erro!', 'Erro ao excluir reserva.', 'error');
                }
            }
        });
    };

    const filteredReservations = reservations.filter(reservation => {
        const room = rooms.find(room => room.id === reservation.room_id);
        const roomName = room ? room.name.toLowerCase() : 'sala desconhecida';
        return roomName.includes(searchTerm.toLowerCase());
    });

    return (
        <Box>
            <Flex justify="flex-end" mb={4}>
            <Input
                placeholder="Pesquisar salas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                mb={4} 
                    size="sm"
                    width="200px"
            />
            </Flex>


            {loading ? (
                <Spinner />
            ) : (
                <List spacing={4}>
                    {filteredReservations.map((reservation) => {
                        const room = rooms.find(room => room.id === reservation.room_id);
                        const roomName = room ? room.name : 'Sala Desconhecida';

                        return (
                            <ListItem
                                key={reservation.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                _hover={{ bg: 'gray.100' }}
                            >
                                <Flex justify="space-between" align="center">
                                    <Box>
                                        <Text fontWeight="bold" color="teal.600">{roomName}</Text>
                                        <Text>Início: {new Date(reservation.start_time).toLocaleString()}</Text>
                                        <Text>Fim: {new Date(reservation.end_time).toLocaleString()}</Text>
                                        <Text>Usuário: {reservation.user_name}</Text>
                                    </Box>
                                    <Flex>
                                        <IconButton
                                            aria-label="Editar reserva"
                                            icon={<EditIcon />}
                                            colorScheme="blue"
                                            onClick={() => setSelectedReservation(reservation)}
                                            mr={2}
                                        />
                                        <IconButton
                                            aria-label="Excluir reserva"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            onClick={() => handleDelete(reservation.id)}
                                        />
                                    </Flex>
                                </Flex>
                            </ListItem>
                        );
                    })}
                </List>
            )}

            <EditReservationModal
                reservation={selectedReservation}
                onClose={() => setSelectedReservation(null)}
                onUpdate={(updatedReservation) => {
                    setReservations((prev) =>
                        prev.map((res) =>
                            res.id === updatedReservation.id ? updatedReservation : res
                        )
                    );
                }}
            />
        </Box>
    );
};

export default UserReservations;
