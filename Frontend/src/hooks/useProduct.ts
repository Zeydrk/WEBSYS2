// insert libraries needed
import { useState } from 'react';
import axios from 'axios';


interface Pet {
  petId: string;
  name: string;
  species: string;
  description: string;
  basePrice: number;
  stockQty: number;
  imageUrl: string;
  planetId: string;
  originPlanet: {
    planetId: string;
    planetName: string;
    distanceFromSun: number;
  };
}

// main
export default function useProduct(){
    // variables    
    const [product, setProduct] = useState('');
    // edit when env is injected
    const API_URL = import.meta.env.VITE_API_URL;
    
    async function fetchPets(){
        const response = await axios.get(`${API_URL}/api/pets`);
        setProduct(response.data);
        return response.data
    }

    async function fetchPetsById(id:string){
        const response = await axios.get(`${API_URL}/api/pets/${id}`);
        setProduct(response.data);
        return response.data
    }

    // async function createPets(pet:Pet){
    //     const response = await axios.post(`${API_URL}/api/pets`)

    // }

    return{
        product,
        fetchPets,
        fetchPetsById
    }
}