import React, {useState} from "react";
import {FilterTypeValue} from "./App";
import {log} from "util";

//type of data
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TypeOfProps = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterTypeValue) => void
    addTask: (value: string) => void
}



export function Todolist(props: TypeOfProps) {
    //Local state for input
    const [title, setTitle] = useState("")
    //addTask
    const addTask = () => {
        props.addTask(title);
        setTitle("")
    }
    //add Task with Enter
    const onKeyPressHandler = (value: number) => {
        if (value === 13) {
            props.addTask(title);
            setTitle("")
        }
    }

//Create tasks from props.task
    let tasks = props.task.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => {props.removeTask(t.id)}}>x</button>
    </li>)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" value={title}
                       onKeyPress={e => onKeyPressHandler(e.charCode)}
                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>

        </div>
    )
}