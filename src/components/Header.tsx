import React, {FC} from 'react';
import {BsUiRadiosGrid} from 'react-icons/bs';

const Header: FC = () => {
    return <header className="main-header shadow-sm d-flex align-items-center justify-content-between mt-2 pt-2 w-100">
        <h3>Media Library </h3>
        <div className="preview-option d-flex gap-2 align-items-center pointer">
            <BsUiRadiosGrid/>
            <span>Show Preview</span>
        </div>
    </header>
}

export default Header;