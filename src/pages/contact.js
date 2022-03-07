import React, {useState} from 'react';
import {Grid, InputAdornment, makeStyles, useTheme, TextField, Typography, useMediaQuery} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import Layout from "../components/ui/layout";
import validate from "../components/ui/validate";

import address from '../images/address.svg'
import send from '../images/send.svg'
import EmailAdornment from "../images/EmailAdornment";
import nameAdorment from '../images/name-adornment.svg'
import PhoneAdornment from "../images/phone-adornment";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        height: "45rem",
        backgroundColor: theme.palette.primary.main,
        marginBottom: "10rem",
        [theme.breakpoints.down("md")]: {
            marginTop: "8rem",
            height: "90rem",
        },
    },
    formContainer: {
        height: "100%",
    },
    formWrapper: {
        height: "100%",
        [theme.breakpoints.down("md")]: {
            height: "50%",
            marginTop: "-8rem",
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    blockContainer: {
        backgroundColor: theme.palette.secondary.main,
        height: "8rem",
        width: "40rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            width: "30rem",
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    titleContainer: {
        marginTop: "-4rem",
    },
    buttonContainer: {
        marginBottom: "-4rem",
        textTransform: "none",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    sendIcon: {
        marginLeft: "2rem",
    },
    contactInfo: {
        fontSize: "1.5rem",
        marginLeft: "1rem",
    },
    contactIcon: {
        height: "3rem",
        width: "3rem",
    },
    contactEmailIcon: {
        height: "2.25rem",
        width: "3rem",
    },
    infoContainer: {
        height: "21.25rem",
        [theme.breakpoints.down("xs")]: {
            height: "15.25rem",
        },
    },
    middleInfo: {
        borderTop: "2px solid #fff",
        borderBottom: "2px solid #fff",
    },
    iconContainer: {
        borderRight: "2px solid #fff",
        height: "7rem",
        width: "8rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("xs")]: {
            height: "5rem",
            width: "6rem",
        },
    },
    textField: {
        width: "30rem",
        [theme.breakpoints.down("sm")]: {
            width: "20rem",
        },
    },
    input: {
        color: "#fff",
    },
    fieldContainer: {
        marginBottom: "1rem",
    },
    multilineContainer: {
        marginTop: "1rem",
    },
    emailAdornment: {
        height: 17,
        width: 22,
        marginBottom: 10,
    },
    phoneAdornment: {
        width: 25.173,
        height: 25.122,
    },
    multiline: {
        border: "2px solid #fff",
        borderRadius: 10,
        padding: "1rem",
    },
    multilineError: {
        border: `2px solid ${theme.palette.error.main}`,
    },
    buttonDisabled: {
        backgroundColor: theme.palette.grey[500],
    },
    sendMessage: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "2.5rem",
        },
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #fff",
        },
        ".MuiInput-underline:after": {
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
    },
}))
const ContactPage = () => {

    const classes = useStyles()
    const theme = useTheme()

    const matchesMd = useMediaQuery(theme => theme.breakpoints.down('md'))
    const matchesXs = useMediaQuery(theme => theme.breakpoints.down('xs'))


    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const fields = {
        name: {
            helperText: 'You must enter a name',
            placeholder: 'Name',
            adornment: (<img src={nameAdorment} alt="name"/>)
        },
        email: {
            helperText: 'Invalid email',
            placeholder: 'Email',
            adornment:
                (<div className={classes.emailAdornment}>
                    <EmailAdornment color={theme.palette.secondary.main}/>
                </div>)

        },
        phone: {
            helperText: 'Invalid Phone',
            placeholder: 'Phone',
            adornment:
                (<div className={classes.phoneAdornment}>
                    <PhoneAdornment color={theme.palette.secondary.main}/>
                </div>)
        },
        message: {
            helperText: 'You must enter a message ',
            placeholder: 'Message',
            adornment: null,
            inputClasses: {
                multiline: classes.multiline,
                error: classes.multilineError
            }
        }
    }

    const info = [
        {
            label: (
                <>
                    1234 S Example St {matchesXs && <br/>} Wichita, Ks 67111
                </>
            ),
            icon: (
                <img src={address}
                     alt="address"
                     className={classes.contactIcon}
                />
            )
        },
        {
            label: (
                <>
                    (555) 555 555 5555
                </>
            ),
            icon: (
                <div className={classes.contactIcon}>
                    <PhoneAdornment/>
                </div>
            )
        },
        {
            label: (
                <>
                    antonio_villegas@hotmail.com
                </>
            ),
            icon: (
                <div className={classes.contactEmailIcon}>
                    <EmailAdornment color={'white'}/>
                </div>
            )
        },
    ]


    const disabled = Object.keys(errors).some((error) => errors[error] === true)
        || Object.keys(errors).length !== 4

    return (
        <Layout>
            <Grid container
                  justifyContent={'space-around'}
                  alignItems={'center'}
                  classes={{root: classes.mainContainer}}
                  direction={matchesMd ? 'column' : 'row'}
            >
                {/*Contact form title*/}
                <Grid item classes={{root: classes.formWrapper}}>
                    <Grid container classes={{root: classes.formContainer}}
                          direction={'column'}
                          alignItems={'center'}
                          justifyContent={'space-between'}>
                        <Grid item classes={{root: clsx(classes.titleContainer, classes.blockContainer)}}>
                            <Typography variant={'h4'}>
                                Contact Us
                            </Typography>
                        </Grid>


                        {/*Contact Form*/}
                        <Grid item container direction={'column'}>

                            {
                                Object.keys(fields).map((field, i) => {

                                    const validateHelper = (e) => {
                                        const valid = validate({[field]: e.target.value})
                                        setErrors({...errors, [field]: !valid[field]})
                                    }

                                    return (

                                        <Grid item
                                              key={`${field}-${i}`}
                                              classes={{
                                                  root: field === 'message'
                                                      ? classes.multilineContainer
                                                      : classes.fieldContainer
                                              }}>
                                            <TextField classes={{root: classes.textField}}
                                                       placeholder={fields[field].placeholder}
                                                       value={values[field]}
                                                       multiline={field === 'message'}
                                                       rows={field === 'message' ? 8 : undefined}
                                                       InputProps={
                                                           {
                                                               classes: {
                                                                   input: classes.input,
                                                                   ...fields[field].inputClasses
                                                               },
                                                               disableUnderline: field === 'message',
                                                               startAdornment: (
                                                                   <InputAdornment position={'start'}>
                                                                       {
                                                                           fields[field].adornment
                                                                           || <></>
                                                                       }
                                                                   </InputAdornment>
                                                               )

                                                           }}
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
                                            />
                                        </Grid>
                                    )
                                })
                            }


                        </Grid>


                        {/*Send Button*/}
                        <Grid item
                              component={Button}
                              disabled={disabled}
                              classes={{
                                  root: clsx(classes.buttonContainer, classes.blockContainer, {
                                      [classes.buttonDisabled]: disabled,
                                  })
                              }}>
                            <Grid item>
                                <Typography variant={'h4'} classes={{root: classes.sendMessage}}>
                                    Send Message
                                </Typography>
                            </Grid>
                            <Grid item>
                                <img className={classes.sendIcon} src={send} alt="send message"/>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                {/*Contact info*/}
                <Grid item>
                    <Grid container
                          direction={'column'}
                          justifyContent={'space-between'}
                          classes={{root: classes.infoContainer}}
                    >
                        {
                            info.map((section, i) => (
                                <Grid item
                                      key={i}
                                      container
                                      alignItems={'center'}
                                      classes={{root: i === 1 ? classes.middleInfo : undefined}}
                                >
                                    <Grid item classes={{root: classes.iconContainer}}>
                                        {section.icon}
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'h2'}
                                                    classes={{root: classes.contactInfo}}
                                        >
                                            {section.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }


                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default ContactPage;

//
//
// <Grid item classes={{root: classes.fieldContainer}}>
//     <TextField classes={{root: classes.textField}}
//                placeholder={'Email'}
//                value={email}
//                InputProps={{
//                    classes: {input: classes.input},
//                    startAdornment: (
//                        <InputAdornment position={'start'}>
//                            <div className={classes.emailAdornment}>
//
//                            </div>
//                        </InputAdornment>
//                    )
//                }}
//                onChange={e => {
//                    if (errors.email) {
//                        const valid = validate({email: e.target.value})
//                        setErrors({...errors, email: !valid.email})
//                    }
//                    setEmail(e.target.value)
//                }}
//                onBlur={e => {
//                    const valid = validate({email})
//                    setErrors({...errors, email: !valid.email})
//                }}
//                error={errors.email}
//                helperText={errors.email && 'you must enter a email'}
//     />
// </Grid>
// <Grid item classes={{root: classes.fieldContainer}}>
//     <TextField classes={{root: classes.textField}}
//                placeholder={'Phone number'}
//                value={phone}
//                InputProps={{
//                    classes: {input: classes.input},
//                    startAdornment: (
//                        <InputAdornment position={'start'}>
//
//                        </InputAdornment>
//                    )
//                }}
//                onChange={e => {
//                    if (errors.phone) {
//                        const valid = validate({phone: e.target.value})
//                        setErrors({...errors, phone: !valid.phone})
//                    }
//                    setPhone(e.target.value)
//                }}
//                onBlur={e => {
//                    const valid = validate({phone})
//                    setErrors({...errors, phone: !valid.phone})
//                }}
//                error={errors.phone}
//                helperText={errors.phone && 'you must enter valid phone'}
//     />
// </Grid>
// <Grid item classes={{root: classes.multilineContainer}}>
//     <TextField classes={{root: classes.textField}}
//                placeholder={'Message'}
//                multiline
//                InputProps={{
//                    disableUnderline: true,
//                    classes: {
//                        input: classes.input,
//
//                    }
//                }}
//                rows={8}
//                value={message}
//                onChange={e => {
//                    if (errors.message) {
//                        const valid = validate({message})
//                        setErrors({...errors, message: !valid.message})
//                    }
//                    setMessage(e.target.value)
//                }}
//                onBlur={e => {
//                    const valid = validate({message})
//                    setErrors({...errors, message: !valid.message})
//                }}
//                error={errors.message}
//                helperText={errors.message && 'you must enter valid message'}
//     />
// </Grid>