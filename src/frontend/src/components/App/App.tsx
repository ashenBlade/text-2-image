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
                            <Link to={'/text/to/image'}>
                                <span>Text to image</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/image/to/text'}>
                                <span>Image to text</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{
                    padding: '24px'
                }}>
                    <Content className={'container'} style={{
                        backgroundColor: 'white',
                        padding: '24px'
                    }}>
                        <div style={{
                            margin: '50px'
                        }}>
                        </div>
                        <div style={{height: '50vh'}}>
                            <Routes>
                                <Route path={'/text/to/image'} element={<Encryption encryptor={encryptor}/>}/>
                                <Route path={'/image/to/text'} element={<Decryption/>}/>
                                <Route path={'*'} element={<Navigate to={'/text/to/image'}/>}/>
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
