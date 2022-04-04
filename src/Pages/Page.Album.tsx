import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import * as _ from "lodash";
import albums from '../album.static.json';
import {IAlbum} from "../interfaces/IAlbum";

const PageAlbum: FC = () => {
    const {album__id} = useParams();
    const album: IAlbum = albums &&  _.find(albums, (album) => {
        return album.id === album__id;
    })!;
    return <section className='page-album'>
        {album && <div>{album.title}</div>}
    </section>
}

export default PageAlbum;