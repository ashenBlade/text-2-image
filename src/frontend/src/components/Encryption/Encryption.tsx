import React, {useState} from 'react';
import {Button, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import '../../common.css';
import {FileTextOutlined} from "@ant-design/icons";

const Encryption = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
                                   }}/>
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
                            size={'large'}>
                        Encrypt
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Encryption;
