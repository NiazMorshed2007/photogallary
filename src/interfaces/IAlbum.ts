import {IPhoto} from "./IPhoto";

export interface IAlbum {
    thumb: string,
    id: string,
    title: string,
    date: string,
    photos: IPhoto[],
}