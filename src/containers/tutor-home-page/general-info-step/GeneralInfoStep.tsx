import React from 'react';
import { Container } from '@mui/material';
import ImageSection from './ImageSection';
import FormSection from './FormSection';

const GeneralInfoStep: React.FC<{ btnsBox: React.ReactNode }> = ({ btnsBox }) => {


    return (
        <Container>
            <div >
                <ImageSection />
            </div>
            <div>
                <FormSection btnsBox={btnsBox} />
                {btnsBox}
            </div>
        </Container>
    );
};

export default GeneralInfoStep;
