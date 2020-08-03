import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";


function App() {

    const tasks1: Array<TasksType> = [
        {id: 1, title: 'html&css', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]
    const tasks2: Array<TasksType> = [
        {id: 1, title: 'sql', isDone: false},
        {id: 2, title: 'python', isDone: false},
        {id: 3, title: 'django', isDone: false}
    ]
    const tasks3 = [
        {id: 1, title: 'Mysql', isDone: false},
        {id: 2, title: 'java', isDone: true},
        {id: 3, title: 'spring', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title='What to learn?' tasks={tasks1}/>
            <Todolist title='What to read?' tasks={tasks2}/>
        </div>
    );
}

export default App;
