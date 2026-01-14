import axios from 'axios';
import type { Task } from '../types/Task';

const API_URL = 'http://localhost:3000/tasks';

export const taskService = {
    getAll(): Promise<Task[]> {
        // return axios.get<Task[]>(API_URL).then(response => response.data);
        return new Promise((resolve) => {
            setTimeout(() => resolve(axios.get<Task[]>(API_URL).then(response => response.data)), 2000); // Simula retardo de red
        });
    },
    delete(id :number) : Promise<void> {
        return axios.delete<void>(API_URL + "/" + id).then(() => {})
    }
};