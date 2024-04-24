import React, { useState } from 'react'
import InputTodo from './InputTodo'
import TodoList from './TodoList'

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

const TodoLayout: React.FC = () => {
    const [todoList, setTodoList] = useState<Array<Todo>>([])

    return (
        <main>
            <div className='pb-5'>
                <InputTodo todoList={todoList} setTodoList={setTodoList} />
            </div>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
            <div className="text-xs md:text-base mt-10 text-center text-[#4d5066]">
               Drag and drop to reorder list
            </div>
        </main>
    )
}

export default TodoLayout