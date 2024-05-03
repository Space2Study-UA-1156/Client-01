import React, { useState } from 'react';
import { Typography } from '@mui/material';

import TextFieldGroup from './TextFieldGroup';


interface FormSectionProps {
    btnsBox: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {

    const [message, setMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value.slice(0, 100));
    };

    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <Typography gutterBottom variant='body1'>
                Amet minim mollit non deserunt sit aliqua dolor do amet sint.
            </Typography>
            <TextFieldGroup messageLength={message.length} onMessageChange={handleInputChange} message={message} />
        </form>
    );
};

export default FormSection;
