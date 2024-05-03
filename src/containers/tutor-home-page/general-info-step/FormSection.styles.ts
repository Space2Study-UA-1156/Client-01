import { Theme, makeStyles } from '@mui/material/styles';

export const useFormSectionStyles = makeStyles((theme: Theme) => ({
    formContainer: {
        width: '100%',
        maxWidth: '435px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2)
    }
}));
