// insert libraries needed
import { useState } from 'react';
import axios from 'axios';

// main
export default function useProduct(){
    // variables    
    const [product, setProduct] = useState('');
    // edit when env is injected
    const API_URL = "http://localhost:3000"
    
    async function fetchProducts(products:object){
        const response = await axios.get(`${API_URL}/api/product`, products);
        setProduct(response.data);
        return response
    }

    async function fetchProductById(id:string){
        const response = await axios.get(`${API_URL}/api/product/${id}`);
        setProduct(response.data);
        return response
    }

    return{
        product,
        fetchProducts,
        fetchProductById
    }
}