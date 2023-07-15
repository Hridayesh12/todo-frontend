import {React, useState} from 'react';
import Swal from "sweetalert2";
const Todos = ({todoId, todo, author, time, isCompleted}) => {
    const [todoIds, settodoIds] = useState(todoId);
    const [todos, settodos] = useState(todo);
    const [isCompleteds, setisCompleteds] = useState(isCompleted);
    const [isEdit, setisEdit] = useState(false);

    const saveEdit=async()=>{
         try {
            const body = {
                todo: todos,
                isCompleted:isCompleteds
            }
            const res = await fetch(`http://localhost:5000/updateTodo/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
        if(data['Success']){
             Swal.fire({
                icon: "success",
                todo: `${data['Success']}`,
                showConfirmButton: false,
                timer: 1500,
            });
            setisEdit(!isEdit);
        }
            else{
                Swal.fire({
                icon: "error",
                todo: data['Error'],
                showConfirmButton: false,
                timer: 1500,
            }); 
            }
        }
        catch (error) {
                Swal.fire({
                icon: "error",
                todo: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500,
            }); 
        }
    }
    const deleteTodo=async()=>{
        try{
const res = await fetch(`http://localhost:5000/deleteTodo/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
        }
        catch (error) {
                Swal.fire({
                icon: "error",
                todo: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500,
            }); 
        }
    }
  return (
    
          <div className='todo'>
            {isEdit ? 
            <>
            <div className='todoLeft'>
            <input type='text' value={todos} onChange={(e)=>{settodos(e.target.value)}} />
             <div className="todoRadio">
				<h2 style={{fontSize:'20px',fontWeight:'normal'}}>Completed</h2>
				<div className="todoRadioButton">
					<div style={{display:"flex"}}>
						<input	type="radio" id="isCompleted" name="isCompleted" value="yes" checked={isCompleteds === "yes"}onChange={(e) => {setisCompleteds("yes");}}/>
						&nbsp;<label>Yes</label>
					</div>
					<div style={{display:"flex"}}>
						<input type="radio" id="isCompleted" name="isCompleted" value="no" checked={isCompleteds === "no"} onChange={(e) => {setisCompleteds("no");}}/>
							&nbsp;
							<label>No</label>
					</div>
				</div>
			</div>
            </div>
              <div className='todoRight'>
                <button onClick={()=>{saveEdit()}}>Save</button>
                <button onClick={()=>{setisEdit(!isEdit)}}>Close</button>
              </div>
            </>
            : 
            <>
            <div className='todoLeft'>
              <h1 >{todo}</h1>
             <div>
               <h3>{author}</h3>
              <h3>Added Few {time} Ago</h3>
             </div>
              </div>
              <div className='todoRight'>
                <button>{isCompleteds === 'yes' ? 'Complete' : 'InComplete'}</button>
                <button onClick={()=>{setisEdit(!isEdit)}}>Edit</button>
                <button onClick={()=>{deleteTodo()}}>Delete</button>
              </div>
            </>
            }
          </div>
  );
}

export default Todos;
