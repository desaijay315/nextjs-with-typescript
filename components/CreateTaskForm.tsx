import React from 'react'
import { useForm, FormProvider, Resolver } from 'react-hook-form'
import InputField from './InputField';

interface CreateTaskFormProps {
}

type FormValues = {
    title: string
}

interface IFormInputs {
    title: string
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


const CreateTaskForm: React.FC<CreateTaskFormProps> = () => {

    const [title, setTitle] = React.useState('')
    const methods = useForm<FormValues>({ resolver });

    const onSubmit = (data: IFormInputs) => {
        alert(JSON.stringify(data.title))
    };


    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputField
                        className="text-input new-task-text-input"
                        autoComplete="off"
                        name='title'
                        placeholder="What would you like to get done?"
                        label='Title'
                        defaultValue=""
                    />
                    {methods.errors?.title && <p style={{ color: "tomato" }}>{methods.errors.title.message}</p>}
                </form>
            </FormProvider>
        </>
    );
}

export default CreateTaskForm