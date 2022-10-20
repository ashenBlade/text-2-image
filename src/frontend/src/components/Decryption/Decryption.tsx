import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {DecryptionProps} from "./DecryptionProps";
import MainPageLayout from "../MainPageLayout/MainPageLayout";
import {ImageFormat} from "../../domain/imageFormat";
import './Decryption.tsx.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel, MenuItem,
    Select,
    TextareaAutosize
} from "@mui/material";

const Decryption: FC<DecryptionProps> = ({decryptor}) => {
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [convertedText, setConvertedText] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [chosenImageFormat, setChosenImageFormat] = useState(ImageFormat.PNG);

    const inputRef = useRef<HTMLInputElement>(null);
    const textareaModalRef = useRef<HTMLTextAreaElement>(null);

    const imageFormats = useMemo(() => Object.values(ImageFormat), []);
    const imageFormatsMenuItems = useMemo(() => Object.values(ImageFormat).map(imageFormat => (
        <MenuItem value={imageFormat}>
            {imageFormat}
        </MenuItem>
    )), []);

    function isFileUploaded() {
        return uploadedFile !== null;
    }

    useEffect(() => {
        if (uploadedFile && uploadedFile.type.startsWith('image')) {
            const type = uploadedFile.type.split('/')[1];
            const index = imageFormats.indexOf(type as ImageFormat);
            if (index !== -1) {
                setChosenImageFormat(imageFormats[index]);
            }
        }
    }, [uploadedFile, imageFormats]);



    const decryptButtonOnClick = async () => {
        setIsDecrypting(true);
        try {
            if (!uploadedFile) {
                console.error('Uploaded file is null');
                return;
            }
            const converted = await decryptor.decryptAsync(uploadedFile, chosenImageFormat);
            setConvertedText(converted);
            setShowModal(true);
        } catch (e) {
            console.error(e);
            alert('Could not reconvert image')
        } finally {
            setIsDecrypting(false);
        }
    }

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files?.length === 1) {
            const file = e.target.files[0];
            setUploadedFile(file);
        }
    }

    const clickInput = () => {
        inputRef.current?.click();
    }

    return (
        <MainPageLayout actionButtons={[
            <Button variant={'contained'}
                    color={'success'}
                    onClick={decryptButtonOnClick}
                    disabled={isDecrypting || uploadedFile === null}>
                Decrypt
            </Button>,
            <FormControl fullWidth={true} style={{
                marginTop: 10
            }}>
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
        ]}>
            <div style={{
                display: 'flex',
                flex: '1 1 auto',
                justifyContent: 'center',
            }}
                 onDragEnter={e => e.preventDefault()}
                 onDragOver={e => e.preventDefault()}
                 onDrop={e => {
                     e.preventDefault();
                     if (e.dataTransfer.files.length === 1) {
                         const file = e.dataTransfer.files[0];
                         setUploadedFile(file);
                     }
                 }}>
                <input type={'file'}
                       multiple={false}
                       ref={inputRef}
                       onChange={inputOnChange}
                       hidden={true}/>
                <div style={{
                    border: 'gray dashed 1px',
                    borderRadius: 5,

                    display: 'flex',
                    flex: '1 1 auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {isFileUploaded()
                        ? <div style={{
                            display: 'flex',
                            flexFlow: 'column wrap',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            {uploadedFile &&
                                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                <img src={URL.createObjectURL(uploadedFile)}
                                     alt={'Converted image preview'}
                                     style={{
                                         objectFit: 'scale-down',
                                         maxHeight: '100%',
                                         maxWidth: '100%',
                                     }}/>}
                            <p>{uploadedFile?.name}</p>
                            <Button variant={'outlined'} color={'error'} onClick={() => {
                                setUploadedFile(null);
                            }}>
                                Remove
                            </Button>

                        </div>
                        : <Button variant={'outlined'}
                                  color={'info'}
                                  onClick={clickInput}>
                            Choose file
                        </Button>}
                </div>
            </div>
            <Dialog open={showModal}
                    fullWidth={true}
                    maxWidth={'md'}>
                <DialogTitle>
                    <span>Deconverted text</span>
                </DialogTitle>

                <DialogContent style={{
                    overflowX: 'clip'
                }}>
                    <TextareaAutosize className={'.text-converted'} style={{
                        width: '100%',
                        resize: 'vertical',
                    }}
                                      ref={textareaModalRef}
                                      value={convertedText}/>
                </DialogContent>

                <DialogActions>
                    <Button color={'error'}
                            onClick={() => {
                        setUploadedFile(null);
                        setShowModal(false);
                    }}>
                        Close
                    </Button>
                    <Button onClick={async () => {
                        const textarea = textareaModalRef.current;
                        if (!textarea) {
                            return;
                        }

                        textarea.select();
                        if (navigator.clipboard) {
                            await navigator.clipboard.writeText(textarea.value);
                        }
                    }}>
                        Copy
                    </Button>
                    <Button onClick={() => {
                        function getFilename() {
                            if (!uploadedFile) {
                                return 'converted.txt';
                            }
                            const name = uploadedFile.name;
                            if (name.endsWith(chosenImageFormat)) {
                                return `${name.substring(0, name.length - chosenImageFormat.length)}txt`;
                            }
                            return `${name}.txt`
                        }
                        if (convertedText === undefined) {
                            console.error('Could not save text as file. Converted text is undefined');
                            return;
                        }
                        const a = document.createElement('a');
                        a.download = getFilename();
                        a.href = URL.createObjectURL(new Blob([convertedText], {type: 'text/plain'}));
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        setShowModal(false);
                    }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </MainPageLayout>
    );
};

export default Decryption;
