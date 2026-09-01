import {useState} from "react";

function Login(){
    const [phone , setPhoneNumber]=useState('')
    const [password,setPassword]=useState('')


    async function handleLogin(){
        const response = await fetch('http://localhost:5000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: phone,
      password: password})})

  const data = await response.json()

  console.log(data)
    }


    return (
        <div>
    <h1>Real Estate</h1>
    <h2>Login</h2>
    <input type="text" placeholder="Phone Number" value={phone} onChange={event => setPhoneNumber(event.target.value)}/>
    <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
    <button onClick={handleLogin}>Login</button>
    <button>Register</button>
        </div>
    )
}

export default Login