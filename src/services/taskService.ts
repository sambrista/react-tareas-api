import axios from 'axios';
import type { Task } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (API_BASE_URL == undefined) {
    throw new Error("No está definida la URL de la API");
}

const API_URL = API_BASE_URL +"/tasks";

export const taskService = {
    get(id :number) : Promise<Task> {
        // return axios.get<Task>(API_URL+"/"+id).then(response => response.data)
        return new Promise((resolve) => {
            setTimeout(() => resolve(axios.get<Task>(API_URL+"/"+id).then(response => response.data)), 2000); // Simula retardo de red
        });
    },
    getAll(): Promise<Task[]> {
        return axios.get<Task[]>(API_URL).then(response => response.data);
    },
    delete(id :number) : Promise<void> {
        return axios.delete<void>(API_URL + "/" + id).then(() => {})
    },
    create(titulo : string) : Promise<Task> {
        return axios.post<Task>((API_URL), {title: titulo, completed: false}).then(response => response.data)
    },
    update(tarea : Task) : Promise<Task> {
        return axios.patch<Task>((API_URL + "/" + tarea.id),tarea).then(response => response.data)
    }
};