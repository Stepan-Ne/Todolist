import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export  type FilterTypeValue = 'all' | 'completed' | 'active';

function App() {

//the hook for removeTask function
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'html/css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);

    //to remove a task
    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => id !== t.id);
        setTasks(filteredTasks);
    }

//для фильтрации необх менять значение в фильтре,  не в local state!
    //эти значения поместим в useState

    // let [filter, setFilter] = useState<FilterTypeValue>('all');

    //Array of TODOLISTS
    const [todolists, setTodolists] = useState([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"}
    ])


    function changeFilter(value: FilterTypeValue, todolistId: string) {
       // 1. find list with id
       // 2. todolist.filter = value - this is link to the obj and we change value of both obj-s
       // 3. that is why in setTodolists we will put his todolists but with spread-operator that setTodolists takes the changes!
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists]);
    }


    //Add Task
    function addTask(value: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        let setNewTask = [newTask, ...tasks];
        setTasks(setNewTask);
    }

    //Change status of task
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => taskId === t.id);//task is object
        if (task) {
            task.isDone = isDone; //e.currentTarget.checked
        }
        let copy = [...tasks];
        setTasks(copy)
    }

    return (
        <div className="App">
            {todolists.map(tl => {

                let tasksForTodolist = tasks;
                if (tl.filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }

                return <Todolist title={tl.title}
                                 key={tl.id}
                              task={tasksForTodolist}
                              id={tl.id}
                              changeTaskStatus={changeStatus}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              filter={tl.filter}
                              removeTask={removeTask}
                    />
                }
            )}

        </div>
    );
}

export default App;