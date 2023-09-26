import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAdmin = () => {
    const { email, isLoading:emailLodaing } = useSelector(state => state.userSlice);
    const [isAdmin, setIsAdmin] = useState(false);
console.log("isadmin", isAdmin);



useEffect(()=>{
  

    // fetch(` http://localhost:5000/users/admin/${email}`)
    fetch(`https://task-management-serber.vercel.app/users/admin/${email}`)
    .then(res => res.json())
    .then(data=> {
        // console.log("data",data.admin);
  
        setIsAdmin(data.admin);
  


      
    });

   
},[email])

return isAdmin
};

export default useAdmin;