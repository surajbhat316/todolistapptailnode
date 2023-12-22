import React, { useEffect, useState } from 'react'

export default function TodoList() {
    

    const [todos, setTodos] = useState([]);

    useEffect(() =>{
        if(localStorage.getItem("todos")){
            console.log("Enters TodoList")
            let todosList = JSON.parse(localStorage.getItem("todos"));
            console.log(todosList)
            setTodos([...todosList]);
        }
        else{
            console.log("Enters Else")
            localStorage.setItem("todos", JSON.stringify([]));
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

        }

    }

    function handleMarkAsComplete(e, createdOn){
        console.log(createdOn)
        let availableTodos = [...todos];
        availableTodos.forEach((todo) => {
            if(todo.createdOn === createdOn){
                todo.isCompleted = true;
            }
        })

        setTodos([...availableTodos]);
        localStorage.setItem("todos", JSON.stringify([...availableTodos]));
    }
    return (
        <div>
            <input onKeyUp={handleKeyUp} type='text' placeholder='Enter todo title' />

            <h3>Pending Todos</h3>
            <div id='newTodos'>
                {todos.map((todo) =>{
                    if(!todo.isCompleted){
                        return (
                            <div key={todo.createdOn}>
                                <div>
                                    <p>{todo.title}</p>
                                    <p>Status <b> Incomplete</b> </p>
                                </div>
                                <div>
                                    <button onClick={(e) => handleMarkAsComplete(e, todo.createdOn)}>Mark as Complete</button>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>


            <h3>Completed Todos</h3>
            <div id='completedTodos'>
                {todos.map((todo) =>{
                    if(todo.isCompleted){
                        return (
                            <div key={todo.createdOn}>
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
