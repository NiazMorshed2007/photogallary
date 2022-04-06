import React, {FC, useEffect} from 'react';
import {gsap, Power2} from 'gsap';

const Auth: FC = () => {
    useEffect(() => {
        let tl = gsap.timeline();
        tl.fromTo('h1', {
           opacity: 0,
            duration: 4,
            y: 80,
            rotationX: 90,
            transformOrigin: '0% 50% -50%',
        }, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.3,
            ease: Power2.easeOut,
        }).fromTo('.right', {
            width: 0 + 'px',
            duration: 3,
        }, {
            width: 90 + '%',
            ease: Power2.easeOut,
        })
    }, [])
    return <section className='login vh-100 vw-100 d-flex'>
        <div className="left d-flex flex-column align-items-center justify-content-center p-5 h-100">
        <h1>Create the entire scene</h1>
            <h1 className='mx-5 px-5'>Simply!</h1>
            <h1 className='px-5'>—</h1>
        </div>
        <div className="right">

        <div className="blur-box"></div>
        </div>
    </section>
}

export default Auth;