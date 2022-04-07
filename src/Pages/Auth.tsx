import React, {FC, useEffect} from 'react';
import {gsap, Power2} from 'gsap';
import {FcGoogle} from "react-icons/fc";

const Auth: FC = () => {
    const demo_arr: string[] =
        ["https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=405&q=80",
            "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=899&q=80"
            , "https://images.unsplash.com/photo-1568751302461-fc6f40fa9382?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ]
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
            stagger: 0.5,
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
        <div className="left d-flex flex-column align-items-center justify-content-center position-relative p-5 h-100">
            <h1>Create the entire scene</h1>
            <h1 className='mx-5 px-5'>Simply!</h1>
            <h1 className='px-5'>—</h1>
            <div className="img-wrapper position-absolute">
                {/*{demo_arr.map((pic, i) => (*/}
                {/*    <img src={pic} key={i} className='shadow position-absolute' alt=""/>*/}
                {/*))}*/}
            </div>
        </div>
        <div className="right d-flex flex-column align-items-center justify-content-center">
            <h2>Sign In</h2>
            {/*<div className="icons pt-3 d-flex align-items-center gap-4">*/}
            {/*    <i>*/}
            {/*    <FcGoogle />*/}
            {/*    </i>*/}
            {/*    <i>*/}
            {/*        */}
            {/*    </i>*/}
            {/*</div>*/}
            <div className="blur-box">
                <form>
                    <label htmlFor="email">
                        <input type="text"/>
                        <span className='absolute'>Email</span>
                    </label>
                    <label htmlFor="password">
                        <input type="text"/>
                        <span className='absolute'>Password</span>
                    </label>
                </form>
            </div>
        </div>
    </section>
}

export default Auth;