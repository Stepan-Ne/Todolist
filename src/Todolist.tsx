import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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


// C O M P O N E N T
export function Todolist(props: TypeOfProps) {
    //Local state for input
    const [title, setTitle] = useState("")
    //addTask
    const addTask = () => {
        props.addTask(title);
        setTitle("")
    }
    //OnKeyPressHandler
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    //OnChangeHandler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    //OnChangeFilter
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');


//Create tasks from props.task
    let tasks = props.task.map(t => {

        const onRemoveTaskHandler = () => props.removeTask(t.id)

        return <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={onRemoveTaskHandler}>x</button>
    </li>})
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    )
}