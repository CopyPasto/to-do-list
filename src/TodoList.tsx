import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
    let onChangeFilterCompleted = function (){props.changeFilter("all")};
    let onChangeFilterActive = function (){props.changeFilter("all")};
    let onChangeFilterAll = function (){props.changeFilter("all")};
    let addTask = function (){
        if(string.trim() ===""){
            return
        }
        props.addTask(string)
        setString("")
    }

    let onKeyUp = function (e: KeyboardEvent<HTMLInputElement>){ if(e.key === "Enter"){
        if(string.trim()===""){
            return
        }
        props.addTask(string);
        setString("");
        }
    };
    let changeValue = function (e:ChangeEvent<HTMLInputElement>){setString(e.currentTarget.value)};


    const listLi = props.task.map(function (t){
        return <li key ={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={()=>{props.removeTask(t.id)}}>x</button>
                </li>
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input  value={string}
                        onChange={(e)=>{changeValue(e)}}
                        onKeyUp={(e)=>{onKeyUp(e)}}
                />
                <button onClick={()=>{addTask()}}>+</button>
                <ul>
                    {listLi}
                </ul>
                <div>
                    <button onClick={()=>{onChangeFilterAll()}}>All</button>
                    <button onClick={()=>{onChangeFilterActive()}}>Active</button>
                    <button onClick={()=>{ onChangeFilterCompleted()}}>Completed</button>
                </div>
            </div>

        </div>
    )
}
