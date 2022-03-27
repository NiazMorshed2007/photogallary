import React, {FC} from 'react';
import Layout from "./Layout/Layout";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/home";

const App: FC = () => {
    return (
        <>
            <Router>
                <Layout>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                    </Routes>
                </Layout>
            </Router>
        </>
    );
}

export default App;
