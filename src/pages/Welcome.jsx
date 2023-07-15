import {React ,useContext, useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import '../styles/Welcome.css';
import Todos from '../components/Todos';
import Swal from "sweetalert2";
const Welcome = () => {
  const [todos, setTodos] = useState(null);
  const [todo,setTodo] = useState('');
  const [user] = useContext(userContext);
  const getTodo = async()=>{
    try {
            const body = {
                author: user.username,
                userId: user._id
            }
            const res = await fetch(`http://localhost:5000/getTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
        setTodos(data['Success']);
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
  const createTodo = async(e)=>{
    e.preventDefault();
         try {
            const body = {
                todo: todo,
                author: user.username,
                userId: user._id
            }
            const res = await fetch(`http://localhost:5000/postTodo`, {
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
                title: `Updated`,
                showConfirmButton: false,
                timer: 1500,
            });
            setTodo('');
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
  useEffect(() => {
    if(user){
      getTodo();
    }
  }, [todos]);
  return (
    <div className='main'>
      <nav className='navbar'>
        <h1>toDoApp;</h1>
        {user && <h3>Logged in as {user && user.username}</h3>}
        {user && <button onClick={()=>{window.location.reload()}}>SignOut</button>}
        {!user && 
        <div>
        <Link to='/login'><button >Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
        </div>
}
      </nav>
      {
      user ? 
      <>
      <form onSubmit={createTodo} className='todoForm'>
        <input value={todo} onChange={(e)=>{setTodo(e.target.value)}} type='text' placeholder='Add a new task' />
        <button type='submit'>
          Create
        </button> 
      </form>
      {todos && <div className='todoList'>
          <h1 style={{fontWeight:'bold',marginLeft:'3px', fontSize:'30px'}}>the Todos;</h1>
            {todos.map((task, x) => (
              <Todos x={x} todo={task.todo} author={task.author} time={task.time} todoId={task._id} isCompleted={task.isCompleted} />
            ))}
      </div>}
      {!todos && <h1 style={{fontWeight:'normal'}}>No Todos Created</h1>}
      </>
      : <h1 style={{fontWeight:'normal'}}>Login Or Register To Continue</h1>
      }
    </div>
  );
}

export default Welcome;
