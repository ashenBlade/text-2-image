import React, {FC, useEffect, useState} from 'react';
import HalfArrow from "./HalfArrow/HalfArrow";
import {SwitchArrowsProps} from "./SwitchArrowsProps";
import './SwitchArrows.tsx.css';

const SwitchArrows: FC<SwitchArrowsProps> = ({fontSize, onSwitch}) => {
    const [leftSelected, setLeftSelected] = useState(true);

    useEffect(() => {
        onSwitch?.(leftSelected ? 'left' : 'right')
    }, [leftSelected, onSwitch]);


    return (
        <div>
            <div style={{
                display: 'flex',
                flexFlow: 'column wrap'
            }}>
                <div onClick={e => {
                    if (!leftSelected) {
                        setLeftSelected(true)
                    }
                }} className={leftSelected ? 'switch-arrow selected' : 'clickable'}>
                    <HalfArrow/>
                </div>
                <div onClick={e => {
                    if (leftSelected) {
                        setLeftSelected(false)
                    }
                }} className={leftSelected ? 'clickable' : 'switch-arrow selected'}>
                    <HalfArrow mirror={true} color={'blue'}/>
                </div>
            </div>
        </div>
    );
};

export default SwitchArrows;
