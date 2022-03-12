import React from "react";
import {IconButton, makeStyles} from "@material-ui/core";


import EmailAdornment from "../images/EmailAdornment";
import passwordAdornment from "../images/password-adornment.svg";
import showPasswordIcon from "../images/show-password.svg";
import hidePasswordIcon from "../images/hide-password.svg";


const useStyles = makeStyles(theme => ({
    emailAdornment: {
        height: 17,
        width: 17
    }, passwordAdornment: {
        height: 17,
        width: 17
    }
}))


export const getEmailAndPassword = (classes, hideEmail, hidePassword, visible, setVisible) => {

    return {
        email: {
            helperText: 'invalid email',
            placeholder: 'Email',
            visible: 'text',
            hidden: hideEmail,
            startAdornment: (
                <span className={classes.emailAdornment}>
                                           <EmailAdornment/>
                                       </span>
            ),
        },
        password: {
            helperText: 'you password be at least 8 letters & include one uppercase letter, one number, and one special character',
            placeholder: 'Password',
            type: visible ? 'text' : 'password',
            hidden: hidePassword,
            startAdornment: (
                <span className={classes.passwordAdornment}>
                                           <img src={passwordAdornment} alt="password"/>
                                       </span>
            ),
            endAdornment: (
                <IconButton onClick={() => setVisible(!visible)}>
                    <img src={visible ? showPasswordIcon : hidePasswordIcon}
                         alt={`${visible ? 'Show' : 'Hide'} Password`}
                    />
                </IconButton>

            )
        }
    }
}