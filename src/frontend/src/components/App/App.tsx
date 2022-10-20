import React, {FC} from 'react';
import '../../common.css'
import Encryption from "../Encryption/Encryption";
// import Decryption from "../Decryption/Decryption";
import AppProps from "./AppProps";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {imageToTextPath, textToImagePath} from "./path";
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import Decryption from "../Decryption/Decryption";

const App: FC<AppProps> = ({encryptor, decryptor}) => {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'min-content 1fr',
            height: "100%"
        }}>
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
            <Container style={{
                display: 'flex',
                flex: '1 1 auto',
                padding: '10px 0 10px 0',
            }}>
                <Routes>
                    <Route path={imageToTextPath} shouldRevalidate={() => false} element={<Decryption decryptor={decryptor}/>}/>
                    <Route path={textToImagePath} shouldRevalidate={() => false} element={<Encryption encryptor={encryptor}/>}/>
                    <Route path={'*'} element={<Navigate to={textToImagePath}/>}/>
                </Routes>
            </Container>
        </div>
    );
};

export default App;
