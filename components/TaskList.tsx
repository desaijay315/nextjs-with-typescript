import React from 'react'
import { Task } from '../generated/graphql';
import Link from 'next/link'
import TaskListItem from './TaskListItem';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => {
                return <TaskListItem key={task.id} task={task} />
            })}
        </ul>
    );
}

export default TaskList