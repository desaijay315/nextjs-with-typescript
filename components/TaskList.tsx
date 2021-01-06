import React from 'react'
import { Task } from '../generated/graphql';
import Link from 'next/link'

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <ul className="task-list">
            {tasks.map(task => {
                return <li className="task-list-item" key={task.id}>
                    <Link href="/update/[id]" as={`/update/${task.id}`}><a>{task.title}</a></Link>
                </li>
            })}
        </ul>
    );
}

export default TaskList