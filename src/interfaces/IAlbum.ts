import {IPhoto} from "./IPhoto";

export interface IAlbum {
    picture: string,
    id: string,
    title: string,
    date: string,
    photos: IPhoto[],
}