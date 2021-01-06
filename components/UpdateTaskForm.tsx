import React from 'react'
import { useForm, FormProvider, Resolver } from 'react-hook-form'
import InputField from './InputField';


interface UpdateTaskFormProps {
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

interface Props {
    initialValues: FormValues
}


const UpdateTaskForm: React.FC<Props> = ({ initialValues }) => {
    const [values, setValues] = React.useState<IFormInputs>(initialValues)
    const methods = useForm<FormValues>({ resolver });

    const onSubmit = (data: IFormInputs) => {

        console.log(data)
        // createTask({
        //     variables: {
        //         input: {
        //             title: data.title
        //         }
        //     }
        // })
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
                    {/* {error && <p className="alert-error">An error occured.</p>} */}
                    <p>
                        <InputField
                            className="text-input"
                            autoComplete="off"
                            name='title'
                            label='Title'
                            defaultValue={values.title}
                            onChange={handleChange}
                        />
                        {methods.errors?.title && <p style={{ color: "tomato" }}>{methods.errors.title.message}</p>}
                    </p>
                    <p>
                        <button type="submit" className="button">Save</button>
                    </p>
                </form>
            </FormProvider>
        </>
    );
}

export default UpdateTaskForm;