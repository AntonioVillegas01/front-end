import React from 'react';
import {
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    makeStyles,
} from "@material-ui/core";

import filter from '../../images/filter.svg'
import close from '../../images/close.svg'


const useStyles = makeStyles(theme => ({
    mainContainer: {
        padding: "1rem 0",
    },
    checkbox: {
        color: "#fff",
    },
    optionsContainer: {
        [theme.breakpoints.down("xs")]: {
            "& > :not(:last-child)": {
                marginBottom: "2rem",
            },
        },
    },
}))

const Filter = ({setOption, filterOptions, setFilterOptions}) => {
    const classes = useStyles()

    const handleFilter = (option, i) => {
        const newFilter = {...filterOptions}

        newFilter[option][i].checked = !newFilter[option][i].checked

        setFilterOptions(newFilter)

    }

    // console.log(filterOptions)

    return (
        <Grid item container
              justifyContent={'space-between'}
              alignItems={'center'}
              classes={{root: classes.mainContainer}}
        >
            <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={filter} alt="filter"/>
                </IconButton>
            </Grid>

            <Grid item xs>
                <Grid container
                      justifyContent={'space-around'}
                      classes={{root: classes.optionsContainer}}
                >
                    {/*// todo: check on this function*/}
                    {
                        Object.keys(filterOptions)
                            .filter(option => filterOptions[option] !== null)
                            .map(option => (
                                <Grid key={option}>
                                    <Grid container direction={'column'}>
                                        <Grid item>
                                            <Chip label={option}
                                                  classes={{root: classes.chipContainer}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControl>
                                                <FormGroup>
                                                    {
                                                        filterOptions[option].map(({label, checked}, i) => (
                                                            <FormControlLabel key={label}
                                                                              classes={{label: classes.checkbox}}
                                                                              control={
                                                                                  <Checkbox checked={checked}
                                                                                            name={label}
                                                                                            classes={{root: classes.checkbox}}
                                                                                            onChange={()=> handleFilter(option,i )}
                                                                                  />
                                                                              }
                                                                              label={label}
                                                            />
                                                        ))
                                                    }
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))
                    }
                </Grid>
            </Grid>

            <Grid item>
                <IconButton onClick={() => setOption(null)}>
                    <img src={close} alt="close"/>
                </IconButton>
            </Grid>

        </Grid>
    );
};

export default Filter;
