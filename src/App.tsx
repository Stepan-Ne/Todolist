import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export  type FilterTypeValue = 'all' | 'completed' | 'active';
type TodolistType = {
    id: string
    title: string
    filter: FilterTypeValue
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'html/css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Java', isDone: true},
            {id: v1(), title: 'Spring', isDone: true},
        ]
    });

    //to remove task
    function removeTask(id: string, tlId: string) {
        let filteredTasks = tasksObj[tlId].filter((t) => id !== t.id);
        tasksObj[tlId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterTypeValue, tlId: string) {
        //find todolist:
        let todolist = todolists.find(tl => tl.id === tlId);
        //change value of common object which linked(!) todolist:
        if (todolist) {
            todolist.filter = value;
            //rerender todolists:
            setTodolists([...todolists]);
        }
    }

    //Add Task
    function addTask(value: string, tlId: string) {
        let newTask = {id: v1(), title: value, isDone: false};
        let task = tasksObj[tlId];
        task = [newTask, ...task];
        tasksObj[tlId] = task;
        setTasks({...tasksObj});
    }

    //Change status of task
    function changeStatus(taskId: string, isDone: boolean, tlId: string) {

        let task = tasksObj[tlId].find(t => taskId === t.id);//task is object
        if (task) {
            task.isDone = isDone; //e.currentTarget.checked
            setTasks({...tasksObj});
        }
    };

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]);
    const addItem = (title: string) => {
        let newTodoList: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        tasksObj[newTodoList.id] = [];
        setTasks({...tasksObj});
        setTodolists([newTodoList, ...todolists]);
    };
    const removeTodolist = (id: string) => {
        let newTodolists = todolists.filter(tl => tl.id != id);
        setTodolists(newTodolists);
    };
    const onChangeTitleTask = (newTitle: string, taskId: string, tlId: string) => {
        //find Tasks of Todolist
        const findedTasks = tasksObj[tlId];
        //find task
        const findedTask = findedTasks.find(tsk => tsk.id === taskId);
        //change title of task
        if (findedTask) {
            findedTask.title = newTitle;
        }
        setTasks({...tasksObj});
    };

    //Chane title of Todolist
    function onChangeTodolistTitle(newTitle: string, tlId: string) {
        //find Todolist
        const findedTodolist = todolists.find(tl => tl.id === tlId);
        //change title of Todolist
        if(findedTodolist) {
            findedTodolist.title = newTitle;
        }
        setTodolists([...todolists]);
    }

    return (
        <div className="App">

            <AddItemForm addItem={addItem}/>

            {todolists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }

                return <Todolist title={tl.title} task={tasksForTodolist}
                                 onChangeTodolistTitle={onChangeTodolistTitle}
                                 onChangeTitleTask={onChangeTitleTask}
                                 removeTodolist={removeTodolist}
                                 key={tl.id}
                                 id={tl.id}
                                 changeTaskStatus={changeStatus}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 filter={tl.filter}
                                 removeTask={removeTask}/>
            })}

        </div>
    );
}

export default App;