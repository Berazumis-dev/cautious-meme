import { useEffect, useState } from 'react';
import './App.css';

interface Todo {
    id: number;
    task: string;
    isCompleted: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    useEffect(() => {
        setTodos([
            { id: 1, task: "Complete homework", isCompleted: false },
            { id: 2, task: "Read a book", isCompleted: false }
        ]);
    }, []);

    const handleToggleComplete = (id: number) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleAddTask = () => {
        const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        const newTodo = { id: newId, task: newTask, isCompleted: false };
        setTodos([...todos, newTodo]);
        setNewTask("");
    };

    const handleDeleteTask = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1 id="todoLabel">To-Do List</h1>
            <p>Manage your tasks efficiently.</p>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <table className="table table-striped" aria-labelledby="todoLabel">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.task}</td>
                            <td>{todo.isCompleted ? "Completed" : "Pending"}</td>
                            <td>
                                <button onClick={() => handleToggleComplete(todo.id)}>
                                    {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
                                </button>
                                {" "}
                                <button onClick={() => handleDeleteTask(todo.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
