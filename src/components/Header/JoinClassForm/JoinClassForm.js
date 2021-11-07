import { useState } from "react"
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap"

export default function JoinClassForm({ user, show, onHide }) {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const joinClassHandle = async () => {
        setLoading(true)
        try {
            let response
            let data
            response = await fetch(
                process.env.REACT_APP_SERVER_API + `/user/joinclass/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                }
            )
            data = await response.json()
            if (response.status === 404) {
                if (data.keyPattern?.id) {
                    throw "Class ID has been used"
                }
                throw data.error
            }

            setToken(null)
            setLoading(false)
            return onHide()
        } catch (error) {
            setLoading(false)
            
            if (error.toString() === "TypeError: Failed to fetch") {
                return setErrorMsg("Can't connect to server")
            }

            if (error.toString() === "SyntaxError: Unexpected token < in JSON at position 0") {
                return setErrorMsg("Invite code not exist")
            }

            return setErrorMsg(error.toString())
        }
    }

    const closeHandle = async () => {
        setToken(null)
        return onHide()
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join a class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="AddClassForm.Id">
                        <Form.Label>Invite Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Write code here ..."
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeHandle} variant="secondary">
                    Close
                </Button>
                <Button
                    onClick={!loading ? joinClassHandle : null}
                    variant="primary"
                    disabled={loading}
                >
                    {loading ? <Spinner animation="grow" /> : "Join"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
