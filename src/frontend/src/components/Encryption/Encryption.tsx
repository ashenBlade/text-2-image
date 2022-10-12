import React, {FC, useState} from 'react';
import {Button, Layout, Menu, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import '../../common.css';
import {FileTextOutlined} from "@ant-design/icons";
import EncryptionProps from "./EncryptionProps";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {ImageExtension} from "../../domain/imageExtension";

const Encryption: FC<EncryptionProps> = ({encryptor}) => {
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState<Blob | null>(null);

    function isTextInput() {
        return selectedFile === null;
    }

    function inputDivOnDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length === 1) {
            const file = files[0];

            if (file.type) {
                setSelectedFile(file);
            }
        }
    }

    function removeButtonOnClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.bubbles = false;
        e.preventDefault();
        setSelectedFile(null);
    }

    async function encryptButtonOnClick() {
        let data: string;
        try {
            data = isTextInput() ? inputText : await selectedFile!.text();
        } catch (e) {
            console.error(e);
            return;
        }
        setImageLoading(true);
        try {
            let blob: Blob;
            try {
                blob = await encryptor.encryptAsync(data, ImageExtension.PNG);
                setImage(blob);
            } catch (e) {
                console.error('Could not encrypt image', e);
                return;
            }
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.hidden = true;
            // a.download = 'file.png';
            // a.type = 'download';
            // document.body.appendChild(a);
            // a.click();
            // document.removeChild(a);
            // URL.revokeObjectURL(url);
        }
        finally {
            setImageLoading(false);
        }
    }

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
                            style={{
                                width: '100%',
                            }}
                            onClick={encryptButtonOnClick}
                            disabled={imageLoading || (isTextInput() && !inputText)}>
                        Convert
                    </Button>
                    <Button type={'primary'}
                            size={'large'}
                            style={{
                                width: '100%',
                                backgroundColor: 'green',
                                borderColor: 'green'
                            }}>
                        Upload file
                    </Button>
                </Space>
                <Menu mode={'inline'}
                      defaultSelectedKeys={['png']}>
                    <Menu.SubMenu title={'Extension'}>
                        <Menu.Item key={'png'}>
                            PNG
                        </Menu.Item>
                        <Menu.Item key={'jpeg'}>
                            JPEG
                        </Menu.Item>
                        <Menu.Item key={'jpg'}>
                            JPG
                        </Menu.Item>
                        <Menu.Item key={'bmp'}>
                            BMP
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
            <Content style={{
                padding: '0 10px'
            }}>
                <div style={{
                    display: 'block',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: 'white'
                }}>
                    <div onDrop={inputDivOnDrop} style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {isTextInput() ?
                            <TextArea placeholder={'Enter text or drag a file...'}
                                      size={'large'}
                                      autoFocus={true}
                                      style={{
                                          resize: 'none',
                                          height: '100%',
                                          width: '100%',
                                      }}
                                      value={inputText}
                                      onChange={e => setInputText(e.currentTarget.value)}/>
                            : <div style={{
                                marginTop: '10px'
                            }}><Space align={'center'} direction={'vertical'}>
                                <FileTextOutlined style={{fontSize: '64px'}}/>
                                <h3>{selectedFile?.name}</h3>
                                <Button danger={true}
                                        size={'large'}
                                        onClick={removeButtonOnClick}>
                                    Remove
                                </Button>
                            </Space></div>}
                    </div>
                    {/*<Upload type={'drag'}*/}
                    {/*        multiple={false}*/}
                    {/*        onDrop={inputDivOnDrop}*/}
                    {/*        showUploadList={false}*/}
                    {/*        openFileDialogOnClick={false}*/}
                    {/*        maxCount={1}>*/}
                    {/*    {isTextInput() ?*/}
                    {/*        <TextArea placeholder={'Enter text or drag a file...'}*/}
                    {/*                  bordered={false}*/}
                    {/*                  size={'large'}*/}
                    {/*                  autoFocus={true}*/}
                    {/*                  style={{*/}
                    {/*                      resize: 'none',*/}
                    {/*                      height: '100%',*/}
                    {/*                      width: '100%',*/}
                    {/*                  }}*/}
                    {/*                  value={inputText}*/}
                    {/*                  onChange={e => setInputText(e.currentTarget.value)}/>*/}
                    {/*        : <Space align={'center'} direction={'vertical'}>*/}
                    {/*            <FileTextOutlined style={{fontSize: '64px'}}/>*/}
                    {/*            <h3>{selectedFile?.name}</h3>*/}
                    {/*            <Button danger={true}*/}
                    {/*                    size={'large'}*/}
                    {/*                    onClick={removeButtonOnClick}>*/}
                    {/*                Remove*/}
                    {/*            </Button>*/}
                    {/*        </Space>}*/}
                    {/*</Upload>*/}
                </div>
            </Content>
        </Layout>
    );
};

export default Encryption;
