import React, {FC} from 'react';
import {MainPageLayoutProps} from "./MainPageLayoutProps";
import {Box} from "@mui/material";

const MainPageLayout: FC<MainPageLayoutProps> = (
    {actionButtons,
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
                {actionButtons}
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
