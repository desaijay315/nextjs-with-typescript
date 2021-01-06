import React from 'react'
import { useRouter } from 'next/router';
import { NextPage } from "next"
import { withApollo } from '../../lib/apollo';
import { useGetIntId } from '../../lib/useGetIntId';
import { useTaskQuery, useUpdateTaskMutation } from '../../generated/graphql';
import UpdateTaskForm from '../../components/UpdateTaskForm';


const EditTask: NextPage = () => {
    const router = useRouter();
    const intId = useGetIntId();
    const { data, loading, error } = useTaskQuery({
        skip: intId === -1,
        variables: {
            id: intId
        }
    })

    const [updateTask] = useUpdateTaskMutation();

    if (loading) {
        return (
            <div>
                loading....
            </div>
        )
    } else if (error) {
        return (
            <div>
                some error occured
            </div>
        )
    }

    if (!data?.task) {
        return (
            <div>Could not find task</div>
        )
    }

    return (
        <>{data ? <UpdateTaskForm initialValues={{ title: data.task.title }} /> : <p>Task not found</p>}</>
    )
}


export default withApollo({ ssr: false })(EditTask);