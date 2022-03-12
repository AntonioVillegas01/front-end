import React from 'react';
import {Grid, IconButton, InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import validate from "../ui/validate";

const useStyles = makeStyles(theme => ({
    textField: {
        width: ({fullWidth, settings}) =>
            fullWidth ? undefined : settings ? "15rem" : "20rem",
        [theme.breakpoints.down("xs")]: {
            width: ({fullWidth}) => (fullWidth ? undefined : "15rem"),
        },
        [theme.breakpoints.up("xs")]: {
            width: ({xs}) => (xs ? "10rem" : undefined),
        },
    },
    input: {
        color: ({isWhite}) => (isWhite ? "#fff" : theme.palette.secondary.main),
        fontSize: ({xs}) => (xs ? "1.25rem" : undefined),
    },
}))

const Fields = ({fields, errors, setErrors, values, setValues}) => {

    const classes = useStyles()

    return (

        Object.keys(fields).map(field => {
                const validateHelper = event => {
                    const valid = validate({[field]: event.target.value})
                    setErrors({...errors, [field]: !valid[field]})
                }
                return !fields[field].hidden && (
                    <Grid item key={field}>
                        <TextField value={values[field]}
                                   type={fields[field].type}
                                   onChange={e => {
                                       if (errors[field]) {
                                           validateHelper(e)
                                       }
                                       setValues({
                                           ...values,
                                           [field]: e.target.value
                                       })
                                   }}
                                   onBlur={e => validateHelper(e)}
                                   error={errors[field]}
                                   helperText={errors[field] && fields[field].helperText}
                                   placeholder={fields[field].placeholder}
                                   classes={{root: classes.textField}}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position={"start"}>
                                               {fields[field].startAdornment}
                                           </InputAdornment>
                                       ),
                                       endAdornment: fields[field].endAdornment ? (
                                           <InputAdornment position={"end"}>
                                               {fields[field].endAdornment}
                                           </InputAdornment>
                                       ) : <></>,
                                       classes: {input: classes.input}
                                   }}
                        />
                    </Grid>
                )
            }
        )

    );
};

export default Fields;
