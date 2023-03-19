import React, {useEffect, useState} from "react";
import ComputerIcon from "../icons8-monitor-50.png"
import PencilIcon from "../icons8-pencil-drawing-24.png"

export const Directories = ({token, setComputer}) => {
    const [dirs, setDirs] = useState([])
    const [flag, setFlag] = useState('')
    useEffect(() => {
        fetch('http://localhost:3000/get_all_files', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
            })
        }).then(async (res) => {
            setDirs(JSON.parse(await res.text()).ret)
        })
    }, [])
    const new_name = (val, nw, key) => {
        if (key === 'Enter') {
            fetch('http://localhost:3000/rename', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    last: val,
                    nw: nw
                })
            }).then(async (res) => {
                setDirs(JSON.parse(await res.text()).ret)
            })
        }
    }
    return (
        <div className="trl">
            <p className="MainText2">All Computers</p>
            {dirs.map((val) => {
                return (
                    <div className="block2">
                        <img className="Icon" src={ComputerIcon} onClick={() => {
                            setComputer(val)
                        }}/>
                        {(flag === '' || flag !== val) ? <p className="txt2" onClick={() => {
                                setComputer(val)
                            }}>{val}</p> :
                            <input type="text" className="token2" onKeyDown={(event) => {
                                new_name(val, event.target.value, event.key)
                            }}/>
                        }
                        <img className="Icon2" src={PencilIcon} onClick={() => {
                            setFlag(val)
                        }}/>
                    </div>
                )
            })}
            <div className="All" onClick={() => {
                setFlag('')
            }}/>
        </div>
    )
}