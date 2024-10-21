import React from "react";
import { Link,useParams  } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { Fragment, useRef, useState,useEffect } from "react";

function SideMenu() {
  
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const Settime = () => {
     const now= new Date().getTime();
     const expiretime = now + 1*60*1000;
     localStorage.setItem('time',expiretime)


  }
 
    

    const HasTimerexpired = () => {
      const now = new Date().getTime();
      const expiretime=localStorage.getItem('time')

      if(now>expiretime){
        localStorage.removeItem("user");

      }
 
 
   }
       
  
  useEffect(() => {
    Settime();
    HasTimerexpired();
    const localStorageData = localStorage.getItem("user");
    if (!localStorageData) {
      // Redirect to login page if user data or token doesn't exist
     window.location.href='/login'
    }
    HasTimerexpired();
  }, []);




  const clicklogout = () => {
    // Set the item to be removed and show the confirmation popup
    
    setShowConfirmation(true);
  }



  const canclelogout = () => {
    // Simply hide the confirmation popup and reset the itemToRemove state
    setShowConfirmation(false);
  
  };

  const signout = async () => {
    localStorage.removeItem("user");
    window.location.href="/login"

   }

  
  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
      
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>
        

          <Link to="/inventory">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-black">
              
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/order-icon.png")}
                  />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              
            </summary>
          </details>
          </Link>
          <Link to="/user">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-black">
             
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/supplier-icon.png")}
                  />
                  <span className="text-sm font-medium"> Users </span>
                </div>
              
            </summary>
          </details>
          </Link>
          <Link to="/doc">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-black">
             
                <div className="flex items-center gap-2">
                  <img
                  style={{width:"14%"}}
                    alt="inventory-icon"
                    src={require("../assets/doc.png")}
                  />
                  <span className="text-sm font-medium"> Documentaions </span>
                </div>
              
            </summary>
          </details>
          </Link>
          <Link to="/doc">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-black">
             
                <div className="flex items-center gap-2">
                  <img
                  style={{width:"14%"}}
                    alt="inventory-icon"
                    src={require("../assets/trash.png")}
                  />
                  <span className="text-sm font-medium"> Trash </span>
                </div>
              
            </summary>
          </details>
          </Link>
        

          
           
        
          <Link
            
            onClick={clicklogout}
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
          
       
                  <img
                  style={{width:"14%"}}
                    alt="inventory-icon"
                    src={require("../assets/logout.png")}
                  />
                  <span className="text-sm font-medium"> Sign out </span>
              
            
          </Link>
        </nav>
      </div>
      
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <Link
            to="/profile"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
        <span className="text-sm font-medium"> Admin Profile </span>
          <img
            alt="Profile"
            src={require("../assets/admin.jpg")}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
            
              </strong>

              <span>  </span>
            </p>
          </div>
          </Link>
        </div>
      </div>
      {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" style={{zIndex:100}}>
            <div className="bg-white p-5 rounded shadow-lg">
              <p className="text-lg font-semibold mb-3">
                Are you sure you want to Sign out?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  onClick={signout}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  onClick={canclelogout}
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

export default SideMenu;
