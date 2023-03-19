import './App.css';
import {LoginPage} from "./Pages/Login";
import {UserContext} from "./UserContext"
import {useEffect, useState} from "react";
import {Directories} from "./Pages/Directories";
import {Files} from "./Pages/Files";
import {ViewFile} from "./Pages/ViewFile";

function App() {
    const [token, setToken] = useState('')
    const [computer, setComputer] = useState('')
    const [date, setDate] = useState('')
    if (date) {
        return (
            <ViewFile token={token} name={computer} date={date}/>
        )
    } else {
        if (computer) {
            return (
                <Files token={token} computer={computer} setDate={setDate}/>
            )
        } else {
            if (token) {
                return (
                    <Directories token={token} setComputer={setComputer}/>
                )
            } else {
                return (
                    <UserContext.Provider
                        value={{
                            token: token,
                            setToken: setToken,
                            computer: computer,
                            setComputer: setComputer,
                            date: date,
                            setDate: setDate
                        }}>
                        <div className="App">
                            <LoginPage/>
                        </div>
                    </UserContext.Provider>
                );
            }
        }
    }
}

export default App;
