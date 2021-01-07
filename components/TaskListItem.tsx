import React, { useContext } from 'react'
import { Task, TasksDocument, TasksQuery, TasksQueryVariables, TaskStatus, useChangeStatusMutation } from '../generated/graphql';
import Link from 'next/link'
import { useDeleteTaskMutation } from '../generated/graphql';

import { TaskFilterContext } from '../pages/[status]'
interface TaskListItemProps {
    task: Task;

}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
    const { status } = useContext(TaskFilterContext)
    const [deleteTask, { loading, error }] = useDeleteTaskMutation({
        update: (cache, result) => {
            const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
                query: TasksDocument,
                variables: { status: status }
            });

            if (data) {
                cache.writeQuery<TasksQuery, TasksQueryVariables>({
                    query: TasksDocument,
                    variables: { status: status }
                    ,
                    data: {
                        tasks: data.tasks.filter(
                            ({ id }) => id !== result.data?.deleteTask?.id
                        )
                    }
                });
            }
        }
    });

    const handleDeleteClick = () => {
        deleteTask({ variables: { id: task.id } })
    }

    const [
        changeStatus,
        { loading: changingStatus, error: changeStatusError }
    ] = useChangeStatusMutation();

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus =
            task.status === TaskStatus.Active
                ? TaskStatus.Completed
                : TaskStatus.Active;
        changeStatus({ variables: { id: task.id, status: newStatus } });
    };


    if (error) {
        return <p>An error occured.</p>
    }
    return (
        <li className="task-list-item" key={task.id}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    onChange={handleChangeStatus}
                    checked={task.status === TaskStatus.Completed}
                    disabled={changingStatus}
                />
                <span className="checkbox-mark">&#10003;</span>
            </label>
            <Link href="/update/[id]" as={`/update/${task.id}`}>
                <a className="task-list-item-title">{task.title}</a>
            </Link>
            <button
                disabled={loading}
                onClick={(e) => handleDeleteClick(e)}
                className="task-list-item-delete"
            >
                &times;
          </button>
        </li>
    );

}

export default TaskListItem;