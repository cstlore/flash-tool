import React, {useState} from "react";
import {useEffect} from "react";

export const ViewFile = ({token, name, date}) => {
    const [text, setText] = useState('')
    useEffect(() => {
        fetch('http://localhost:3000/get_text', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                name: name,
                date: date
            })
        }).then(async (res) => {
            setText(JSON.parse(await res.text()).ret)
        })
    }, [])
    return (
        <div>
            <p className="MainText2">File: {date}</p>
            <div className="block3">
                <p className="txt3">{text}</p>
            </div>
        </div>
    )
}