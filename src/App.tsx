import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TasksType} from "./TodoList";


function App() {

let tasks1:Array<TasksType>=[
    {id:1, title:"CSS", isDone:true},
    {id:2, title:"Movies", isDone:true},
    {id:3, title:"Books", isDone:true},
];

let tasks2:Array<TasksType> = [
    {id:1, title:"Batmen", isDone:true},
    {id:2, title:"Son", isDone:true},
    {id:3, title:"Red", isDone:true}
];


    return (
      <div className="App">
          <TodoList title="Wath to learn" tasks={tasks1}></TodoList>
          <TodoList title="Movies" tasks={tasks2}></TodoList>
      </div>
  );
}

export default App;
