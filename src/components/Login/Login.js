import LoginForm from "./LoginForm/LoginForm"
import "./Login.css"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { login } from "../../helper/auth"
import { LOGIN } from "../../store/actions"
import { Alert } from "react-bootstrap"

function Login({ errorMsg }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [error, setError] = useState(errorMsg)

    const loginHandle = async (email, password) => {
        try {
            const result = await login({ email, password })
            dispatch({type: LOGIN, token: result})
            history.push('/')
        } catch (err) {
            setError(err.toString())
        }
    }
    return (
        <div className="Login">
            {error && <Alert variant="danger">{error}</Alert>}
            {<LoginForm loginHandle={loginHandle} />}
        </div>
    )
}

export default Login
