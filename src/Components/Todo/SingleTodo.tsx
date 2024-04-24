import React from 'react';
import { Todo } from './TodoLayout';
import cross from '../../assets/images/icon-cross.svg';
import check from "../../assets/images/icon-check.svg";
import { Draggable } from 'react-beautiful-dnd';

interface props {
    todo: Todo;
    index: number;
    todoList: Array<Todo>;
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<props> = ({ todo, index, todoList, setTodoList }) => {

    const deleteTodo = (id: number) => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    }

    const updateCompletionStatus = (id: number) => {
        return (event: React.MouseEvent) => {
            event.preventDefault();
            const updatedTodoList = todoList.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            );
            setTodoList(updatedTodoList);
            localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
        }
    }
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                    className={`${snapshot.isDragging ? 'bg-gray-700' : ''}${todo.isDone ? 'line-through-light dark:line-through-dark' : ''} group flex items-center justify-between w-full h-[52px] md:h-[69px] px-[19px] cursor-grab text-[#484b6a] dark:text-[#cacde8] border-b border-solid border-[#d2d3db] dark:border-[#393a4c] transition-all`}>
                    <div className='flex items-center'>
                        {/* click here to mark todo as complete */}
                        <div className='flex items-center justify-center rounded-full h-[22px] w-[22px] border border-solid border-[#393a4c] dark:border-[#d2d3db] group-hover:bg-gradient-to-r from-[#57ddff] to-[#c058f3] group-hover:border-transparent transition-all cursor-pointer'
                            onClick={updateCompletionStatus(todo.id)}>
                            <div className='inline-block rounded-full h-[19px] w-[19px] bg-center bg-no-repeat dark:bg-[#25273c] bg-[#fff] transition-all'
                                style={{
                                    backgroundImage: `${todo.isDone ? `url(${check}), linear-gradient(135deg,#57ddff,#c058f3)` : ''}`
                                }}>
                            </div>
                        </div>
                        {/* todo */}
                        <div className={`${todo.isDone ? 'dark:text-[#4d5066] text-[#d2d3db]' : ''} ps-2 pl-3 text-[13px] md:text-[19px]`}>
                            {todo.todo}
                        </div>
                    </div>
                    <div>
                        <button >
                            <img
                                src={cross}
                                className='h-[18px] w-[18px] transition'
                                alt="theme-icon"
                                onClick={() => deleteTodo(todo.id)}
                            />
                        </button>

                    </div>
                </li>
            )}
        </Draggable>

    )
}

export default SingleTodo