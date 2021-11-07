import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { LOGOUT } from "../../store/actions"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { FaUserAlt } from "react-icons/fa"
import "./Header.css"
import AddClassForm from "./AddClassForm/AddClassForm"
import { useState } from "react"
import JoinClassForm from "./JoinClassForm/JoinClassForm"

export default function Header({ user }) {
    const history = useHistory()
    const dispath = useDispatch()
    const [isShowAddClassForm, setIsShowAddClassForm] = useState(false)
    const [isShowJoinClassForm, setIsShowJoinClassForm] = useState(false)

    const logoutHandle = () => {
        dispath({ type: LOGOUT })
        return history.push("/login")
    }

    const addClassHandle = () => {
        setIsShowAddClassForm(true)
    }

    const joinClassHandle = () => {
        setIsShowJoinClassForm(true)
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="Header flex">
                <Container>
                    <Navbar.Brand href="/">Class Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-none d-md-flex">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/class">Class</Nav.Link>
                            <Nav.Link onClick={joinClassHandle}>
                                Join Class
                            </Nav.Link>
                            {!user.isStudent && (
                                <Nav.Link onClick={addClassHandle}>
                                    Add Class
                                </Nav.Link>
                            )}
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown
                                className="justify-content-end"
                                title={<FaUserAlt />}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>
                                    Hello, {user.name}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/me/info">
                                    My info
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandle}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <AddClassForm
                user={user}
                show={isShowAddClassForm}
                onHide={() => setIsShowAddClassForm(false)}
            />

            <JoinClassForm
                user={user}
                show={isShowJoinClassForm}
                onHide={() => setIsShowJoinClassForm(false)}
            />
        </>
    )
}
