import "bootstrap/dist/css/bootstrap.min.css"
import { Redirect, Route, Switch } from "react-router"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import { useDispatch, useSelector } from "react-redux"
import DecisionRoute from "./components/hoc/DecisionRoute"
import { useEffect, useState } from "react"
import { getUser } from "./helper/auth"
import { LOGOUT } from "./store/actions"

function App() {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const [user, setUser] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const getUserInfo = async () => {
            if (!token) {
                setErrorMsg("Require login")
            }

            try {
                const result = await getUser(token)
                setUser(result)
            } catch (error) {
                dispatch({ type: LOGOUT })
                setErrorMsg(error)
            }
        }
        getUserInfo()
    }, [token])

    return (
        <div className="App">
            <Switch>
                <DecisionRoute
                    path="/login"
                    trueComponent={Login}
                    falseComponent={Home}
                    decision={user == null}
                />
                <DecisionRoute
                    path="/"
                    trueComponent={Home}
                    falseComponent={Login}
                    decision={user != null}
                />
            </Switch>
        </div>
    )
}

export default App
