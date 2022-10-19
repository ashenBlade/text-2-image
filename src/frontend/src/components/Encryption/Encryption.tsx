import React, {FC, useMemo, useRef, useState} from 'react';
import '../../common.css';
import EncryptionProps from "./EncryptionProps";
import {ImageFormat} from "../../domain/imageFormat";
import MainPageLayout from "../MainPageLayout/MainPageLayout";
import {Button, FormControl, Input, InputLabel, MenuItem, Modal, Select} from "@mui/material";

const Encryption: FC<EncryptionProps> = ({encryptor}) => {
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [chosenImageFormat, setChosenImageFormat] = useState(ImageFormat.PNG);
    const [imageFilename, setImageFilename] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [showImageModal, setShowImageModal] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const imageFormatsMenuItems = useMemo(() => Object.values(ImageFormat).map(imageFormat => (
        <MenuItem value={imageFormat}>
            {imageFormat}
        </MenuItem>
    )), []);

    const updateImageUrl = (blob: Blob) => {
        URL.revokeObjectURL(imageUrl);
        setImageUrl(URL.createObjectURL(blob));
    }

    function isTextInput() {
        return selectedFile === null;
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
                updateImageUrl(await encryptor.encryptAsync(data, chosenImageFormat))
                setImageFilename(`${selectedFile?.name || 'encrypted'}`)
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
        <MainPageLayout actionButtons={[
            <Button onClick={encryptButtonOnClick}
                    variant={'contained'}
                    color={'success'}
                    style={{
                        marginBottom: 5
                    }}
                    disabled={imageLoading || (isTextInput() && !inputText)}>
                Convert
            </Button>,
            <Button onClick={uploadFileOnClick}
                    variant={'outlined'}
                    color={'info'}
                    style={{
                        marginBottom: 10
                    }}
                    disabled={imageLoading || !isTextInput()}>
                Upload file
            </Button>,
            <FormControl fullWidth={true}>
                <InputLabel>Image format</InputLabel>
                <Select color={'info'}
                        variant={'outlined'}
                        multiple={false}
                        label={'Image format'}
                        defaultValue={'png'}
                        value={chosenImageFormat}
                        onChange={e => setChosenImageFormat(e.target.value as ImageFormat)}>
                    {imageFormatsMenuItems}
                </Select>
            </FormControl>
        ]}
        selectedMenuKeys={[chosenImageFormat]}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flex: '1 1 auto',
                backgroundColor: 'white',
            }}>
                <div onDrop={inputDivOnDrop} style={{
                    height: '100%',
                    display: 'flex',
                    flex: '1 1 auto',
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
                        <textarea placeholder={'Enter text or drag a file...'}
                                  autoFocus={true}
                                  style={{
                                      resize: 'none',
                                      height: 'auto',
                                      width: '100%',
                                      borderColor: 'gray',
                                      borderRadius: '3px',
                                      padding: 5
                                  }}
                                  value={inputText}
                                  onChange={e => setInputText(e.currentTarget.value)}/>
                        : <div className={'ant-upload-drag ant-upload'}>
                            <span className={'ant-upload-btn ant-upload'}>
                                <div className={'ant-upload-drag-container'}>
                                    <p className={'ant-upload-drag-icon'}>

                                    </p>
                                    <p className={'ant-upload-text'}>
                                        {selectedFile?.name}
                                    </p>
                                    <Button onClick={removeButtonOnClick}>
                                        Remove
                                    </Button>
                                </div>
                            </span>
                        </div>}
                </div>
            </div>
            <Modal open={showImageModal}>
                <>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={imageUrl} alt={'Converted image preview'}/>
                    </div>
                    <Input type={'text'}
                           value={imageFilename}

                           placeholder={'Enter image filename'}
                           onChange={e => setImageFilename(e.currentTarget.value)}/></>
            </Modal>
        </MainPageLayout>
    );
};

export default Encryption;
