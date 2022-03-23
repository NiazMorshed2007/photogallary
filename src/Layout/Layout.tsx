import React, {FC, ReactNode} from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = (props) => {
    const {children} = props;
    return <main className='layout d-flex'>
        <Sidebar/>
        <main className="content">
            <Header/>
            {children}
        </main>
    </main>
}

export default Layout;