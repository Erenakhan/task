import React, { useEffect, useState } from 'react';
import data from './Options.json'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate();
  const [direction,setDirection] = useState(false);

    
  useEffect(() => {
    if (direction) {
      toast.success('Successfully updated');
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 1200);

      return () => clearTimeout(redirectTimeout);
    }
  }, [direction, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!selectedOption) {
          toast.error("Please select option");
        } else {
          axios.put('https://task-neon-two.vercel.app/api/register', {
              name: name,
              selectedOption: selectedOption
              ,userName:userName,
            })
            .then((response) => {
              // Check the HTTP status code for success (2xx range)
              if (response.status === 200) {
                console.log('Update successful:', response.data);
                setDirection(true);
              } else {
                // Handle other success cases if needed
                console.log('Unexpected status code:', response.status);
              }
            })
            .catch((error) => {
              // Check the HTTP status code for user not found (404)
              if (error.response && error.response.status === 404) {
                toast.error('User not found');
              } else {
                toast.error('Update failed');
                console.error('Update failed:', error);
              }
            });
        }
      };
      

  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='grow flex items-center justify-center h-screen '>
        <Toaster /> 
      <div className=''>
        <h1 className='text-2xl font-semibold text-center mb-4'>Update Information</h1>
        <form className='max-w-md  mx-5 md:mx-auto' onSubmit={handleSubmit} >
 
          <input
            required
            value={userName}
            type='name'
            className='w-full border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='Please Enter Your unique nickname'
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className='w-full  border-2 my-1 py-2 px-3 rounded-xl text-gray-600'>
          <label htmlFor="jobs">Sectors you are currently involved in ?</label>
          <select  id="jobs" onChange={handleSelectChange} value={selectedOption}>
            {data.map(data=><option key={data} value={data}>{data}</option>)}
          </select>
        </div>
          <button className='bg-primary text-gray-100 bg-green-600 w-full my-1 py-2 px-3 rounded-xl'>Update</button>
        </form>
      </div>
    </div>
  );
}