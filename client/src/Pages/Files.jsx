import React from "react";
import {useState} from "react";
import ComputerIcon from "../icons8-проводник-windows-48.png";
import {useEffect} from "react";

export const Files = ({token, computer, setDate}) => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/get_dir', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                name: computer
            })
        }).then(async (res) => {
            setFiles(JSON.parse(await res.text()).ret)
        })
    }, [])
    return (
        <div className="trl">
            <p className="MainText2">Files from computer: {computer}</p>
            {files.map((val) => {
                return (
                    <div className="block2" onClick={() => {
                        setDate(val)
                    }}>
                        <img className="Icon" src={ComputerIcon}/>
                        <p className="txt2">{val}</p>
                    </div>
                )
            })}
        </div>
    )
}