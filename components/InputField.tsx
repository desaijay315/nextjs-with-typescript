import React, { InputHTMLAttributes, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form';

const ParseFormatTextarea = ({ value = [], onChange }) => {
    const [text, setText] = React.useState(value);

    const handleChange = (e: any) => {
        const value = e.target.value.split('\n');

        setText(e.target.value);
        onChange(value);
    };

    return <textarea onChange={handleChange} value={text} />;
};


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
        C = ParseFormatTextarea
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