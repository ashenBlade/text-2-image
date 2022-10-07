import React, {FC, useState} from 'react';
import {Button, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import '../../common.css';
import {FileTextOutlined} from "@ant-design/icons";
import EncryptionProps from "./EncryptionProps";

const Encryption: FC<EncryptionProps> = ({encryptor}) => {
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageLoading, setImageLoading] = useState(false);

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
                blob = await encryptor.encryptAsync(data);
            } catch (e) {
                console.error('Could not encrypt image', e);
                return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.hidden = true;
            a.type = 'download';
            document.appendChild(a);
            a.click();
            document.removeChild(a);
        }
        finally {
            setImageLoading(false);
        }
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: '1fr min-content',
            gridTemplateColumns: '1fr',
            height: '100%'
        }}>
            <div style={{
                display: 'block',
                justifyContent: 'center',
                height: '100%'
            }}>
                 <Upload type={'drag'}
                         multiple={false}
                         onDrop={inputDivOnDrop}
                         showUploadList={false}
                         openFileDialogOnClick={false}
                         maxCount={1}>
                     {isTextInput() ?
                         <TextArea placeholder={'Enter text or drag a file...'}
                                   bordered={false}
                                   size={'large'}
                                   autoFocus={true}
                                   style={{
                                       resize: 'none',
                                       height: '100%',
                                       width: '100%',
                                   }}
                         value={inputText}
                         onChange={e => setInputText(e.currentTarget.value)
                         }/>
                         : <Space align={'center'} direction={'vertical'}>
                             <FileTextOutlined style={{fontSize: '64px'}}/>
                             <h3>{selectedFile?.name}</h3>
                             <Button danger={true}
                                     size={'large'}
                                     onClick={removeButtonOnClick}>
                                 Remove
                             </Button>
                         </Space>}
                 </Upload>
            </div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px'
                }}>
                    <Button type={'primary'}
                            size={'large'}
                            onClick={encryptButtonOnClick}
                            disabled={imageLoading || (isTextInput() && !inputText)}>
                        Encrypt
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Encryption;
