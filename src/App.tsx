import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export  type FilterTypeValue = 'all' | 'completed' | 'active';

function App() {

//the hook for removeTask function
    let [tasks, setTasks] = useState< Array<TaskType>>([
        {id: v1(), title: 'html/css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    //to remove a task
    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => id !== t.id)
        setTasks(filteredTasks)
    }
//для фильтрации необх менять значение в фильтре,  не в local state!
    //эти значения поместим в useState
    let tasksForTodolist = tasks;
    let [filter, setFilter] = useState<FilterTypeValue>('all')


    function changeFilter(value: FilterTypeValue) {
        setFilter(value);
    }
    switch (filter) {
        case 'completed':
            tasksForTodolist =  tasks.filter((t) => t.isDone === true)
            break;
        case 'active':
            tasksForTodolist = tasks.filter((t) => t.isDone === false)
    }
    //Add Task
    function addTask(value: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        let setNewTask = [newTask, ...tasksForTodolist]
        setTasks(setNewTask)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn?'} task={tasksForTodolist}
                      changeFilter={changeFilter}
                      removeTask={removeTask}/>
        </div>
    );
}


export default App;
