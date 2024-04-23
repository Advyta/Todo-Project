export const initialState = [
    {
       id: '',
       todo: '',
       completed: false,
    },
 ];

 export interface NewTodosState {
    id: number;
    todo: string;
    completed: boolean;
 }

export interface TodoListRender {
    id: number;
    todo: string;
    completed: boolean;
    updateTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};

export const getData = () => JSON.parse(localStorage.getItem('todos') || '');
export const setData = (key: string, value: any[]) => localStorage.setItem(key, JSON.stringify(value));