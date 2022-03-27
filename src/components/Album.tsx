import React, {FC} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';

interface Props {
    img__src: string,
    title: string,
    date: string
}

const Album: FC<Props> = (props) => {
    const {img__src, title, date} = props;
    return <div className='album mb-5 shadow-sm pointer'>
        <img src={img__src} alt=""/>
        <div className="album__content">
            <h6>{title}</h6>
            <span>{date}</span>
        </div>
        <i className='pointer'>
            <BsThreeDotsVertical />
        </i>
    </div>
}

export default Album;