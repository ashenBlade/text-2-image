import React, {FC, useEffect, useState} from 'react';
import {MainPageLayoutProps} from "./MainPageLayoutProps";
import {Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar} from "@mui/material";
import './MainPageLayout.css'

const MainPageLayout: FC<MainPageLayoutProps> = (
    {buttons,
        menuElements,
        children,
        error}) => {
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    useEffect(() => {
        setShowErrorAlert(error !== undefined && error !== '');
    }, [error, setShowErrorAlert]);


    return (
        <Box className={'main-content'}>
            <Box className={'main-content_actions'}>
                <Box className={'main-content_actions__buttons'}>
                    {
                        buttons?.map(b => (
                            <Button
                                onClick={b.onClick}
                                disabled={b.disabled}
                                key={b.name}
                                value={b.name}
                                fullWidth={true}
                                variant={b.variant}
                                color={b.color}>
                                {b.name}
                            </Button>
                        ))
                    }
                </Box>
                <Box style={{marginTop: 10}}
                     className={'main-content_actions__settings'}>
                    {
                        menuElements?.map(element => (
                            <FormControl key={element.name}
                                         fullWidth={true}>
                                <InputLabel>{element.name}</InputLabel>
                                <Select color={'info'}
                                        variant={'outlined'}
                                        multiple={false}
                                        label={element.name}
                                        defaultValue={element.defaultValue}
                                        onChange={e => element.onSelect(e.target.value)}>
                                {
                                    element.items.map(e => (
                                        <MenuItem value={e.value} key={e.value}>
                                            {e.name}
                                        </MenuItem>))
                                }
                            </Select>
                        </FormControl>))
                    }
                </Box>
            </Box>
            <Box className={'main-content_input'}>
                {children}
            </Box>
            <Snackbar open={showErrorAlert}>
                <Alert variant={'filled'}
                       color={'error'}
                       onClose={() => setShowErrorAlert(false)}>
                    {
                        error
                    }
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MainPageLayout;
