import { useState } from 'react';

const RegistrationForm = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyRegisterInfo = { ...registerInfo };
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerInfo;

    if (!name || !email || !password) {
      alert('Name, email, and password are required!');
      return;
    }

    const url = 'http://localhost:5000/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        console.log('Success:', data);
      } else {
        alert(data?.message || 'Registration failed!');
        console.log('Error:', data);
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleRegister} className='space-y-4'>
          <div>
            <label className='block mb-1 font-medium'>Name</label>
            <input
              onChange={handleChange}
              name='name'
              placeholder='Enter your name'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              onChange={handleChange}
              name='email'
              type='email'
              placeholder='Enter your email'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>Password</label>
            <input
              onChange={handleChange}
              name='password'
              type='password'
              placeholder='Enter your password'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
