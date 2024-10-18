import React, { useState, useEffect } from 'react';
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
    useToast, 
} from '@chakra-ui/react';
import { updateReservation } from '../api';

const EditReservationModal = ({ reservation, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        room_id: '',
        start_time: '',
        end_time: '',
    });

    const toast = useToast(); 

    useEffect(() => {
        if (reservation) {
            setFormData({
                room_id: reservation.room_id,
                start_time: formatDateTime(reservation.start_time),
                end_time: formatDateTime(reservation.end_time),
            });
        }
    }, [reservation]);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().slice(0, 16); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedReservation = await updateReservation(reservation.id, formData);
            onUpdate(updatedReservation.data);
            toast({
                title: 'Reserva atualizada.',
                description: "A reserva foi atualizada com sucesso!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar reserva:', error);
            toast({
                title: 'Erro ao atualizar reserva.',
                description: "Não foi possível atualizar a reserva. Tente novamente.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={!!reservation} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Reserva</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Sala</FormLabel>
                        <Input
                            type="text"
                            name="room_id"
                            value={formData.room_id}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Início</FormLabel>
                        <Input
                            type="datetime-local"
                            name="start_time"
                            value={formData.start_time} 
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Fim</FormLabel>
                        <Input
                            type="datetime-local"
                            name="end_time"
                            value={formData.end_time} 
                            onChange={handleChange}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Salvar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditReservationModal;
