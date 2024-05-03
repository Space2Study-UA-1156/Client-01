import React from 'react';
import { useTranslation } from 'react-i18next';
import AppTextField from '~/components/app-text-field/AppTextField';
import SelectGroup from "~/containers/tutor-home-page/general-info-step/SelectGroup";
import {useTextFieldGroupStyles} from "~/containers/tutor-home-page/general-info-step/TextFieldGroup.styles";


interface TextFieldGroupProps {
    messageLength: number;
    onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    message: string;
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({ messageLength, onMessageChange, message }) => {
    const classes = useTextFieldGroupStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.inputRow}>
                <AppTextField
                    className={classes.halfWidthInput}
                    label={t('common.labels.firstName')}
                    name='firstName'
                    required
                    variant='outlined' errorMsg={undefined} multiline={undefined}                />
                <AppTextField
                    className={classes.halfWidthInput}
                    label={t('common.labels.lastName')}
                    name='lastName'
                    required
                    variant='outlined' errorMsg={undefined} multiline={undefined}                />
            </div>
            <SelectGroup />
            <AppTextField
                className={classes.fullWidthInput}
                helperText={`${messageLength}/100`}
                label='Describe in short your professional status'
                multiline
                onChange={onMessageChange}
                rows={5}
                value={message}
                variant='outlined' errorMsg={undefined}            />
        </>
    );
};

export default TextFieldGroup;
