import React, { useState,useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import data from './Options.json'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {

  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [direction ,setDirection] = useState(false)

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const navigate = useNavigate();

    
  useEffect(() => {
    if (direction) {
      toast.success('Successfully registered');
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 1200);

      return () => clearTimeout(redirectTimeout);
    }
  }, [direction, navigate]);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    if (!selectedOption){
      toast.error("Please select option");
    }else{
    axios.post('http://localhost:5000/api/register',
     { name : name, selectedOption : selectedOption, isChecked : isChecked,userName:userName })
      .then((response) => {
        console.log('Registration successful:', response.data);
        setDirection(true);
      })
      .catch((error) => {
        toast.error('This nickname has already been registered');
        console.error('Registration failed:', error);
      });
    }
  };

  return (
    <div className='grow flex items-center justify-center h-screen '>
      <Toaster /> 
      <div className=''>
        <h1 className='text-2xl font-semibold text-center mb-4'>Register</h1>
        <form className='max-w-md  mx-5 md:mx-auto' onSubmit={handleSubmit} >
          <input
            required
            value={name}
            type='name'
            className='w-full border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='Please Enter Your Name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            value={userName}
            type='name'
            className='w-full border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='Please Enter your unique nickname'
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className='w-full  border-2 my-1 py-2 px-3 rounded-xl text-gray-600'>
          <label htmlFor="jobs">Sectors you are currently involved in ?</label>
          <select  id="jobs" onChange={handleSelectChange} value={selectedOption}>
            {data.map(data=><option key={data} value={data}>{data}</option>)}
          </select>
        </div>
        <div>
      <input
        required
        type="checkbox"
        id="myCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="myCheckbox">Agree to terms</label>
    </div>
          <button className='bg-primary text-gray-100 bg-green-600 w-full my-1 py-2 px-3 rounded-xl'>Save</button>
        </form>
      </div>
    </div>
  );
}