import {React, useState, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../App';
import '../styles/Register.css';
import Swal from "sweetalert2";
const Register = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [,setUser] = useContext(userContext);
    const register=async(e)=>{
        e.preventDefault();
         try {
            const body = {
                username: username,
                email: email,
                password:password
            }
            const res = await fetch(`http://localhost:5000/register`, {
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
                title: data['Success'],
                showConfirmButton: false,
                timer: 1500,
            });
            setUser({
                username: username,
                email: email,
                password:password,
                userId: data['id']
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
            <h1>Register</h1>
            <form onSubmit={register} className='form'>
                <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username' />
                <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email' />
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' />
                <button type='submit'>Register</button>
            </form>
            <p>Or <Link to='/login'>Login</Link> To Continue</p>
        </div>
    )
}

export default Register
