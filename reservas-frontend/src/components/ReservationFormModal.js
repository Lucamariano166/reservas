import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { createReservation } from '../api';

const ReservationFormModal = ({ isOpen, onClose, onNewReservation }) => {
    const [roomId, setRoomId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const startDateTime = new Date(startTime);
        const endDateTime = new Date(endTime);

        if (startDateTime <= now) {
            onClose(); 
            Swal.fire({
                icon: 'error',
                title: 'Erro de Validação',
                text: "O horário de início deve ser uma data e hora futura.",
            });
            return;
        }

        if (endDateTime <= startDateTime) {
            onClose(); 
            Swal.fire({
                icon: 'error',
                title: 'Erro de Validação',
                text: "O horário de término deve ser posterior ao horário de início.",
            });
            return;
        }

        try {
            const newReservation = await createReservation({ room_id: roomId, start_time: startTime, end_time: endTime, user_name: userName });

            onNewReservation(newReservation);

            setRoomId('');
            setStartTime('');
            setEndTime('');
            setUserName('');

            Swal.fire({
                icon: 'success',
                title: 'Reserva Criada!',
                text: 'Sua reserva foi realizada com sucesso.',
            }).then(() => {
                
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            });

            onClose(); 
        } catch (error) {
            onClose(); 
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao criar reserva. Verifique a disponibilidade.',
            });
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reservar Sala</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>ID da Sala</FormLabel>
                            <Input
                                placeholder="ID da Sala"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Início</FormLabel>
                            <Input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Fim</FormLabel>
                            <Input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Seu Nome</FormLabel>
                            <Input
                                placeholder="Seu Nome"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Reservar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReservationFormModal;
