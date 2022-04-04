import React, {FC} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {Link, useNavigate} from "react-router-dom";

interface Props {
    img__src: string,
    title: string,
    date: string,
    id: string,
}

const Album: FC<Props> = (props) => {
    const {img__src, title, date, id} = props;
    return <Link to={`/album/${id}`} state={{album__id: id}}>
        <div className='album mb-5 shadow-sm pointer'>
            <img src={img__src} alt=""/>
            <div className="album__content">
                <h6>{title}</h6>
                <span>{date}</span>
            </div>
            <i className='pointer'>
                <BsThreeDotsVertical/>
            </i>
        </div>
    </Link>
}

export default Album;