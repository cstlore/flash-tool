import React, {useContext, useState} from "react";
import {UserContext} from "../UserContext";

export const LoginPage = () => {
    const user = useContext(UserContext)
    const [token, setToken] = useState('')
    const [pass, setPass] = useState('')
    const send = () => {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                password: pass
            })
        }).then((res) => {
            if (res.ok) {
                user.setToken(token)
            }
        })
    }
    return (
        <div>
            <p className="MainText">Login by token</p>
            <div className="block">
                <p className="txt">Token Field</p>
                <input type="text" className="token" onChange={(event) => {
                    setToken(event.target.value)
                }}/>
                <p className="txt">Password Field</p>
                <input type="password" className="token" onChange={(event) => {
                    setPass(event.target.value)
                }}/>
                <button className="snd" onClick={() => send()}>Login</button>
            </div>
        </div>
    )
}