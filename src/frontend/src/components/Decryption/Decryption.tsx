import React, {FC} from 'react';
import {DecryptionProps} from "./DecryptionProps";
import Sider from "antd/es/layout/Sider";
import {Button, Layout, Menu, Modal, Space} from "antd";
import {ImageExtension} from "../../domain/imageExtension";
import {Content} from "antd/es/layout/layout";


const Decryption: FC<DecryptionProps> = () => {

    return (
        <Layout>
            <Sider style={{
                backgroundColor: 'white',
                width: 200
            }}>
                <Space  direction={'vertical'} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: 10
                }}>
                    <Button type={'primary'}
                            size={'large'}
                            block={true}>
                        Deconvert
                    </Button>
                </Space>
                <Menu mode={'inline'}
                      defaultSelectedKeys={[ImageExtension.PNG]}
                      items={[{
                          label: 'Extension',
                          children: [],
                          key: 'extension',
                      }]}>
                </Menu>
            </Sider>
            <Content style={{
                paddingLeft: 10
            }}>
                <div style={{
                    display: 'block',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: 'white'
                }}>
                    This is file upload
                </div>
            </Content>
            <Modal title={'Deconverted image'}/>
        </Layout>
    );
};

export default Decryption;
