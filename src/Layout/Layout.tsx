import React, {FC, ReactNode} from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = (props) => {
    const {children} = props;
    return <main className='layout d-flex vh-100 vw-100'>
        <Sidebar/>
        <main className="content w-100 px-5 py-3">
            <Header/>
            {children}
        </main>
    </main>
}

export default Layout;