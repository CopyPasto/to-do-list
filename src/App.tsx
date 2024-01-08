import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid'

export type FilterValueType = "all" | "completed" | "active";
 type TodoListType={id:string,title:string,filter:FilterValueType}
function App() {


    let toDoListId0 = v1();
    let toDoListId1 = v1();

    const [dataTodoLists, setTodoList ] = useState<Array<TodoListType>>([
        {id:toDoListId0, title:"Whath to learn",filter:"active"},
        {id:toDoListId1, title:"Whath to learn",filter:"all"},
    ])

    const [tasks, setTasks ] = useState({
        [toDoListId0]: [{id: v1(), title: "CSS", isDone: false},
                        {id: v1(), title: "Movies", isDone: true},
                         {id: v1(), title: "Books", isDone: false},
                         {id: v1(), title: "Game", isDone: true}],
        [toDoListId1]: [{id: v1(), title: "CSS", isDone: false},
                        {id: v1(), title: "Movies", isDone: true},
                        {id: v1(), title: "Books", isDone: false},
                         {id: v1(), title: "Game", isDone: true}],

    });

    function removeTask (idTask:string,idList:string){
        let task = tasks[idList];
        tasks[idList] = task.filter((task) => {
            return task.id !== idTask
        });
        setTasks({...tasks});
    }
    function  changeFilter(value:FilterValueType,todoListId:string){
        let todolist = dataTodoLists.find(l=>l.id===todoListId)
        if(todolist){
            todolist.filter = value;
            setTodoList([...dataTodoLists]);
        }
    }
    function addTask(title:string,idList:string){
        let newTask:TasksType = {id:v1(), title:title, isDone:false};
        tasks[idList]=[newTask, ...tasks[idList]];
            setTasks({...tasks});
    }
    function changeTasksStatus(idTask:string,todoListId :string,isDone:boolean){
        let task = tasks[todoListId].find((task)=> {
           return  task.id === idTask;});
        if(task){
            task.isDone = isDone;
        }
      setTasks({...tasks}) ;
    }



    let todoLists = dataTodoLists.map((dtl)=>{

        let taskForToDoList = tasks[dtl.id];

        if(dtl.filter==="completed"){
            taskForToDoList= tasks[dtl.id].filter((tl:TasksType)=>{
                return tl.isDone;
            })
        }
        if(dtl.filter==="active"){
            taskForToDoList = tasks[dtl.id].filter((tl:TasksType)=>{
                return !tl.isDone;
            })
        }
        return <TodoList
                 key={dtl.id}
                 id={dtl.id}
                 title={dtl.title}
                 task={taskForToDoList}
                 removeTask={removeTask}
                 changeFilter={changeFilter}
                 addTask={addTask}
                 changeTasksStatus={changeTasksStatus}
                 filter={dtl.filter}
        />

    })

    return (
      <div className="App">
          {todoLists}
      </div>
  );
}

export default App;
