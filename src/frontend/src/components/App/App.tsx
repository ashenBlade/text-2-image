import React, {FC, useState} from 'react';
import 'antd/dist/antd.min.css';
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import '../../common.css'
import Encryption from "../Encryption/Encryption";
import Decryption from "../Decryption/Decryption";
import BackendEncryptorService from "../../services/backendEncryptorService";
import AppProps from "./AppProps";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {imageToTextPath, textToImagePath} from "./path";

const App: FC<AppProps> = ({serverUrl}) => {
    const [encryptor,] = useState(new BackendEncryptorService(serverUrl));
    return (
        <BrowserRouter>
            <Layout className={'h-window'}>
                <Header>
                    <Menu className={'container'}
                          defaultSelectedKeys={['fuck']}
                          theme={'dark'}
                          mode={'horizontal'}>
                        <Menu.Item>
                            <Link to={textToImagePath}>
                                <span>Text to image</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={imageToTextPath}>
                                <span>Image to text</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className={'container'} style={{
                    backgroundColor: 'white',
                    margin: '20px auto',
                    // height: '100%',
                    display: 'flex',
                }}>
                    <Routes>
                        <Route path={textToImagePath} element={<Encryption encryptor={encryptor}/>}/>
                        <Route path={imageToTextPath} element={<Decryption/>}/>
                        <Route path={'*'} element={<Navigate to={textToImagePath}/>}/>
                    </Routes>
                </Content>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
