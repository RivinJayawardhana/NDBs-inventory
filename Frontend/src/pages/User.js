import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../AuthContext";
import axios from 'axios'
import { Link } from "react-router-dom";
import AddInventories from "../components/AddInventories";
import Updateinventory from "../components/UpdateInventory";
import AddUsers from "../components/AddUsers";
import Updateuser from "../components/UpdateUsers";


function User() {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setusers] = useState([]);

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
    const response=await axios.get('http://127.0.0.1:8000/api/user/')
    console.log(response.data)

    setusers(response.data)
   }
  
  
  useEffect (()=>{
    getUsers();
   },[])
  
  
   const confirmremove= async () => {
    const response=await axios.delete(`http://127.0.0.1:8000/api/user/${userToRemove}`)
    console.log(response.data)
   window.location.href="/user"
 
  };

  
  
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
      {showModal && (
          <AddUsers
          addModalSetting={addModalSetting}
           
          
           
          />
        )}

{showUpdateModal && (
          <Updateuser
          UpdateModalSetting={UpdateModalSetting}
          
            userid={updateid}
            
          
           
          />
        )}
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className=" flex flex-col md:flex-row justify-center items-center  ">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">
                
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Last 7 days
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stores
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $2000
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Top Selling
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $1500
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Low Stocks
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    12
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordered
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    2
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Not in Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

    
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Products</span>
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
            <div className="flex gap-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add User
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  User Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Department
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Email
                </th>
            
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Edit
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Delete
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
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {i.dept}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.email}
                    </td>
                   

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                    
                    className='font-medium text-blue-500 hover:underline cursor-pointer'
                  ><button
                  
                  onClick={()=>UpdateModalSetting(i.id)}
                >
                  {/* <Link to="/inventory/add-product">Add Product</Link> */}
                  Edit
                </button>
                  </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                    
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                  >
                    <button
                  
                  onClick={() => handleRemoveClick(i.id)}
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

export default User;
