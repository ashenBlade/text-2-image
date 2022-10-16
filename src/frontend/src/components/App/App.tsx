import React, {FC} from 'react';
import 'antd/dist/antd.min.css';
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import '../../common.css'
import Encryption from "../Encryption/Encryption";
import Decryption from "../Decryption/Decryption";
import AppProps from "./AppProps";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {imageToTextPath, textToImagePath} from "./path";

const App: FC<AppProps> = ({encryptor, decryptor}) => {
    const navigate = useNavigate();
    return (
        <Layout className={'h-window'}>
            <Header>
                <Menu className={'container'}
                      defaultSelectedKeys={['fuck']}
                      items={[
                          {
                              label: 'Text to image',
                              key: 'Text to image',
                              onClick() {
                                  navigate(textToImagePath)
                              }
                          },
                          {
                              label: 'Image to text',
                              key: 'Image to text',
                              onClick() {
                                  navigate(imageToTextPath)
                              }
                          }
                      ]}
                      theme={'dark'}
                      mode={'horizontal'}/>
            </Header>
            <Content className={'container'} style={{
                backgroundColor: 'white',
                margin: '20px auto',
                display: 'flex',
            }}>
                <Routes>
                    <Route path={textToImagePath} shouldRevalidate={() => false} element={<Encryption encryptor={encryptor}/>}/>
                    <Route path={imageToTextPath} shouldRevalidate={() => false} element={<Decryption decryptor={decryptor}/>}/>
                    <Route path={'*'} element={<Navigate to={textToImagePath}/>}/>
                </Routes>
            </Content>
        </Layout>
    );
};

export default App;
