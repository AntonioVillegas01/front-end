import React, {useState} from 'react';
import {Grid, makeStyles, Typography, Button, ButtonGroup, Badge} from "@material-ui/core";
import clsx from "clsx";
import Cart from "../../images/Cart";

const useStyles = makeStyles(theme => ({
    qtyText: {
        color: ({white}) => (white ? theme.palette.secondary.main : "#fff"),
    },
    mainGroup: {
        height: "3rem",
        marginTop: '2.5rem'
    },
    editButtons: {
        height: "1.525rem",
        backgroundColor: ({white}) =>
            white ? "#fff" : theme.palette.secondary.main,
        borderLeft: ({white}) =>
            `2px solid ${white ? theme.palette.secondary.main : "#fff"}`,
        borderRight: ({round}) => (round ? 0 : "2px solid #fff"),
        borderBottom: "none",
        borderTop: "none",
        borderRadius: ({round}) => (round ? "0px 50px 50px 0px" : 0),
        "&:hover": {
            backgroundColor: ({white}) =>
                white ? "#fff" : theme.palette.secondary.light,
        },
    },
    endButtons: {
        backgroundColor: ({white}) =>
            white ? "#fff" : theme.palette.secondary.main,
        borderRadius: 50,
        border: "none",
    },
    cartButton: {
        marginLeft: "0 !important",
        transition: "background-color 1s ease",
    },
    minus: {
        marginTop: "-0.25rem",
    },
    minusButton: {
        borderTop: ({white}) =>
            `2px solid ${white ? theme.palette.secondary.main : "#fff"}`,
    },
    qtyButton: {
        "&:hover": {
            backgroundColor: ({white}) =>
                white ? "#fff" : theme.palette.secondary.main,
        },
    },
    badge: {
        color: "#fff",
        fontSize: "1.5rem",
        backgroundColor: theme.palette.secondary.main,
        padding: 0,
    },
    success: {
        backgroundColor: theme.palette.success.main,
        "&:hover": {
            backgroundColor: theme.palette.success.main,
        },
    },
}))

const QtyButton = () => {

    const classes = useStyles()

    const [qty, setQty] = useState(1);

    return (
        <Grid item>
            <ButtonGroup classes={{root: classes.mainGroup}}>
                <Button classes={{root: clsx(classes.endButtons, classes.qtyButton)}}>
                    <Typography variant={'h3'} classes={{root: classes.qtyText}}>
                        {qty}
                    </Typography>
                </Button>
                <ButtonGroup orientation={'vertical'}>
                    <Button onClick={() => setQty(qty + 1)}
                            classes={{root: classes.editButtons}}>
                        <Typography variant={'h3'} classes={{root: classes.qtyText}}>
                            +
                        </Typography>
                    </Button>
                    <Button onClick={() => setQty(qty - 1)}
                            classes={{root: clsx(classes.editButtons, classes.minusButton)}}
                    >
                        <Typography variant={'h3'} classes={{root: clsx(classes.qtyText, classes.minus)}}>
                            -
                        </Typography>
                    </Button>
                </ButtonGroup>
                <Button classes={{root: clsx(classes.endButtons, classes.cartButton)}}
                >
                    <Badge overlap={'circular'}
                           badgeContent={'+'}
                           classes={{badge: classes.badge}}
                    >
                        <Cart color={'white'}/>
                    </Badge>
                </Button>
            </ButtonGroup>
        </Grid>
    );
};

export default QtyButton;
