import React, {FC, useState} from 'react';
import {FileTextOutlined, FileImageOutlined, SwapOutlined} from "@ant-design/icons";
import {Space} from "antd";
import '../../common.css'
import {HeaderProps} from "./HeaderProps";
import SwitchArrows from "./SwitchArrows/SwitchArrows";

const Header: FC<HeaderProps> = ({onSwitch, fontSize: inputFontSize}) => {
    const [isTextToImage, setIsTextToImage] = useState(true);
    const defaultFontSize = 64;
    const resultFontSize = inputFontSize === undefined ? defaultFontSize : inputFontSize;
    const iconStyle = {
        fontSize: `${resultFontSize}px`
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Space direction={"horizontal"}
                   size={'large'}
                   align={'center'}>
                <div>
                    <FileTextOutlined style={iconStyle}/>
                </div>
                {/*<SwapOutlined style={{*/}
                {/*    fontSize: `${resultFontSize * 0.6}px`*/}
                {/*}} onClick={_ => {*/}
                {/*    const textToImage = !isTextToImage;*/}
                {/*    setIsTextToImage(textToImage);*/}
                {/*    onSwitch?.(textToImage ? 'text' : 'image');*/}
                {/*}}/>*/}
                <SwitchArrows fontSize={resultFontSize} onSwitch={newStart => {
                    onSwitch?.(newStart === 'left' ? 'text' : 'image')
                }}/>
                <div>
                    <FileImageOutlined style={iconStyle} color={'rgb(0, 0, 255)'}/>
                </div>
            </Space>
        </div>
    );
};

export default Header;
