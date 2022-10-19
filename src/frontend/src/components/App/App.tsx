import React, {FC} from 'react';
import '../../common.css'
// import Encryption from "../Encryption/Encryption";
// import Decryption from "../Decryption/Decryption";
import AppProps from "./AppProps";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {imageToTextPath, textToImagePath} from "./path";
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";

const App: FC<AppProps> = ({encryptor, decryptor}) => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column wrap'}}>
                <AppBar component={'nav'}
                        variant={'elevation'}
                        position={'sticky'}>
                    <Toolbar>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Button onClick={() => navigate(textToImagePath)} sx={{color: '#fff'}}>
                                Text to Image
                            </Button>
                            <Button onClick={() => navigate(imageToTextPath)} sx={{color: '#fff'}}>
                                Image to Text
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Routes>
                        <Route path={textToImagePath} shouldRevalidate={() => false} element={
                            <p style={{color: '#000'}}>
                                This is encryption page
                            </p>}/>
                        <Route path={imageToTextPath} shouldRevalidate={() => false}
                               element={
                            <p style={{color: '#000'}}>
                                This is decryption page
                            </p>}/>
                        <Route path={'*'} element={<Navigate to={textToImagePath}/>}/>
                    </Routes>
                </Container>
            </Box>
        </>
    );
};

export default App;
