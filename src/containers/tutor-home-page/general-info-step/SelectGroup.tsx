import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelectGroupStyles } from './SelectGroup.styles';


const SelectGroup: React.FC = () => {
    const { t } = useTranslation();
    const classes = useSelectGroupStyles();
    return (
        <div >
            <FormControl>
                <InputLabel>{t('common.labels.country')}</InputLabel>
                <Select label={t('labels.country')}>
                    <MenuItem value="Ukraine">Ukraine</MenuItem>
                    <MenuItem value="Deutschland">Deutschland</MenuItem>
                    <MenuItem value="Lithuania">Lithuania</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>{t('common.labels.city')}</InputLabel>
                <Select label={t('labels.city')}>
                    <MenuItem value="Kyiv">Kyiv</MenuItem>
                    <MenuItem value="Berlin">Berlin</MenuItem>
                    <MenuItem value="Vilnius">Vilnius</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectGroup;
