import {React, useState, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../App';
import Swal from "sweetalert2";
import '../styles/Register.css';
const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [,setUser] = useContext(userContext);
    const login=async(e)=>{
        e.preventDefault();
         try {
            const body = {
                email: email,
                password:password
            }
            const res = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
        if(data['Success']){
             Swal.fire({
                icon: "success",
                title: `Welcome back, ${data['Success']}`,
                showConfirmButton: false,
                timer: 1500,
            });
            setUser({
                username: data['Success'],
                userId: data['id'],
                email: email,
                password:password
            });
            navigate('/');
        }
            else{
                Swal.fire({
                icon: "error",
                title: data['Error'],
                showConfirmButton: false,
                timer: 1500,
            }); 
            }
        }
        catch (error) {
                Swal.fire({
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500,
            }); 
        }
    }
    return (
        <div className='main'>
            <h1>Login</h1>
            <form onSubmit={login} className='form'>
                <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email' />
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' />
                <button type='submit'>Login</button>
            </form>
            <p>Or <Link to='/register'>Register</Link> To Continue</p>
        </div>
    )
}

export default Login
