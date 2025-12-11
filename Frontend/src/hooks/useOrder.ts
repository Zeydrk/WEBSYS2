// insert libraries needed
import { useState } from 'react';
import axios from 'axios';



// main
export default function useOrder(){
    // variables    
    const [order, setOrder] = useState('');
    // edit when env is injected
    const API_URL = import.meta.env.VITE_API_URL;
    
    async function fetchPets(){
        const response = await axios.get(`${API_URL}/api/pets`);
        setOrder(response.data);
        return response.data
    }

    async function fetchPetsById(id:string){
        const response = await axios.get(`${API_URL}/api/pets/${id}`);
        setOrder(response.data);
        return response.data
    }

    return{
        order,
        fetchPets,
        fetchPetsById
    }
}