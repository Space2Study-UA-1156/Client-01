import React from 'react';
import { Container } from '@mui/material';
import { useGeneralInfoStepStyles } from './GeneralInfoStep.styles';
import ImageSection from './ImageSection';
import FormSection from './FormSection';

const GeneralInfoStep: React.FC<{ btnsBox: React.ReactNode }> = ({ btnsBox }) => {
    const classes = useGeneralInfoStepStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.imageSection}>
                <ImageSection />
            </div>
            <div className={classes.formSection}>
                <FormSection btnsBox={btnsBox} />
                {btnsBox}
            </div>
        </Container>
    );
};

export default GeneralInfoStep;
