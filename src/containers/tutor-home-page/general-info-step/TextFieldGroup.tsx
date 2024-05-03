import React from 'react';
import { useTranslation } from 'react-i18next';
import AppTextField from '~/components/app-text-field/AppTextField';
import SelectGroup from "./SelectGroup";

interface TextFieldGroupProps {
    messageLength: number;
    onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    message: string;
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({ messageLength, onMessageChange, message }) => {
    const { t } = useTranslation();

    return (
        <>
            <div >
                <AppTextField
                    label={t('common.labels.firstName') as unknown as string}
                    name='firstName'
                    required
                    variant='outlined' errorMsg={undefined} multiline={undefined}                />
                <AppTextField
                    label={t('common.labels.lastName') as unknown as string}
                    name='lastName'
                    required
                    variant='outlined' errorMsg={undefined} multiline={undefined}                />
            </div>
            <SelectGroup />
            <AppTextField
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
