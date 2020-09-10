import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
// import set = Reflect.set;


export  type FilterTypeValue = 'all' | 'completed' | 'active';
type TasksStateType = {
    [key: string] : Array<TaskType>
}

function App() {

//the hook for removeTask function
//
    let todolist1 = v1();
    let todolist2 = v1();
    //Array of TODOLISTS
    const [todolists, setTodolists] = useState([
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]);
    //Arrays of Tasks
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
        ],
        [todolist2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},

        ]
    })

    //to remove a task
    function removeTask(id: string, todolistId: string) {
        //get array of tasks with todolistId
        let todolistTasks = tasks[todolistId];
        //filter tasks - delete that which has id
        tasks[todolistId] = todolistTasks.filter((t) => id !== t.id);
        setTasks({...tasks});
    }

//для фильтрации необх менять значение в фильтре,  не в local state!
    //эти значения поместим в useState

    // let [filter, setFilter] = useState<FilterTypeValue>('all');

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
    function addTask(value: string, todolistId: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }

    //Change status of task
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];

        let changingTask = todolistTasks.find(t => taskId === t.id);//task is object
        if (changingTask) {
            changingTask.isDone = isDone; //e.currentTarget.checked
            setTasks({...tasks});
        }
    }

    //Remove Todolist
    function removeTodolist(todolistId: string) {
        //find todolist with id
        let newTodolists = todolists.filter(tl => tl.id != todolistId);
        setTodolists(newTodolists);
        delete tasks[todolistId];

    }

    return (
        <div className="App">
            {todolists.map(tl => {

                    let alltasksForTodolist = tasks[tl.id];
                    let tasksForTodolist = alltasksForTodolist;

                    if (tl.filter === "active") {
                        tasksForTodolist = alltasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = alltasksForTodolist.filter(t => t.isDone === true);
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
                                     removeTodolist={removeTodolist}
                    />
                }
            )}

        </div>
    );
}

export default App;