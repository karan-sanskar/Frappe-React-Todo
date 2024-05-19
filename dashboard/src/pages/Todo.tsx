import React from 'react'
import CreateTodo from '../components/CreateTodo'
import TodoList from '../components/TodoList'


const Todo = () => {

    return (
        <>
        <section className='container-main mt-10'>
            <div className="todo-head">
                <h1 className="heading text-4xl font-bold mb-4">
                    ToDo
                </h1>
            </div>
            <CreateTodo />
            <TodoList />
        </section>
        </>
    )
}

export default Todo