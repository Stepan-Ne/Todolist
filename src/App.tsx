import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";


function App() {

    let initialTasks: Array<TasksType> = [
        {id: 1, title: 'html&css', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
]
    let [tasks, setTasks] = useState(initialTasks);


   function removeTask(id: number) {
       let resultTasks = tasks.filter(t => t.id !== id);
       setTasks(resultTasks);
   }

    return (
        <div className="App">
            <Todolist title='What to learn?' tasks={tasks} removeTask={removeTask} />
        </div>
    );
}


export default App;
