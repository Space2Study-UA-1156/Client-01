import { Theme, makeStyles } from '@mui/material/styles';

export const useTextFieldGroupStyles = makeStyles((theme:Theme) => ({
    inputRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    halfWidthInput: {
        width: 'calc(50% - 8px)',
        margin: theme.spacing(1)
    },
    fullWidthInput: {
        width: '100%',
        margin: theme.spacing(1, 0)
    }
}));
