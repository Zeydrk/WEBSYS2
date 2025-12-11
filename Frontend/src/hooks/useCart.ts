// insert libraries needed
import { useState } from 'react';
import axios from 'axios';



// main
export default function useCart(){
    // variables    
    const [cart, setCart] = useState('');
    // edit when env is injected
    const API_URL = import.meta.env.VITE_API_URL;
    
    async function fetchCart(){
        const response = await axios.get(`${API_URL}/api/cart`);
        setCart(response.data);
        return response.data
    }

    async function fetchCartById(id:string){
        const response = await axios.get(`${API_URL}/api/cart/${id}`);
        setCart(response.data);
        return response.data
    }


    return{
        cart,
        fetchCart,
        fetchCartById
    }
}