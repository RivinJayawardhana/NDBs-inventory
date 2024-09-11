import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../AuthContext";
import axios from 'axios'
import { Link } from "react-router-dom";
import AddInventories from "../components/AddInventories";
import Updateinventory from "../components/UpdateInventory";
import AddUsers from "../components/AddUsers";
import Updateuser from "../components/UpdateUsers";
import { useParams } from "react-router-dom";


function ITdept() {
  
  const {dept}=useParams();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setusers] = useState([]);
  const [inventories,setinventories]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToRemove, setuserToRemove] = useState(null);
  const [updateid, setupdateid] = useState(null);
  const [searchitem, setsearchitem] = useState('');

  


  const addModalSetting = () => {
    setShowModal(!showModal);
  };

  const UpdateModalSetting = (id) => {
    setShowUpdateModal(!showUpdateModal);
    setupdateid(id)
  };

  const handleRemoveCancel = () => {
    // Simply hide the confirmation popup and reset the itemToRemove state
    setShowConfirmation(false);
    setuserToRemove(null);
  };

  const handleRemoveClick = (id) => {
    // Set the item to be removed and show the confirmation popup
    setuserToRemove(id);
    setShowConfirmation(true);
  };

  const getUsers = async () => {
    const response=await axios.get(`http://127.0.0.1:8000/api/userfilter/?search=${dept}`)
    console.log(response.data)
    console.log(dept)

    setusers(response.data)
   }
  
   const getProducts = async () => {
    const response=await axios.get('http://127.0.0.1:8000/api/item/')
    console.log(response.data)
    setinventories(response.data)
  
   }
  
  useEffect (()=>{
    getUsers();
    getProducts();
   },[])
  
  
   const confirmremove= async () => {
    const response=await axios.delete(`http://127.0.0.1:8000/api/user/${userToRemove}`)
    console.log(response.data)
   window.location.href="/user"
 
  };

  
  
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
     

        
    
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Users</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  onChange={(e) => setsearchitem(e.target.value)}
                />
              </div>
            </div>
       
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  User Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Devices and Serial Number
                </th>
              
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
               Remove
                </th>
            
              
               
              </tr>
            </thead>
            {users.filter((i)=>{
                return searchitem.toLocaleLowerCase()===''
                ? i
                : i.name.toLocaleLowerCase().includes(searchitem) || i.name.includes(searchitem);
        
            }).map(i => {
              return (


            <tbody className="divide-y divide-gray-200" key={i._id}>
              
                
                  <tr >
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {i.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700" >
                    {inventories.filter((p)=>{
                return i.name ===''
                ? p
                :  p.user.includes(i.name) && p.user.includes(dept) ;
        
            }).map(p => {
              return (
                    
                      <p>{p.name}({p.itemnum})</p>
                   
                    )})}
                   
                   </td>
             
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                    
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                  >

                    <button
                  
                 
                  
                >
                  {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Remove
                </button>
                  </span>
                    </td>
                    
                  </tr>
           
            </tbody>
             
            )})}
          </table>
        </div>
      </div>
         
      {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
              <p className="text-lg font-semibold mb-3">
                Are you sure you want to remove this item?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  onClick={confirmremove}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  onClick={handleRemoveCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}





    </div>
  );
}

export default ITdept;
