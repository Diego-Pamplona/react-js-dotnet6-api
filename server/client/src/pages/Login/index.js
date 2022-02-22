import React from 'react';
import './styles.css';

import logoimage from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoimage} alt="Erudio Logo"/>
                <form>
                    <h1>Acess your account</h1>
                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            <img src={padlock} alt="Login"/>
        </div>
    )
}