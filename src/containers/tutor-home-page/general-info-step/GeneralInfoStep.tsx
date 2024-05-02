import Box from '@mui/material/Box'
import './GeneralInfoStep.styles'
import generalInfoStepImage from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import React, {useState} from 'react'
import {
    Grid,
    Paper,
    Container,
    TextField,
    FormControl,
    InputLabel,
    Select
} from '@mui/material'
import useStyles from './GeneralInfoStep.styles'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

interface StepButtonProps {
    label: string
    onClick: () => void
    disabled?: boolean
}

interface ButtonBoxProps {
    btnsBox: StepButtonProps[];
}
const GeneralInfoStep: React.FC<ButtonBoxProps> = ({btnsBox}) => {
    const [message, setMessage] = useState('')
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value.slice(0, 100));
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Grid className={classes.imageItem} item md={6} xs={12}>
                <Box
                    alt='general-info-step'
                    component='img'
                    src={generalInfoStepImage}
                />
            </Grid>
            <Grid>
                <Paper className={classes.formContainer}>
                    <form onSubmit={handleFormSubmit}>
                        <div className={classes.row}>
                            <Typography gutterBottom variant='body1'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                                amet sint.
                            </Typography>
                        </div>
                        <div className={classes.row}>
                            <TextField
                                label='First name'
                                name='firstName'
                                required
                                variant='outlined'
                            />
                            <TextField
                                label='Last name'
                                name='lastName'
                                required
                                variant='outlined'
                            />
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.fullWidthInput}>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    className={classes.halfWidthInput} label='Country'>
                                    <MenuItem value='Ukraine'>Ukraine</MenuItem>
                                    <MenuItem value='Deutschland'>Deutschland</MenuItem>
                                    <MenuItem value='Lithuania'>Lithuania</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.fullWidthInput}>
                                <InputLabel>City</InputLabel>
                                <Select
                                    className={classes.halfWidthInput} label='City'>
                                    <MenuItem value='Kyiv'>Kyiv</MenuItem>
                                    <MenuItem value='Berlin'>Berlin</MenuItem>
                                    <MenuItem value='Vilnius'>Vilnius</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            className={classes.fullWidthInput}
                            label='Describe in short your professional status'
                            multiline
                            rows='5'
                            value={message}
                            variant='outlined'
                            onChange={handleInputChange}
                            helperText={`${message.length}/100`}
                        />
                    </form>
                </Paper>
                {btnsBox}
            </Grid>

        </Container>
    )
}

export default GeneralInfoStep
