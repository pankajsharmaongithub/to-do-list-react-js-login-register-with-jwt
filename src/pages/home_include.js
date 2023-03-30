import React, { useState, useEffect } from "react";
import "../home.css";
import axios from "axios";


function HomePage() {

  const [taskInput, setTaskInput] = useState('');
  const [editInput, seteditInput] = useState();

  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setselectedTask] = useState();



  const getDailyTask = () => {

    axios
    .get("http://localhost:5000/getDailyTask")
    .then((response) => {
      if(response.data)
      {
        setTaskList(response.data);
      }else{
        setTaskList([]);
      }
    })
    .catch((err) => console.log(err));
    
};




const onchangeInput = (event) => {
  setTaskInput(event.target.value);
};

const onchangeInput2 = (event) => {
  seteditInput(event.target.value);
};

  const addNewTask = () => {
    if (taskInput) {
      const listData = { task: taskInput };

      
        axios
          .post("http://localhost:5000/createTask", listData)
          .then((response) => {
            if(response.data.status===200)
            {
                
              setTaskList([...taskList, listData]);
              setTaskInput("");

            }else{
                
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));

    }
  };
  
  useEffect(() => {
    getDailyTask();
  },[]);


  const editTask=(task,e)=>{ 
    if(selectedTask===e){ setselectedTask() }
    else{ 
      setselectedTask(e);
      seteditInput(task);
    }
  }

  const updateTask=()=>{
      const data={task:editInput,id:selectedTask}
      axios
          .post("http://localhost:5000/updateTask", data)
          .then((response) => {
            if(response.data.status===200)
            {
              // seteditInput(editInput);
              console.log(editInput);
            }else{
                
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));
  }

  const deleteTask = (id) => {
    
    axios
          .post("http://localhost:5000/deleteTask", {id:id})
          .then((response) => {
            if(response.data.status===200)
            {
              const newList = taskList.filter((item) => item._id !== id);
              setTaskList(newList);
  
              
            }else{
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));
    
  };



  return (
    <>
      <div className="container">
       
        <div className="row py-2  rounded  wrapper2">
          <div className="col-12">
            <h4>✍️ Add new Task</h4>
          </div>
          <div className="col-12 addTaskBox">
            <textarea
              onChange={onchangeInput}
              className="form-control mb-2"
              rows={4}
            >
              {taskInput}
            </textarea>
            <button className="addBtn " onClick={addNewTask}>
              {" "}
              Add Now
            </button>
          </div>
        </div>

        <div className="row ">
          <div className=" col-md-6 p-4 ">
            <div className="wrapper2 ">
              <div className="heading my-3">
                <h4>Daily Task</h4>
              </div>

              <div className="col-12">
                {taskList.map((elem, index) => {
                  return (
                    <div  key={elem._id} >
                      <div className="taskList">
                     
                       { 
                        (selectedTask === elem._id) 
                         ? <div className="col-12 addTaskBox">
                         <textarea
                           onChange={onchangeInput2}
                             className="form-control mb-2"
                             rows={4}
                           >
                             {elem.task }
                           </textarea>
                           <button className="addBtn2 " onClick={()=>{updateTask()}}>
                             Edit Now
                           </button>
                         </div>
                         :  <div className="taskName">
                          {" "}
                          <span>
                            <i className="fa fa-file-text-o"></i>
                          </span>{" "}
                          {elem.task}
                        </div>   
                      }
                      
                        <div className="taskName">{ elem.create_date }</div>
                        <div className="taskActionBox">
                          <i className="fa fa-edit editBtn" onClick={()=>{editTask(elem.task,elem._id)}}></i>
                          <i
                            className="fa fa-trash deleteBtn"
                            onClick={() => deleteTask(elem._id)}
                          ></i>
                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default HomePage;
