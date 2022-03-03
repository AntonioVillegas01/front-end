import React from 'react';
import {Link} from "gatsby";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {makeStyles, useMediaQuery} from "@material-ui/core";


import search from '../../images/search.svg'
import cart from '../../images/cart.svg'
import account from '../../images/account-header.svg'
import menu from '../../images/menu.svg'


const useStyles = makeStyles((theme) => ({
    colorIndicator: {
        backgroundColor: '#fff',
    },
    logoContainer:{
        // Adding custom styles according to breakpoint
        [theme.breakpoints.down('md')]: {
            marginRight: 'auto'
        }
    },
    logoText: {
        color: theme.palette.common.offBlack
    },
    tab:{
        ...theme.typography.body1,
        fontWeight: 600
    },
    tabs: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    icon: {
        height: '3rem',
        width: '3rem',
        padding: 10
    },
    drawer:{
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    listItemText:{
        color: 'white'
    },
    //Override global styles
    // "@global": {
    //     '.MuiTypography-h1': {
    //         fontSize: '30rem'
    //     }
    // }
}))


const Header = ({categories}) => {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const classes = useStyles()
    const matchesMD = useMediaQuery((theme) => theme.breakpoints.down('md'))
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Get the current location
    // window.location.pathname
    const activeIndex = () => {
        // Desestructuring name from node
        const found = routes.indexOf(routes.filter(
            ( {node: {name, link} } ) => (link || `/${name.toLowerCase()}`) === window.location.pathname
        )[0])

        return found === -1 ? false : found
    }


    const routes = [...categories, {
        node: {name: 'Contact Us', strapiId: 'contact', link: '/contact'}
    }]

    const tabs = (
        <Tabs value={activeIndex()}
              classes={{
            indicator: classes.colorIndicator,
            root: classes.tabs
        }}>
            {
                routes.map(({node}) => (
                    <Tab
                        to={node.link || `/${node.name.toLowerCase()}`}
                        component={Link}
                        classes={{root: classes.tab}}
                        key={node.strapiId}
                        label={node.name}
                    />
                ))
            }
        </Tabs>
    )
    const drawer = (
        <SwipeableDrawer
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            classes={{paper: classes.drawer}}
        >
            <List disablePadding={true}>
                {
                    routes.map(({node}, i) => (
                        <ListItem
                            selected={activeIndex() === i}
                            to={node.link || `/${node.name.toLowerCase()}`}
                            component={Link}
                            key={node.strapiId}
                            divider button>
                            <ListItemText
                                classes={{primary: classes.listItemText}}
                                primary={node.name}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </SwipeableDrawer>
    )

    const actions = [
        {link: '', icon: search, alt: 'search', visible: true},
        {link: '/cart', icon: cart, alt: 'cart', visible: true},
        {link: '/account', icon: account, alt: 'account', visible: !matchesMD},
        {link: '', icon: menu, alt: 'menu', visible: matchesMD, onClick: () => setDrawerOpen(true)},
    ]


    return (
        <AppBar color="transparent" elevation={0} position={"static"}>
            <Toolbar>
                <Button
                    to={'/'}
                    component={Link}
                    classes={{root: classes.logoContainer}} >
                    <Typography variant="h1" classes={{h1: classes.tabs}}>
                        <span className={classes.logoText}>VAR </span>X
                    </Typography>
                </Button>
                {matchesMD ? drawer : tabs}
                {
                    actions.map(({
                                     icon,
                                     alt,
                                     onClick,
                                     visible,
                                     link
                                 }, index) => {
                        if (visible) {
                            return (
                                <IconButton
                                    to={link}
                                    component={Link}
                                    key={`${alt}${index}`}
                                    classes={{root: classes.icon}}
                                    onClick={onClick}
                                >
                                    <img src={icon} alt={alt}/>
                                </IconButton>
                            )
                        }
                    })
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;