import React from 'react'
import { useForm, FormProvider, Resolver } from 'react-hook-form'
import InputField from './InputField';
import { useUpdateTaskMutation } from '../generated/graphql';
import { useRouter } from 'next/router';

interface UpdateTaskFormProps {
}

type FormValues = {
    title: string
    id: number
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

interface Props {
    initialValues: FormValues
}


const UpdateTaskForm: React.FC<Props> = ({ initialValues }) => {
    const router = useRouter();
    const [values, setValues] = React.useState<IFormInputs>(initialValues)
    const methods = useForm<FormValues>({ resolver });

    const [updateTask, { loading, error }] = useUpdateTaskMutation();

    const onSubmit = (data: IFormInputs) => {
        updateTask({
            variables: {
                input: {
                    id: initialValues.id,
                    title: data.title
                }
            }
        })
        router.back();
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setValues(values => ({
            ...values,
            [name]: value
        }))
    }
    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {error && <p className="alert-error">An error occured.</p>}

                    <InputField
                        className="text-input"
                        autoComplete="off"
                        name='title'
                        label='Title'
                        defaultValue={values.title}
                        onChange={handleChange}
                    />
                    {methods.errors?.title && <p style={{ color: "tomato" }}>{methods.errors.title.message}</p>}

                    <p>
                        <button disabled={loading} type="submit" className="button">{loading ? 'Loading...' : 'Save'}</button>
                    </p>
                </form>
            </FormProvider>
        </>
    );
}

export default UpdateTaskForm;