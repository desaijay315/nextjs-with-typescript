import React from 'react'
import { Task } from '../generated/graphql';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => {
                return <li className="task-list-item" key={task.id}>
                    {task.title}
                </li>
            })}
        </ul>
    );
}

export default TaskList