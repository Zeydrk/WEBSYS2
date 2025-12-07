// insert libraries needed
import { useState } from 'react';
import axios from 'axios';

// main
export default function useProduct(){
    // variables    
    const [product, setProduct] = useState('');
    // edit when env is injected
    const API_URL = "http://localhost:4200"
    
    async function fetchPets(){
        const response = await axios.get(`${API_URL}/api/pets`);
        setProduct(response.data);
        return response.data
    }

    async function fetchPetsById(id:string){
        const response = await axios.get(`${API_URL}/pets/${id}`);
        setProduct(response.data);
        return response
    }

    return{
        product,
        fetchPets,
        fetchPetsById
    }
}