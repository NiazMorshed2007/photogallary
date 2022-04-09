import React, {FC, useEffect} from 'react';
import Layout from "./Layout/Layout";
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./Pages/home";
import PageAlbum from "./Pages/Page.Album";
import {useSelector} from "react-redux";
import {RootState} from "./reducers";
import Auth from "./Pages/Auth";
import firebase from './firebase/firebase';
import { getAuth } from 'firebase/auth';

const App: FC = () => {
    const auth = firebase && getAuth();
    const user = auth.currentUser;
    const isAuth: boolean = useSelector((state: RootState) => {
        return state.isAuth;
    })
    const navigate = useNavigate();
    useEffect(() => {
        isAuth ? navigate('/') : navigate('/login');
    }, [isAuth])
    useEffect(() => {
        
    }, [])
    return (
        <>
            {isAuth ?
                <Layout>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/album/:album__id'} element={<PageAlbum/>}/>
                    </Routes>
                </Layout>
                : <Auth/>
            }
        </>
    );
}

export default App;
