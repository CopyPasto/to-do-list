import React from 'react';
import {useState} from "react";
import './App.css';
import {TodoList} from "./TodoList";
import {TasksType} from "./TodoList";
import {v1} from 'uuid'

export type FilterValueType = "all" | "completed" | "active";


function App() {

    const [tasks, setTasks ] = useState<Array<TasksType>>([
        {id:v1(), title:"CSS", isDone:false},
        {id:v1(), title:"Movies", isDone:true},
        {id:v1(), title:"Books", isDone:false},
        {id:v1(), title:"Game", isDone:true},
    ])
    const [filter, setFilter ] = useState<FilterValueType>("all")


    let newTasks:TasksType[] = tasks;

    if(filter==="completed"){
        newTasks = newTasks.filter((task)=>{
            return task.isDone;
        })
    }
    if(filter==="active"){
        newTasks = newTasks.filter((task)=>{
            return !task.isDone;
        })
    }
    function removeTask (id:string){
         let filterTask: Array<TasksType>  = newTasks.filter((task):boolean=>{
           return task.id !== id
        })
        setTasks(filterTask);
    }
    function  changeFilter(value:FilterValueType){
        setFilter(value);
    }
    function addTask(title:string){
        let newTask:TasksType = {id:v1(), title:title, isDone:false};
        let newTasks:TasksType[]=[newTask, ...tasks];
            setTasks(newTasks);
    }
    function changeTasksStatus(tasksId:string,isDone:boolean){
        let task= tasks.find((t)=> {
           return  t.id === tasksId;});
        if(task){
            task.isDone = isDone;
        }
      setTasks([...tasks]) ;
    }

    return (
      <div className="App">
          <TodoList title="Wath to learn"
                    task={newTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTasksStatus={changeTasksStatus}
                    filter={filter}
          />
      </div>
  );
}

export default App;
