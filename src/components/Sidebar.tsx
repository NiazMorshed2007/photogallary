import React, {FC} from 'react';
import {MdMotionPhotosOn} from 'react-icons/md';
import {BsArrowBarLeft} from 'react-icons/bs';

const Sidebar: FC = () => {

    return <aside className={`sidebar p-3 pt-4`}>
        <header className='d-flex align-items-center justify-content-between'>
            <div className="d-flex logo-wrapper align-items-center gap-2 bg">
                    <div
                        className={`loader d-flex align-items-center justify-content-center`}>
                        <MdMotionPhotosOn/>
                    </div>
                <h5 className='m-0 logo-text'>Gallery</h5>
            </div>
            <div className='pointer sidebar-navigator'>
                <BsArrowBarLeft/>
            </div>
        </header>
        {/*<Button variant="contained" color='warning'>click</Button>*/}
    </aside>
}

export default Sidebar;