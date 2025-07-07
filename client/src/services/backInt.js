import axios from 'axios';
import { io } from 'socket.io-client';

const BackendBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
const APIBaseUrl = `${BackendBaseUrl}/api`;

const API = axios.create({
    baseURL: APIBaseUrl,
});

export const registerUser = ( username )=>
    API.post("/auth/register", { username });

export const getRooms = ()=> API.get("/rooms");
export const createRoom = (name)=> API.post("/rooms", { name });

export const getMessages = (roomId)=> API.get(`/messages/${roomId}`);
export const socket = io(BackendBaseUrl, { autoConnect: false });