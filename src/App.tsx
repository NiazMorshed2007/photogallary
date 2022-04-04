import React, {FC} from 'react';
import Layout from "./Layout/Layout";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/home";
import PageAlbum from "./Pages/Page.Album";

const App: FC = () => {
    return (
        <>
            <Router>
                <Layout>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/album/:album__id'} element={<PageAlbum />} />
                    </Routes>

                </Layout>
            </Router>
        </>
    );
}

export default App;
