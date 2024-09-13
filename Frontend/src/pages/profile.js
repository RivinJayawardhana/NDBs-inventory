
/* eslint-disable react/jsx-no-duplicate-props */
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";


import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from "react-router-dom";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";



export default function DashProfile() {
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [pass,setpass]=useState('')
  const [admin, setadmin] = useState();

  const getAdmin = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/1');

      setadmin(response.data);
      setemail(response.data.email)
      setname(response.data.name)
      setpass(response.data.password)

    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    getAdmin(); // Call getAdmin on component mount
  }, []); // Empty dependency array ensures this runs only once on mount

  // admin is a dependency here

  
  const updateadmin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password',pass);


    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/admin/1/`,formData);
      console.log(response.data);
      window.location.href="/profile"
    } catch (error) {
      console.error('Error adding item:', error);
      // Handle error state or logging
    }
  };
 
 


  

  return (


    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
      <Paper >
      <Grid container spacing={6} style={{marginLeft:"20px",marginBottom:"20px"}} >
        <Grid item xs={12} container justify="flex-start">
          <Typography variant="h4">Account Info</Typography>
        </Grid>
        <Grid item xs={12} container>
          <Grid item container direction="column" align="start" spacing={1}>
            <Typography gutterBottom variant="h5">
              
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
            Name:{name}
            </Typography>
            <Typography variant="body1" gutterBottom color="textSecondary">
            Role: Admin
            </Typography>
         
             
   
            <Typography variant="body2" color="textSecondary">
              Email: {email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>


   {/* <Paper  style={{marginTop:"40px"}}>
      <Grid container direction="column" spacing={4}>
        <Grid container justify="flex-start" style={{marginTop:"40px",marginLeft:"50px"}}>
          <Typography variant="h4">Password Mangement</Typography>
        </Grid>
        <Grid item style={{marginLeft:"60px",marginRight:"60px",width:"70%"}}>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            fullWidth
            
          />
        </Grid>
        <Grid item  style={{marginLeft:"60px",marginRight:"60px",width:"70%"}}>
          <TextField
           
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item style={{marginLeft:"60px",marginRight:"60px",width:"70%"}}>
          <TextField
         
     
            label="Confirm New Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid container justify="flex-end" style={{marginLeft:"90px",marginTop:"20px",marginBottom:"20px"}}>
        <Button
          type='submit'
          className="bg-black text-white"
         onClick={updateadmin}
        >
          Update
        </Button>
       
        </Grid>
      </Grid>
    </Paper>*/}
      </div>
    </div>
  )
}
