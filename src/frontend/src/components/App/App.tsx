import React, {FC, useState} from 'react';
import '../../common.css'
import Encryption from "../Encryption/Encryption";
import AppProps from "./AppProps";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {imageToTextPath, textToImagePath} from "./path";
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar, Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import Decryption from "../Decryption/Decryption";
import {ChevronLeft} from "@mui/icons-material";
import './App.css'

const App: FC<AppProps> = ({encryptor, decryptor}) => {
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <div className={'app'}>
            <AppBar component={'nav'}
                    variant={'elevation'}
                    position={'sticky'}>
                <Toolbar>
                    <IconButton color={'inherit'}
                                aria-label={'open drawer'}
                                onClick={() => setOpenDrawer(true)}
                                edge={'start'}
                                sx={{
                                    display: {
                                        sm: 'none',
                                    }
                                }}>
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button onClick={() => {
                            navigate(textToImagePath);
                            document.title = 'Text to image'
                        }} sx={{color: '#fff'}}>
                            <Typography>
                                Text to Image
                            </Typography>
                        </Button>
                        <Button onClick={() => {
                            navigate(imageToTextPath);
                            document.title = 'Image to text'
                        }} sx={{color: '#fff'}}>
                            <Typography>
                                Image to Text
                            </Typography>
                        </Button>
                    </Box>
                </Toolbar>
                    <Drawer variant={'temporary'}
                            anchor={'left'}
                            open={openDrawer}
                            PaperProps={{
                                style: {
                                    width: 240
                                }
                            }}
                            onClose={() => setOpenDrawer(false)}>
                        <Toolbar style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <div>
                                <IconButton onClick={() => setOpenDrawer(false)}>
                                    <ChevronLeft/>
                                </IconButton>
                            </div>
                        </Toolbar>
                        <List>
                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(textToImagePath);
                                        setOpenDrawer(false);
                                    }}>
                                    <ListItemText>
                                        Text to image
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    navigate(imageToTextPath);
                                    setOpenDrawer(false);
                                }}>
                                    <ListItemText>
                                        Image to text
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </List>
                    </Drawer>
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
