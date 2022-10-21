import React, {FC} from 'react';
import {MainPageLayoutProps} from "./MainPageLayoutProps";
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const MainPageLayout: FC<MainPageLayoutProps> = (
    {buttons,
        menuElements,
        children}) => {
    return (
        <Box style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gridTemplateRows: '1fr',
            width: '100%',
            height: '100%',
            padding: '0 5px 0 5px'
        }}>
            <Box style={{
            display: 'flex',
            flexFlow: 'column wrap',
            width: 200,
        }}>
                {
                    buttons?.map(b => (
                        <Button
                            onClick={b.onClick}
                            disabled={b.disabled}
                            key={b.name}
                            value={b.name}
                            fullWidth={true}
                            variant={b.variant}
                            color={b.color}
                        style={{
                            marginBottom: 10
                        }}>
                            {b.name}
                        </Button>
                    ))
                }
            <Box>
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
            <Box style={{
                marginLeft: 10,
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: 'white',
                flex: '1 1 auto',
            }}>
                {children}
            </Box>
        </Box>
    );
};

export default MainPageLayout;
