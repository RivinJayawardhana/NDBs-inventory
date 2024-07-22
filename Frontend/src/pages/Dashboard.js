import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);


function Dashboard() {

  const dept='IT'
  const authContext = useContext(AuthContext);
  const [inventories,setinventories]=useState([])

  const generateRandomColor = () => {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Return rgba format with opacity 0.2
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  const getProducts = async () => {
    const response=await axios.get('http://127.0.0.1:8000/api/item/')
    console.log(response.data)
    setinventories(response.data)
  
   }
  
  
  useEffect (()=>{
    getProducts();
  
   },[])
  
   const calculateBrandCounts = () => {
    const brandCounts = {};
    inventories.forEach(item => {
      const brand = item.brand;
      if (brand in brandCounts) {
        brandCounts[brand] += 1;
      } else {
        brandCounts[brand] = 1;
      }
    });
    return brandCounts;
  };

  const brandCounts = calculateBrandCounts();
  const brandNames = Object.keys(brandCounts);
  const backgroundColors = brandNames.map(() => generateRandomColor());

  // Prepare data for chart
  const data = {
    labels: brandNames,
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(brandCounts),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.2', '1')), // Set border opacity to 1
        borderWidth: 1,
      },
    ],
  };

  

  


  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <Link to={`/itdept/${"Sales"}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> Sales Department </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
      
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>
        <Link
        to={`/itdept/${dept}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> IT Department </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
          
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>
        <Link to={`/itdept/${"CEO"}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> CEO  </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
          
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>
        <Link to={`/itdept/${"Research"}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> Research Department </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
             
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>
        <Link to={`/itdept/${"Operation"}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> Finance & Operation Department </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>
        <Link to={`/itdept/${"HR"}`}>
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
         

            <span className="text-xs font-medium"> HR Department </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Users
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                
              </span>

              <span className="text-xs text-gray-500"> 00 </span>
            </p>
          </div>
        </article>
        </Link>

     
    
       <div className="flex justify-around bg-white rounded-lg py-8 col-span-full justify-center">
       { /*
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          */}
          <div>
            <Doughnut data={data} />
          </div>
        </div> 
      </div>
    </>
  );
}

export default Dashboard;
