import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});


export const getRooms = () => api.get('/rooms');
export const createReservation = (data) => api.post('/reservations', data);
export const getUserReservations = () => api.get('/reservations');
export const cancelReservation = (id) => api.delete(`/reservations/${id}`);


export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
