// insert libraries needed
import { useState } from 'react';
import axios from 'axios';



// main
export default function useAccount(){
    // variables    
    const [account, setAccount] = useState('');
    // edit when env is injected
    const API_URL = import.meta.env.VITE_API_URL;
    
    async function fetchAccount(){
        const response = await axios.get(`${API_URL}/api/account`);
        setAccount(response.data);
        return response.data
    }

    async function fetchAccountById(id:string){
        const response = await axios.get(`${API_URL}/api/account/${id}`);
        setAccount(response.data);
        return response.data
    }


    return{
        account,
        fetchAccount,
        fetchAccountById
    }
}