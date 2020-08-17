import React from "react";

//type of data
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TypeOfProps = {
    title: string
    task: Array<TaskType>
    removeTask: Function
    changeFilter: Function
}



export function Todolist(props: TypeOfProps) {

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
                <input type="text"/>
                <button>+</button>
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