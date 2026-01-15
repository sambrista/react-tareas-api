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
        //return axios.delete<void>(API_URL + "/" + id).then(() => {})
                return new Promise((resolve) => {
            setTimeout(() => resolve(axios.delete<void>(API_URL + "/" + id).then(() => {})), 1000); // Simula retardo de red
        });
    },
    create(titulo : string) : Promise<Task> {
        // return axios.post<Task>((API_URL), {title: titulo, completed: false}).then(response => response.data)
        return new Promise((resolve) => {
            setTimeout(() => resolve(axios.post<Task>((API_URL), {title: titulo, completed: false}).then(response => response.data)), 1000); // Simula retardo de red
        });
    }
    // TODO: Crear update()
};