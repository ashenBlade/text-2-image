import React, {FC, useMemo, useRef, useState} from 'react';
import {Button, Image, Input, Layout, Menu, Modal, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import '../../common.css';
import {UploadOutlined} from "@ant-design/icons";
import EncryptionProps from "./EncryptionProps";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {ImageExtension} from "../../domain/imageExtension";
import {ItemType} from "antd/es/menu/hooks/useItems";

const Encryption: FC<EncryptionProps> = ({encryptor}) => {
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [chosenExtension, setChosenExtension] = useState(ImageExtension.PNG);
    const [imageFilename, setImageFilename] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [showImageModal, setShowImageModal] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const updateImageUrl = (blob: Blob) => {
        URL.revokeObjectURL(imageUrl);
        setImageUrl(URL.createObjectURL(blob));
    }

    const imageExtensionsItemTypes = useMemo<ItemType[]>(
        () => Object.entries(ImageExtension)
            .map(entries => {
                const extension = entries[0];
                const key = entries[1];
                return {
                    key: key,
                    label: extension,
                    onClick: () => {
                        setChosenExtension(key);
                    }
                }
            }), []);

    function isTextInput() {
        return selectedFile === null;
    }

    function tearDownFiles() {
        setImageUrl('');
        setSelectedFile(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    }

    function uploadFileOnClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        inputFileRef.current?.click();
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
            try {
                updateImageUrl(await encryptor.encryptAsync(data, chosenExtension))
                setShowImageModal(true);
            } catch (e) {
                console.error('Could not encrypt image', e);
            }
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
                            block={true}
                            onClick={encryptButtonOnClick}
                            disabled={imageLoading || (isTextInput() && !inputText)}
                            loading={imageLoading}>
                        Convert
                    </Button>
                    <Button type={'primary'}
                            size={'large'}
                            block={true}
                            style={{
                                backgroundColor: imageLoading || !isTextInput() ? '#f5f5f5' : 'green',
                                borderColor: imageLoading || !isTextInput() ? '#d9d9d9' : 'green',
                            }}
                            onClick={uploadFileOnClick}
                            disabled={imageLoading || !isTextInput()}>
                        Upload file
                    </Button>
                </Space>
                <Menu mode={'inline'}
                      defaultSelectedKeys={[ImageExtension.PNG]}
                      items={[{
                          label: 'Extension',
                          children: imageExtensionsItemTypes,
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
                    <div onDrop={inputDivOnDrop} style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <input type={'file'}
                               multiple={false}
                               hidden={true}
                               style={{
                                   display: 'none'
                               }}
                               ref={inputFileRef}
                               onChange={e => {
                                   e.preventDefault();
                                   if (e.target.files?.[0]) {
                                       setSelectedFile(e.target.files[0])
                                   }
                               }}/>
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
                            }}>
                                <Space align={'center'} direction={'vertical'}>
                                    <UploadOutlined style={{fontSize: '64px'}}/>
                                    <h3>{selectedFile?.name}</h3>
                                    <Button danger={true}
                                            size={'large'}
                                            onClick={removeButtonOnClick}>
                                        Remove
                                    </Button>
                                </Space>
                            </div>}
                    </div>
                </div>
            </Content>
            <Modal title={'Converted text'}
                   open={showImageModal}
                   okText={'Save'}
                   onOk={e => {
                       const a = document.createElement('a')
                       a.href = imageUrl;
                       a.download = `${imageFilename || 'converted'}.${chosenExtension}`;
                       a.hidden = true;
                       document.body.appendChild(a);
                       a.click();
                       document.body.removeChild(a);
                       e.preventDefault();
                       setShowImageModal(false);
                   }}

                   cancelText={'Cancel'}
                   onCancel={() => {
                       setShowImageModal(false);
                   }}

                   afterClose={() => {
                       tearDownFiles()
                   }}

                   maskClosable={false}
                   closable={false}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Image src={imageUrl}
                           alt={'Converted image preview'}/>
                </div>
                <Input type={'text'}
                       value={imageFilename}
                       placeholder={'Enter image filename'}
                       onChange={e => setImageFilename(e.currentTarget.value)}/>
            </Modal>
        </Layout>
    );
};

export default Encryption;
