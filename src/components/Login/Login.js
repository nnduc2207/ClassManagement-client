import LoginForm from "./LoginForm/LoginForm"
import "./Login.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { login } from "../../helper/auth"
import { LOGIN } from "../../store/actions"
import { Alert } from "react-bootstrap"

function Login(props) {
    const token = useSelector(state => state.token)
    const history = useHistory()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    useEffect(() => {
        if (token) {
            return history.push('/')
        }
        
        if (props.location.state?.errorMsg) {
            setError(props.location.state?.errorMsg.toString())
        }
    }, [props.location.state?.errorMsg])
    
    const loginHandle = async (email, password) => {
        try {
            const result = await login({ email, password })
            dispatch({type: LOGIN, token: result})
            history.push('/')
        } catch (err) {
            if (err.toString() === 'TypeError: Failed to fetch') {
                return setError("Can't connect to server")
            }
            return setError(err.toString())
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
