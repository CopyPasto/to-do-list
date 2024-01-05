import React, {useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id:string,
    title:string,
    isDone:boolean
}

type PropsType = {
    title: string
    task: Array<TasksType>
    removeTask :(id:string)=>void
    changeFilter:(value:FilterValueType)=>void
    addTask:(title:string)=>void
}
export function TodoList(props:PropsType) {

    const [string, setString]=useState("");

    let {title,task,removeTask, changeFilter,addTask} = props;


    const listLi = task.map(function (t){
        return <li key ={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={()=>{removeTask(t.id)}}>x</button>
                </li>
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input  value={string}
                        onChange={(e)=>{
                            setString(e.currentTarget.value)}}
                        onKeyUp={(e)=>{
                            if(e.key === "Enter"){
                            addTask(string);
                            setString("");
                        }}}/>
                <button onClick={()=>{
                    addTask(string)
                    setString("")
                }}>+</button>
                <ul>
                    {listLi}
                </ul>
                <div>
                    <button onClick={()=>{ changeFilter("all")}}>All</button>
                    <button onClick={()=>{ changeFilter("active")}}>Active</button>
                    <button onClick={()=>{ changeFilter("completed")}}>Completed</button>
                </div>
            </div>

        </div>
    )
}