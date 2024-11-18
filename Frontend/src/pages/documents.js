import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../AuthContext";
import axios from 'axios'
import { Link } from "react-router-dom";
import AddInventories from "../components/AddInventories";
import Updateinventory from "../components/UpdateInventory";
import AddUsers from "../components/AddUsers";
import Updateuser from "../components/UpdateUsers";
import Adddoc from "../components/AddDoc";
import  html2pdf from "html2pdf.js";


function Documents() {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setusers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToRemove, setuserToRemove] = useState(null);
  const [updateid, setupdateid] = useState(null);
  const [searchitem, setsearchitem] = useState('');
  const [count, setcount] = useState('');
  const [user,setuser]= useState(null);
  const [name, setName] = useState("");
  const [dept, setdept] = useState("");
  const [itemname, setitemname] = useState("");
  const [brand, setbrand] = useState("");
  const [serialno, setserialno] = useState("");
  const [quantity, setquantity] = useState("");
  const [doctype, setdoctype] = useState("");
  const [remark, setremark] = useState("");
  const [date, setdate] = useState("");

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

  const handleRemoveClick = (id,user) => {
    // Set the item to be removed and show the confirmation popup
    setuserToRemove(id);
    setShowConfirmation(true);
    setuser(user);
    console.log(user)
  };

  const getUsers = async () => {
    const response=await axios.get('http://127.0.0.1:8000/api/doc/')
    console.log(response.data);

    setusers(response.data);
    setcount(response.data.length);

   }
  
  
  useEffect (()=>{
    getUsers();
   },[])
  
  
   const confirmremove= async () => {
    const response=await axios.delete(`http://127.0.0.1:8000/api/doc/${userToRemove}/`)
    console.log(response.data)
   
   
    window.location.href="/doc"
  };

  const generatePDFReport = () => {
    const content = `
   <!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  vertical-align: top; /* Aligns content to the top */
}
table {
  width: 80%;
  margin-top: 50px;
  margin-left: 70px;
}
tr {
  height: 100px;
}
</style>
</head>
<body style="width:700px;height:1700px">

<table>
  <tr>
    <th>Item</th>
    <th>Model No</th>
    <th>Serial No</th>
    <th>Quantity</th>
    <th>Remark</th>
  </tr>
  <tr>
    <td>Router</td>
    <td>Dialog 4G R012</td>
    <td>S/N-1000230004232343232</td>
    <td>01</td>
    <td></td>
  </tr>
</table>

</body>
</html>

    `;

    html2pdf().from(content).set({ margin: 1, filename: 'supplies_report.pdf' }).save();
  };



const handleGenerateReport = async(id) => {
  
  const response=await axios.get(`http://127.0.0.1:8000/api/doc/${id}/`)
  console.log(response.data)
  setName(response.data.name)
  
  setitemname(response.data.item)
  setbrand(response.data.Brand)
  setdate(response.data.Date)
  setdoctype(response.data.Doctype)
  setdept(response.data.department)
  setquantity(response.data.Quantity)
  setremark(response.data.Remark)
  setserialno(response.data.SerialNo)
 
  
  
     generatePDFReport();

  
    
   };

  


  
 


  
  
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
      {showModal && (
          <Adddoc
          addModalSetting={addModalSetting}
           
          
           
          />
        )}

{showUpdateModal && (
          <Updateuser
          UpdateModalSetting={UpdateModalSetting}
          
            userid={updateid}
            
          
           
          />
        )}
        

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Documentations</span>
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
                Add Documentaions
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                User
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Department
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Item
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Brand
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Serial Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Remark
                </th>


                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Doc type
                </th>
            
              
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Delete
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Download PDF
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
                      {i.department}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.Date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.items}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.Brand}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.SerialNo}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.Quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.Doctype}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700"> 
                      {i.Remark}
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

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                    
                    className='font-medium text-blue-500 hover:underline cursor-pointer'
                  ><button onClick={() => {
                     
                    handleGenerateReport(i.id);
                   
                  }} 
                  
                  
                >
                  {/* <Link to="/inventory/add-product">Add Product</Link> */}
                  View
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

export default Documents;
