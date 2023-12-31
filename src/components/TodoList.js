import React, { useEffect, useState } from 'react'
import "./TodoList.css";
import "./TodoList_media.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoList() {
    

    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() =>{
        if(localStorage.getItem("todos") && localStorage.getItem("completedTodos")){
            console.log("Enters TodoList")
            let todosList = JSON.parse(localStorage.getItem("todos"));
            let completedTodoList = JSON.parse(localStorage.getItem("completedTodos"));
            console.log(todosList)
            setTodos([...todosList]);
            setCompletedTodos([...completedTodoList]);
        }
        else{
            console.log("Enters Else")
            localStorage.setItem("todos", JSON.stringify([]));
            localStorage.setItem("completedTodos", JSON.stringify([]));
        }
    }, []);


    function handleKeyUp(e){
        e.preventDefault();
        if(e.keyCode === 13){
            let todoTitle = e.target.value;

            let newTodo = {
                title: todoTitle,
                isCompleted : false,
                createdOn : Date.now()
            }

            setTodos([newTodo, ...todos] );
            localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
            e.target.value = ""
            toast("Todo Item Added successfully !")
        }

    }

    function handleMarkAsComplete(e, createdOn){
        console.log(createdOn)
        let availableTodos = [...todos];
        let compTodos = [...completedTodos];
        availableTodos.forEach((todo) => {
            if(todo.createdOn === createdOn){
                todo.isCompleted = true;
                compTodos = [todo, ...compTodos];
            }
        })

        setTodos([...availableTodos]);
        setCompletedTodos([...compTodos])
        localStorage.setItem("todos", JSON.stringify([...availableTodos]));
        localStorage.setItem("completedTodos", JSON.stringify([...compTodos]))
        toast("Todo Item Marked as Completed !")
    }

    function handleResetTodos(){
        setTodos([]);
        setCompletedTodos([])
        localStorage.setItem("todos", JSON.stringify([]));
        localStorage.setItem("completedTodos", JSON.stringify([]));
        toast("Todo List Reset !")
    }
    return (
        <div>
            <div id='todoCreator'>
                <div>
                    <input onKeyUp={handleKeyUp} type='text' placeholder='Enter todo title' />
                </div>
                <div>
                    <button onClick={handleResetTodos}>Reset Todos</button>
                </div>
            </div>
            <h3 style={{textAlign: "center"}}>Pending Todos</h3>
            <div id='newTodos'>
                {todos.map((todo) =>{
                    if(!todo.isCompleted){
                        return (
                            <div className='todoItem' key={todo.createdOn}>
                                <div className='todoDescription'>
                                    <p>{todo.title}</p>
                                    <p>Status <b> Incomplete</b> </p>
                                </div>
                                <div className='btnContainer'>
                                    <button onClick={(e) => handleMarkAsComplete(e, todo.createdOn)}>Mark as Complete</button>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>


            <h3 style={{textAlign : "center"}}>Completed Todos</h3>
            <div id='completedTodos'>
                {completedTodos.map((todo) =>{
                    if(todo.isCompleted){
                        return (
                            <div className='completedTodo' key={todo.createdOn}>
                                <p>{todo.title}</p>
                                <p>Status <b> Completed</b> </p>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
        </div>
    )
}
