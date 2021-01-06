import React from 'react'
import { useForm, FormProvider, Resolver } from 'react-hook-form'
import { useCreateTaskMutation } from '../generated/graphql';
import InputField from './InputField';

interface CreateTaskFormProps {
}

type FormValues = {
    title: string
}

interface IFormInputs {
    title: string
}

interface Props {
    onTaskCreated: () => void;
}

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.title ? values : {},
        errors: !values.title
            ? {
                title: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};


const CreateTaskForm: React.FC<Props> = ({ onTaskCreated }) => {
    const [title, setTitle] = React.useState('')
    const [createTask, { loading, error }] = useCreateTaskMutation({
        onCompleted: () => {
            onTaskCreated();
            setTitle('')
        }
    })
    const methods = useForm<FormValues>({ resolver });

    const onSubmit = (data: IFormInputs) => {
        if (!loading && data.title) {
            createTask({
                variables: {
                    input: {
                        title: data.title
                    }
                }
            })
        }
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }


    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {error && <p className="alert-error">An error occured.</p>}
                    <InputField
                        className="text-input new-task-text-input"
                        autoComplete="off"
                        name='title'
                        placeholder="What would you like to get done?"
                        label='Title'
                        defaultValue=""
                        onChange={handleChange}
                    />
                    {methods.errors?.title && <p style={{ color: "tomato" }}>{methods.errors.title.message}</p>}
                </form>
            </FormProvider>
        </>
    );
}

export default CreateTaskForm