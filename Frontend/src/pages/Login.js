// import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  
  const authCheck = () => {
    setTimeout(() => {
      axios.get('http://127.0.0.1:8000/api/login')
        .then((response) => {
          const data = response.data;
          alert('Successfully Login');
          localStorage.setItem('user', JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate('/');
          });
        })
        .catch((error) => {
          alert('Wrong credentials. Try again');
          console.error('Error:', error);
        });
    }, 3000);
  };

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");



  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email: email,
        password: pass,
      });

      console.log('Login successful:', response.data);

      // Optionally handle success, e.g., store admin ID in localStorage
      localStorage.setItem('adminId', response.data.admin_id);

      // Redirect or navigate to another page upon successful login
      // Example: history.push('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen  items-center place-items-center">
        <div className="flex justify-center">
          
          <img src={require("../assets/Login.png")} alt="" style={{width:"70%"}}/>
         
        </div>

        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <img
              className="mx-auto h-33 w-auto"
              src={require("../assets/logo.jpg")}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Signin to Admin account
            </h2>
       
          </div>
          <form className="mt-8 space-y-6" onSubmit={login}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  
                   onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
               
                  onChange={(e) => setpass(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
           

              <div className="text-sm">
                <span
                  className="font-medium text-black hover:text-indigo-500"
                >
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-black py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                </span>
                Sign in
              </button>
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
