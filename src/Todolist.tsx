import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterTypeValue} from "./App";
// import {log} from "util";

//type of data
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TypeOfProps = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterTypeValue, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: string//FilterTypeValue
    id: string
    removeTodolist: (todolistId: string) => void
}


// C O M P O N E N T
export function Todolist(props: TypeOfProps) {
    //Local state for input
    const [title, setTitle] = useState("");
    //State for error
    const [error, setError] = useState<"Field is required" | "">("");
    //addTask
    const addTask = () => {
        if (title.trim() === "") {
            setError("Field is required");
            return
        }
        props.addTask(title.trim(), props.id);
        setError("");
        setTitle("");
    };
    //OnKeyPressHandler
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };
    //OnChangeHandler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setTitle(e.currentTarget.value);
    };
    //OnChangeFilter
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);


//Create tasks from props.task
    let tasks = props.task.map(t => {

        const onRemoveTaskHandler = () => props.removeTask(t.id, props.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
        };

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onRemoveTaskHandler}>x</button>
        </li>
    });
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

// J S X
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input type="text" value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    )
}