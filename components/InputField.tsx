import React, { InputHTMLAttributes, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean
};

// '' => false
// 'error message stuff' => true

const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    textarea,
    size: _,
    ...props
}) => {
    const { control } = useFormContext();

    let C = <input placeholder={name} />
    if (textarea) {
        C = <textarea placeholder={name} />
    }

    return (
        <Controller
            as={C}
            control={control}
            name={name}
            {...props}
        />
    )
}

export default InputField;