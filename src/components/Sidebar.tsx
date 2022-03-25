import React, {FC, useEffect, useState} from 'react';
import {MdMotionPhotosOn} from 'react-icons/md';
import {BsArrowBarLeft} from 'react-icons/bs';
import {gsap, Power2, TweenMax} from "gsap";

const Sidebar: FC = () => {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        let tl = gsap.timeline({delay: 2});
        TweenMax.to('.loader > svg', {
            rotate: 360,
            repeat: -1,
            duration: 1,
            ease: Power2.easeOut,
        })
        tl.fromTo('.loader', 2, {
            width: 100 + 'vw',
            height: 100 + 'vh',
            opacity: 1,
            position: 'fixed',
            top: 0,
            left: 0,
        }, {
            top: 0,
            left: 4,
            onComplete: () => {
                setAnimated(true);
            },
            width: 25 + 'px',
            position: 'relative',
            height: 25 + 'px',
            ease: Power2.easeOut,
        }).fromTo('.loader > svg', {
            fontSize: '38px',
        }, {
            fontSize: '20px',
        }).fromTo('.logo-text', {
            opacity: 0,
            y: 20,
        }, {
            opacity: 1,
            y: 0,
            ease: Power2.easeOut,
        }).fromTo('.sidebar-navigator', {
            opacity: 0,
            x: 20,
        }, {
            opacity: 1,
            x: 0,
        }, '<')
    }, [])
    return <aside className={`sidebar shadow-sm p-3 pt-4`}>
        <header className='d-flex align-items-center justify-content-between'>
            <div className="d-flex logo-wrapper align-items-center gap-2 bg">
                <div
                    className={`loader ${animated ? "bg-transparent" : 'bg-black'} d-flex align-items-center justify-content-center`}>
                    <MdMotionPhotosOn/>
                </div>
                <h5 className='m-0 logo-text'>Gallery</h5>
            </div>
            <div className='pointer sidebar-navigator'>
                <BsArrowBarLeft/>
            </div>
        </header>
    </aside>
}

export default Sidebar;