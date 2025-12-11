// insert libraries needed
import { useState } from 'react';
import axios from 'axios';



// main
export default function useOrder(){
    // variables    
    const [order, setorder] = useState('');
    // edit when env is injected
    const API_URL = import.meta.env.VITE_API_URL;
    
    async function fetchOrders(){
        const response = await axios.get(`${API_URL}/api/order`);
        setorder(response.data);
        return response.data
    }

    async function fetchOrdersById(id:string){
        const response = await axios.get(`${API_URL}/api/order/${id}`);
        setorder(response.data);
        return response.data
    }


    return{
        order,
        fetchOrders,
        fetchOrdersById
    }
}