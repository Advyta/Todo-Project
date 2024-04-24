import React, { useEffect, useState } from 'react'
import { Todo } from './TodoLayout';
import SingleTodo from './SingleTodo';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

interface props {
    todoList: Array<Todo>;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<props> = ({ todoList, setTodoList, }) => {
    const [filterTodos, setfilterTodos] = useState('All');
    const [filteredTodoList, setFilteredTodoList] = useState<Array<Todo>>(todoList);
    const [orderedTodoList, setOrderedTodoList] = useState<Array<Todo>>(todoList);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todoList');
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    }, [localStorage.getItem('todoList')])

    useEffect(() => {
        switch (filterTodos) {
            case 'Completed':
                setFilteredTodoList(orderedTodoList.filter((todo) => todo.isDone));
                break;
            case 'Active':
                setFilteredTodoList(orderedTodoList.filter((todo) => !todo.isDone));
                break;
            case 'All':
                setFilteredTodoList(orderedTodoList);
                break;
            case 'Clear_Completed':
                const updatedTodoList = orderedTodoList.filter((todo) => !todo.isDone);
                setOrderedTodoList(updatedTodoList);
                setFilteredTodoList(updatedTodoList);
                setTodoList(updatedTodoList)
                setfilterTodos('All');
                break;
            default:
                setFilteredTodoList(orderedTodoList);
                break;
        }
    }, [orderedTodoList, filterTodos]);

    useEffect(() => {
        setOrderedTodoList(todoList);
    }, [todoList]);    

    const TodosLeft = () => {
        let allTodos = todoList.length;
        let completedTodos: number
        completedTodos = todoList.filter((todo) => todo.isDone).length;
        return allTodos - completedTodos;
    }
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        const updatedList = Array.from(orderedTodoList);
        const [reorderedTodo] = updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, reorderedTodo);
        setOrderedTodoList(updatedList);
    }

    return (
        <div className='h-auto bg-[#fff] dark:bg-[#25273c] shadow-[0_9px_15px_-14px_rgba(0,0,0,0.5)] transition-all rounded-lg'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='TodoList'>
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {filteredTodoList.map((todo, index) => (
                                <SingleTodo todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList} index={index} />
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <div className='text-xs dark:text-[#777a92] text-[#777a92] relative md:flex md:justify-between md:shadow-[0_9px_15px_-14px_rgba(0,0,0,0.5)] rounded-lg transition-all'>
                <div className='text-sm dark:bg-[#25273c] bg-[#fff] flex justify-between items-center h-[52px] md:h-[69px] px-[19px] md:w-full rounded-lg transition-all'>
                    <div>
                        <span>{TodosLeft()} items left</span>
                    </div>
                    <ul className='dark:bg-[#25273c] bg-[#fff] flex justify-between gap-4 items-center md:mt-0 transition-all'>
                        <li>
                            <button className={`capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition ${filterTodos === 'All' ? 'text-[#3a7bfd]' : ''}`}
                                onClick={() => setfilterTodos('All')}>
                                All
                            </button>
                        </li>
                        <li>
                            <button className={`capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition ${filterTodos === 'Active' ? 'text-[#3a7bfd]' : ''}`}
                                onClick={() => setfilterTodos('Active')}>
                                Active
                            </button>
                        </li>
                        <li>
                            <button className={`capitalize dark:hover:text-[#fff] hover:text-[#393a4c] transition ${filterTodos === 'Completed' ? 'text-[#3a7bfd]' : ''}`}
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