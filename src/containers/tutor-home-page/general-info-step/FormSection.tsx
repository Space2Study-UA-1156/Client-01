import React, { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useFormSectionStyles } from './FormSection.styles';
import TextFieldGroup from './TextFieldGroup';
import SelectGroup from './SelectGroup';

interface FormSectionProps {
    btnsBox: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {
    const classes = useFormSectionStyles();
    const [message, setMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value.slice(0, 100));
    };

    return (
        <form onSubmit={(event) => event.preventDefault()} className={classes.formContainer}>
            <Typography gutterBottom variant='body1'>
                Amet minim mollit non deserunt sit aliqua dolor do amet sint.
            </Typography>
            <TextFieldGroup messageLength={message.length} onMessageChange={handleInputChange} message={message} />
        </form>
    );
};

export default FormSection;
