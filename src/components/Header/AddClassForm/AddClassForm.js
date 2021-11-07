import { useState } from "react"
import {
    Modal,
    Button,
    Form,
    Alert,
    Spinner,
} from "react-bootstrap"

export default function AddClassForm({ user, show, onHide }) {
    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const addHandle = async () => {
        setLoading(true)
        try {
            let response
            let data
            response = await fetch(process.env.REACT_APP_SERVER_API + `/class`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                }),
            })
            data = await response.json()
            console.log(data);
            // if (response.status === '404') {
            //     if (data.keyPattern.id) {
            //         throw 'Class ID has been used'
            //     }
            //     throw ''
            // }

            response = await fetch(process.env.REACT_APP_SERVER_API + `/user/addclass`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    classId: id,
                    teacherId: user.id,
                }),
            })
            data = await response.json()
            console.log(data);
            console.log(true);
            setLoading(false)

            setId(null)
            setName(null)
            return onHide()
        } catch (error) {
            if (error.toString() === 'TypeError: Failed to fetch') {
                return setErrorMsg("Can't connect to server")
            }

            return setErrorMsg(error.toString())
        }
    }

    const closeHandle = async () => {
        setId(null)
        setName(null)
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
                    Add new class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="AddClassForm.Id">
                        <Form.Label>Class ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ABC001"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="AddClassForm.Name">
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Toán Cao cấp 1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeHandle} variant="secondary">
                    Close
                </Button>
                <Button
                    onClick={!loading ? addHandle : null}
                    variant="primary"
                    disabled={loading}
                >
                    {loading ? <Spinner animation="grow" /> : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
