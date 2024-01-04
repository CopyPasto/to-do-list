import React from "react";

export type TasksType = {
    id:number,
    title:string,
    isDone:boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
}
export function TodoList(props:PropsType) {
let {title,tasks} = props;

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
                <ul>
                    <li><input data-id={tasks[0].id} type="checkbox" checked={tasks[0].isDone}/><span>{tasks[0].title}</span></li>
                    <li><input data-id={tasks[1].id} type="checkbox" checked={tasks[0].isDone}/><span>{tasks[1].title}</span></li>
                    <li><input data-id={tasks[2].id} type="checkbox" checked={tasks[0].isDone}/><span>{tasks[2].title}</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>

        </div>
    )
}