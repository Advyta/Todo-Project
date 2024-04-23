import React, { useEffect, useState } from 'react'
import { Todo } from './TodoLayout'

interface props {
    todoList: Array<Todo>;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>> 
}

const InputTodo: React.FC<props> = ({todoList, setTodoList}) => {
    const [input, setInput] = useState<string>('')
    const addTodo = () => {
        if(input) {
            setTodoList([...todoList, {id: Date.now(), todo: input, isDone: false}]);
            setInput('');
        }
    }
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList])

    return (
        <div className='relative items-center w-full h-[47px] md:h-[64px]'>
            <button
                type="submit"
                aria-label="submit todo items"
                className="absolute top-[12px] md:top-[21px] left-[22px] border border-solid dark:border-[#3e3f4b] border-[#d2d3db] h-[22px] w-[22px] rounded-full"
            ></button>
            <label className="sr-only" htmlFor="todos">
                Create a new todo
            </label>
            <input type="text"
                className="pl-[52px] w-full h-full dark:bg-[#25273c] bg-[#fff] dark:text-[#cacde8] text-[#484b6a] text-xs md:text-base rounded-lg transition-all"
                placeholder="Create a new todo..."
                aria-label="Create a new todo"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        addTodo();
                    }
                }}
            />
        </div>
    )
}

export default InputTodo
