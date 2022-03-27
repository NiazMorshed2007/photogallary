import React, {FC} from 'react';
import {BsUiRadiosGrid} from 'react-icons/bs';
import {HiOutlinePlusSm} from 'react-icons/hi';

const Header: FC = () => {
    return <header className="main-header px-5 pb-2 mt-2 w-100">
        <div className="upper d-flex align-items-center justify-content-between">
            <h2 className='header-title'>Media Library </h2>
            <div className="actions d-flex gap-3 align-items-center">
                <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
                    <BsUiRadiosGrid/>
                    <span>Show Preview</span>
                </div>
                <div className="add-new-dir btn-header preview-option d-flex gap-1 align-items-center pointer">
                    <HiOutlinePlusSm/>
                    <span>Add new</span>
                </div>
            </div>
        </div>
        <div className="down pt-2">
            <span className='total__albums'>24 Albums of photos</span>
        </div>
    </header>
}

export default Header;