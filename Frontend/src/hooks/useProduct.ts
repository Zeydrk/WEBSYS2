// insert libraries needed
import { useState } from 'react';
import axios from 'axios';


// interface Pet {
//   petId: string;
//   name: string;
//   species: string;
//   description: string;
//   basePrice: number;
//   stockQty: number;
//   imageUrl: string;
//   planetId: string;
//   originPlanet: {
//     planetId: string;
//     planetName: string;
//     distanceFromSun: number;
//   };
// }

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

    // async function updatePets(id: string, updatedData: Partial<Pet>) {
    //     try {
    //         // 1. Send request to server (Change .put to .patch if your API uses PATCH)
    //         const response = await axios.put(`${API_URL}/api/pets/${id}`, updatedData);

    //         // 2. Update the local state
    //         setProducts(prev => 
    //             prev.map(pet => 
    //                 // If the ID matches, replace it with the new data from server
    //                 // Otherwise, keep the pet exactly as is
    //                 pet.id === id ? response.data : pet
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Error updating pet:", error);
    //     }
    // }

//     async function deletePets() {
//         const response = await axios.delete(`${API_URL}/api/pets/${id}`);

//         setStudents(prev => {
//         return prev.filter(pet => pet.id !== response.data.id);
//         });
//   }

    return{
        product,
        fetchPets,
        fetchPetsById
    }
}