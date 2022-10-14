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

    const defaultSelectedKeys = useMemo<string[]>(() => ([ImageExtension.PNG]), [])
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
        ]} defaultSelectedMenuKeys={defaultSelectedKeys}
                        menuItems={menuItems}>
            <Dragger multiple={false}
                     maxCount={1}
                     beforeUpload={f => {
                         setUploadedFile(f);
                         return false;
                     }}

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
                             console.log('gay')
                             setUploadedFile(files[0]);
                         }}}>
                {uploadedFile === null ? <>
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
                   onOk={() => {
                       setShowModal(false)
                   }}
                   onCancel={() => setShowModal(false)}>
                {convertedText !== undefined &&
                    <TextArea readOnly={true}
                              style={{
                                  resize: 'none',
                                  width: '100%',
                                  height: '100%'
                              }}
                              value={convertedText}></TextArea>
                }
            </Modal>
        </MainPageLayout>
    );
};

export default Decryption;
