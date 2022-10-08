import React, {FC} from 'react';

interface HalfArrowProps {
    mirror?: boolean
    fill?: boolean
    color?: string
}

const HalfArrow: FC<HalfArrowProps> = ({mirror, fill, color}) => {
    return (
        <svg style={{
            transform: mirror ? 'scale(-1,-1)' : '',
        }}
             fill={fill ? color : 'black'}
             color={color}
             height="1em"
             version="1.1"
             viewBox="0 0 197.86 75.143"
             xmlns="http://www.w3.org/2000/svg">
            <path d="m127.32 1e-4c-3.0048 0-4.7643 3.6651-2.9141 6.0117l36.152 45.848h-156.85c-2.0301 0-3.7031 1.673-3.7031 3.7031v15.875c0 2.0301 1.673 3.7051 3.7031 3.7051h184.12c8.3071 0 13.034-9.7592 7.916-16.273a1.5877 1.5877 0 0 0-2e-3 -2e-3l-44.66-56.648a1.5877 1.5877 0 0 0-4e-3 -4e-3c-1.1152-1.4031-2.8046-2.2148-4.5762-2.2148zm0 3.1758h19.184c0.82129 0 1.5647 0.35298 2.0898 1.0137l44.658 56.643c3.6101 4.5981 0.45171 11.135-5.4219 11.135h-184.12c-0.29826 0-0.5293-0.23103-0.5293-0.5293v-15.875c0-0.29826 0.23103-0.52734 0.5293-0.52734h160.13a1.5877 1.5877 0 0 0 1.2461-2.5723l-38.18-48.418c-0.31938-0.40506-0.1207-0.86914 0.41992-0.86914z" color="#000000"/>
        </svg>
    );
};

export default HalfArrow;
