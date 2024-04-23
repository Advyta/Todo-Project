import React, { useEffect, useState } from 'react'
import { Todo } from './TodoLayout';
import SingleTodo from './SingleTodo';

interface props {
    todoList: Array<Todo>;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<props> = ({ todoList, setTodoList, }) => {
    const [filterTodos, setfilterTodos] = useState('All');
    const [filteredTodoList, setFilteredTodoList] = useState<Array<Todo>>(todoList);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todoList');
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    }, [localStorage.getItem('todoList')]) 

    useEffect(() => {
        switch (filterTodos) {
            case 'Completed':
                setFilteredTodoList(todoList.filter((todo) => todo.isDone));
                break;
            case 'Active':
                setFilteredTodoList(todoList.filter((todo) => !todo.isDone));
                break;
            case 'All':
                setFilteredTodoList(todoList);
                break;
            case 'Clear_Completed':
                const updatedTodoList = todoList.filter((todo) => !todo.isDone);
                setTodoList(updatedTodoList);
                setFilteredTodoList(todoList);
                setfilterTodos('All');
                break;
            default:
                setFilteredTodoList(todoList);
                break;
        }
    }, [todoList, filterTodos]);

    const TodosLeft = () => {
        let allTodos = todoList.length;
        let completedTodos: number
        completedTodos = todoList.filter((todo) => todo.isDone).length;
        return allTodos - completedTodos;
    }

    return (
        <div className='h-auto bg-[#fff] dark:bg-[#25273c] shadow-[0_9px_15px_-14px_rgba(0,0,0,0.5)] transition-all rounded-lg'>
            <ul>
                {filteredTodoList.map((todo, index) => (
                    <SingleTodo todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList} index={index} />
                ))}
            </ul>
            <div className='text-xs dark:text-[#777a92] text-[#777a92] relative md:flex md:justify-between md:shadow-[0_9px_15px_-14px_rgba(0,0,0,0.5)] rounded-lg transition-all'>
                <div className='text-sm dark:bg-[#25273c] bg-[#fff] flex justify-between items-center h-[52px] md:h-[69px] px-[19px] md:w-full rounded-lg transition-all'>
                    <div>
                        <span>{TodosLeft()} items left</span>
                    </div>
                    <ul className='dark:bg-[#25273c] bg-[#fff] flex justify-between gap-4 items-center md:mt-0 transition-all'>
                        <li>
                            <button className='capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition'
                                onClick={() => setfilterTodos('All')}>
                                All
                            </button>
                        </li>
                        <li>
                            <button className='capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition'
                                onClick={() => setfilterTodos('Active')}>
                                Active
                            </button>
                        </li>
                        <li>
                            <button className='capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition'
                                onClick={() => { setfilterTodos('Completed') }}>
                                Completed
                            </button>
                        </li>
                    </ul>
                    <button className='dark:hover:text-[#fff] hover:text-[#393a4c]'
                    onClick={() => setfilterTodos('Clear_Completed')}>
                        Clear Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList