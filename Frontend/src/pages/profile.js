
/* eslint-disable react/jsx-no-duplicate-props */
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";


import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from "react-router-dom";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";


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



    <div className="col-span-12 lg:col-span-10  flex justify-center">

    <div className=" flex flex-col gap-0 w-6/12">

      <h1 className='my-7 text-center font-semibold text-3xl text-white'></h1>
     
      <form  className='flex flex-col gap-4' >
        <input
          type='file'
          accept='image/*'
         
          hidden
        />

        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
       
        >
           
            <CircularProgressbar
            
              strokeWidth={2}

              styles={{
                
                root: {
                  width: '200%',
                  height: '100%',
                  position: 'absolute',
                },
                path: {
                  
                },
              }}
              aria-label='Uploading Image'
              
            />
       
          <img
            style={{width:"100%"}}
            src={require("../assets/logo.jpg")}
            aria-label='User Profile Image'
          />

        </div>
      
     
        <TextInput
          type='text'
          id='username'
          onChange={(e) => setname(e.target.value)}
          defaultValue={name}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          onChange={(e) => setemail(e.target.value)}
     defaultValue={email}
     readOnly
        />
         <div>
          <div className="relative">
            <TextInput  placeholder="Password" id="password" 
            defaultValue={pass}
            onChange={(e) => setpass(e.target.value)}/>
            <button type="button" className="absolute top-2 right-3 focus:outline-none" >
             
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c5.185 0 9.448 4.014 9.95 9.048a.944.944 0 0 1 0 .904C21.448 16.486 17.185 20.5 12 20.5S2.552 16.486 2.05 13.452a.944.944 0 0 1 0-.904C2.552 8.514 6.815 4.5 12 4.5zM12 6a9 9 0 0 0-8.72 6.752.944.944 0 0 1 0 .496A9 9 0 0 0 12 18a9 9 0 0 0 8.72-4.752.944.944 0 0 1 0-.496A9 9 0 0 0 12 6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z" />
                </svg>
            
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15a7 7 0 01-7-7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
           
            </button>
          </div>
        </div>
     
        <Button
          type='submit'
          className="bg-black text-white"
         onClick={updateadmin}
        >
          Update
        </Button>
       

      </form>
     
      <div className='text-red-500 flex justify-between mt-5'>
        
        <span  className='cursor-pointer'>
          <Button className="bg-red-700">Sign Out</Button>
        </span>
      </div>
      <div className="text-green-600">

      

      </div>

      <div className="text-red-600">
    
      </div>

      <Modal  popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete your Account</h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='failure' className="bg-red-600">
              Yes, I am sure
            </Button>
            <Button color='gray'  className="bg-green-600">
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      </div>
     
      </div>

       
  )
}
