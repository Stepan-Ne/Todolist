import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'html&css', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Java', isDone: false}
    ]);
    // let initialState = tasks;
    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasksForTodolist = tasks;

    function removeTask(id: number) {
        let resultTasks = tasks.filter(t => t.id !== id);
        setTasks(resultTasks);
    }
    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone !== false)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone !== true)
    }


    return (
        <div className="App">
            <Todolist title='What to learn?' tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                      removeTask={removeTask}/>
        </div>
    );
}


export default App;
