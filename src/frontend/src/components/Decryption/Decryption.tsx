import React, {FC, useEffect, useMemo, useState} from 'react';
import {DecryptionProps} from "./DecryptionProps";
import MainPageLayout from "../MainPageLayout/MainPageLayout";
import {Button, Image, Modal} from "antd";
import {ImageExtension} from "../../domain/imageExtension";
import TextArea from "antd/es/input/TextArea";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {UploadOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";


const Decryption: FC<DecryptionProps> = ({decryptor}) => {
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [convertedText, setConvertedText] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');

    useEffect(() => {
        let url: string;
        if (uploadedFile) {
            url = URL.createObjectURL(uploadedFile);
            setUploadedFileUrl(url);
        }
        return () => {
            if (url) {
                URL.revokeObjectURL(url)
            }
        };
    }, [uploadedFile]);

    function updateChosenImageExtension(file: File) {
        const extension = file.name.split('.').pop();
        if (!extension) {
            console.warn('Could not detect file extension. Extension is empty');
            return;
        }
        console.log('fuck')

        const extensionLower = extension.toLowerCase();
        if (Object.values(ImageExtension).some(ext => ext === extensionLower)) {
            setChosenExtension(extensionLower as ImageExtension)
        }
    }

    const [chosenExtension, setChosenExtension] = useState(ImageExtension.PNG);

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

    const selectedKeys = useMemo<string[]>(() => ([chosenExtension]), [chosenExtension])
    const menuItems = useMemo<ItemType[]>(() => [{
        label: 'Extension',
        children: imageExtensionsItemTypes,
        key: 'extension',
    }], [imageExtensionsItemTypes])


    const decryptButtonOnClick = async () => {
        setIsDecrypting(true);
        try {
            if (!uploadedFile) {
                console.error('Uploaded file is null');
                return;
            }
            const converted = await decryptor.decryptAsync(uploadedFile, chosenExtension);
            setConvertedText(converted);
            setShowModal(true);
        } catch (e) {
            console.error(e);
            Modal.error({
                title: 'Could not convert image to text',
                content: 'Error while sending request'
            })
        } finally {
            setIsDecrypting(false);
        }
    }

    return (
        <MainPageLayout actionButtons={[
            <Button type={'primary'}
                    size={'large'}
                    block={true}
                    onClick={decryptButtonOnClick}
                    disabled={isDecrypting || uploadedFile === null}>
                Decrypt
            </Button>
        ]}
                        selectedMenuKeys={selectedKeys}
                        menuItems={menuItems}>
            <Dragger multiple={false}
                     maxCount={0}
                     beforeUpload={f => {
                         setUploadedFile(f);
                         updateChosenImageExtension(f);
                         return false;
                     }}
                     style={{
                         padding: 10
                     }}
                     showUploadList={false}
                     onDrop={e => {
                         e.preventDefault();
                         const files = e.dataTransfer.files;
                         if (!files) {
                             return;
                         }
                         if (files.length > 1) {
                             return;
                         }
                         if (files[0]) {
                             updateChosenImageExtension(files[0])
                             setUploadedFile(files[0]);
                         }}}>
                {uploadedFile === null
                    ? <>
                        <p className={'ant-upload-drag-icon'}>
                            <UploadOutlined/>
                        </p>
                        <p className={'ant-upload-text'}>
                            Click or drag file here
                        </p>
                    </>
                    : <>
                        <p className={'ant-upload-drag-icon'}>
                            <Image src={uploadedFileUrl}
                                   alt={'Uploaded file preview'} onClick={e => e.stopPropagation()}/>
                        </p>
                        <p className={'ant-upload-text'}>
                            {uploadedFile.name}
                        </p>
                        <p>
                            <Button danger={true}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setUploadedFile(null)
                                    }}>
                                Remove file
                            </Button>
                        </p>
                    </>}
            </Dragger>
            <Modal open={showModal}
                   title={'Decrypted'}

                   okText={'Save'}
                   onOk={() => {
                       const a = document.createElement('a');
                       a.href = uploadedFileUrl;
                       a.download = `${uploadedFile?.name ?? 'decrypted'}.txt`;
                       a.hidden = true;
                       document.body.appendChild(a);
                       a.click();
                       document.body.removeChild(a);
                       setShowModal(false);
                   }}

                   afterClose={() => {
                       setUploadedFile(null);
                   }}

                   cancelText={'Close'}
                   onCancel={() => {
                       setShowModal(false);
                   }}>
                {convertedText !== undefined &&
                    <TextArea readOnly={true}
                              style={{
                                  resize: 'none',
                                  width: '100%',
                                  height: '100%',
                              }}
                              value={convertedText}/>
                }
            </Modal>
        </MainPageLayout>
    );
};

export default Decryption;
