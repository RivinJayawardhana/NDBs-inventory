import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../AuthContext";
import axios from 'axios'
import { Link } from "react-router-dom";
import AddInventories from "../components/AddInventories";
import Updateinventory from "../components/UpdateInventory";


function Inventory() {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setAllUsers] = useState([]);
  const [inventories,setinventories]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [updateid, setupdateid] = useState(null);
  const [searchitem, setsearchitem] = useState('');
  const [count, setcount] = useState('');
  const [cost, setcost] = useState('');

  


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
    setItemToRemove(null);
  };

  const handleRemoveClick = (id) => {
    // Set the item to be removed and show the confirmation popup
    setItemToRemove(id);
    setShowConfirmation(true);
  };

  const getProducts = async () => {
    const response=await axios.get('http://127.0.0.1:8000/api/item/')
    console.log(response.data)
    setinventories(response.data)
    setcount(response.data.length)
    const totalCost = response.data.reduce((sum, inventory) => sum + inventory.Price, 0);
    setcost(totalCost)
  
   }
   const getUsers = async () => {
    const response=await axios.get('http://127.0.0.1:8000/api/user/')
    console.log(response.data)
    
    setAllUsers(response.data)
   }
  
  
  useEffect (()=>{
    getProducts();
    getUsers();
   },[])
  
  
   const confirmremove= async () => {
    const response=await axios.delete(`http://127.0.0.1:8000/api/item/${itemToRemove}`)
    console.log(response.data)
   window.location.href="/inventory"
   
 
  };

  
  
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
      {showModal && (
          <AddInventories
          addModalSetting={addModalSetting}
            Users={users}
          
           
          />
        )}

{showUpdateModal && (
          <Updateinventory
          UpdateModalSetting={UpdateModalSetting}
          users={users}
          
            inventoryid={updateid}
            
          
           
          />
        )}
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className=" flex flex-col md:flex-row justify-center items-center  ">
            
          
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Total Inventories
              </span>
              <div className="flex gap-8">
              
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {count}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Total Cost
              </span>
              <div className="flex gap-8">
              
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                Rs. {cost}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
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
                Add Inventories
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Serial Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Manufacture
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  User
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Edit
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Delete
                </th>
               
              </tr>
            </thead>
            {inventories.filter((i)=>{
                return searchitem.toLocaleLowerCase()===''
                ? i
                : i.name.toLocaleLowerCase().includes(searchitem) || i.name.includes(searchitem);
        
            }).map(i => {
              return (


            <tbody className="divide-y divide-gray-200" key={i._id}>
              
                
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {i.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {i.itemnum}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {i.brand}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {i.user}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {i.Price}
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

export default Inventory;
