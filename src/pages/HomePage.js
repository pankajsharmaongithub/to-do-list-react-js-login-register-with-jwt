import React, { useState, useEffect } from "react";
import "../home.css";
import axios from "axios";
import Header from "../components/Header"


function HomePage() {

  const [taskInput, setTaskInput] = useState('');
  const [editInput, seteditInput] = useState();

  const [taskList, setTaskList] = useState([]);
  const [completetaskList, setCompletetaskList] = useState([]);
  const [selectedTask, setselectedTask] = useState('');


  const email=localStorage.getItem('task_email');

 

  const getDailyTask = () => {

    axios
    .get("http://localhost:5000/getDailyTask/0/"+email)
    .then((response) => {
      if(response.data)
      {
        setTaskList(response.data);
      }else{
        setTaskList([]);
      }
    }).catch((err) => console.log(err));
    
};




const getCompleteTask = () => {

  axios
  .get("http://localhost:5000/getDailyTask/1/"+email)
  .then((response) => {
    if(response.data)
    {
      setCompletetaskList(response.data);
    }else{
      setCompletetaskList([]);
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
      const listData = { task: taskInput ,email:email};
        axios
          .post("http://localhost:5000/createTask/", listData)
          .then((response) => {
            if(response.data.status===200)
            {
                
              // setTaskList([...taskList, listData]);
              getDailyTask();
              setTaskInput("");

            }else{
                
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));
    }
  };


  const updateTaskStatus=(id,status)=>{

          axios
          .post("http://localhost:5000/updateTaskStatus", {id:id,status:status})
          .then((response) => {
            if(response.data.status===200)
            {
              if(status===1){
                const newList = taskList.filter((item) => item._id !== id);
                setTaskList(newList);
                getCompleteTask();
              }else{
                const newCompletetaskList = completetaskList.filter((item) => item._id !== id);
                setCompletetaskList(newCompletetaskList);
                getDailyTask();
              }
              


            }else{
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));

    
  }


  const editTask=(task,e)=>{ 
    if(selectedTask===e){ setselectedTask('') }
    else{ 
      setselectedTask(e);
      seteditInput(task);
    }
  }

  const updateTask=()=>{
    if(editInput==''){return;}
    const data={task:editInput,id:selectedTask}
      axios
          .post("http://localhost:5000/updateTask", data)
          .then((response) => {
            if(response.data.status===200)
            {
              seteditInput(editInput);
              setselectedTask('')
              getCompleteTask();
              getDailyTask();
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

              const newCompletetaskList = completetaskList.filter((item) => item._id !== id);
              setCompletetaskList(newCompletetaskList);
            
            }else{
                console.log(response.data);
                return;
            }
          })
          .catch((err) => console.log(err));
    
  };



  useEffect(() => {
    
    getCompleteTask();
    getDailyTask();

  },[]);



  return (
    <>

        <div className="container-fluid p-0">
          <div className="row">
            { <Header />}
          </div>
        


      <div className="container">

               
        <div className="row py-2  rounded  wrapper2">
          <div className="col-12">
            <h4>✍️ Add new Task</h4>
          </div>
          <div className="col-12 addTaskBox">
            <textarea
              onChange={onchangeInput}
              className="form-control mb-2"
              rows={2}
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
                        (selectedTask == elem._id) 
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
                      
                        <div className="taskName">Create date:  { elem.create_date }</div>
                        <div className="taskActionBox">
                        <div className="form-check checkbox-xl" onChange={()=>{updateTaskStatus(elem._id,1)}}>
                          <input
                            className="form-check-input checkBox1"
                            type="checkbox"
                            defaultValue=""
                            id="checkbox-2"
                            defaultChecked=""
                          />
                          <label className="pt-1 me-3">Mark as complete</label> 
                        </div>
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

          <div className=" col-md-6 p-4 ">
            <div className="wrapper2 ">
              <div className="heading2 my-3">
                <h4>Completed  Task</h4>
              </div>

              <div className="col-12">
                {completetaskList.map((elem, index) => {
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
                             { elem.task }
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
                          <s>{elem.task}</s>
                        </div>   
                      }
                      
                        <div className="taskName">Update date: { elem.update_date }</div>
                        <div className="taskActionBox">
                        <div className="form-check checkbox-xl" onChange={()=>{updateTaskStatus(elem._id,0)}}>
                          <input
                            className="form-check-input checkBox1"
                            type="checkbox"
                            defaultValue=""
                            id="checkbox-2"
                            defaultChecked=""
                          />
                          <label className="pt-1 me-3">Mark as Incomplete</label> 
                        </div>
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

      </div>
    </>
  );
}

export default HomePage;
