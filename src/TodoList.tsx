import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { FilterValueType} from "./App";

export type ErrorValue = null|string;
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
    changeTasksStatus:(id:string,isDone :boolean)=>void
    filter:FilterValueType
}
export function TodoList(props:PropsType) {
    const [string, setString] = useState("");
    const[error,setError] = useState<ErrorValue>(null)
    let onChangeFilterCompleted = function (){props.changeFilter("completed")};
    let onChangeFilterActive = function (){props.changeFilter("active")};
    let onChangeFilterAll = function (){props.changeFilter("all")};
    let addTask = function (){
        if(string.trim() !==""){
            props.addTask(string)
            setString("")
        }else{
            setError("Title is required");
        }

    }

    let onKeyUp = function (e: KeyboardEvent<HTMLInputElement>){
        setError(null);
        if(e.key === "Enter"){
        addTask();
        }};
    let changeValue = function (e:ChangeEvent<HTMLInputElement>){
        setString(e.currentTarget.value);

    };

    const listLi = props.task.map(function (t){
        const onClickHandler = () => props.removeTask(t.id);
        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
            props.changeTasksStatus(t.id,e.currentTarget.checked)}

        return <li className={t.isDone ? "is-done" : ""} key ={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={(e:ChangeEvent<HTMLInputElement>)=>{onChangeHandler(e)}}/>

                    <span>{t.title}</span>
                    <button onClick={()=>{onClickHandler()}}>x</button>

                </li>
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input  value={string}
                        onChange={(e)=>{changeValue(e)}}
                        onKeyUp={(e)=>{onKeyUp(e)}}
                        className={error ? "error": ""}
                />
                <button onClick={()=>{addTask()}}>+</button>
                {error && <div className="error-message">{error}</div>}
                <ul>
                    {listLi}
                </ul>
                <div>
                    <button className={props.filter === "all"? "active-filter" : ""} onClick={()=>{onChangeFilterAll()}}>All</button>
                    <button className={props.filter === "active"? "active-filter" : ""} onClick={()=>{onChangeFilterActive()}}>Active</button>
                    <button className={props.filter === "completed"? "active-filter" : ""} onClick={()=>{onChangeFilterCompleted()}}>Completed</button>
                </div>
            </div>

        </div>
    )
}
