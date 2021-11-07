import { useState } from "react"
import { useEffect } from "react"
import { Alert, Card, Spinner } from "react-bootstrap"
import { ImUser } from "react-icons/im"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { IoCopyOutline } from "react-icons/io5"
import "./ClassItem.css"
import { Modal } from "react-bootstrap"

export default function ClassItem({ classroom }) {
    const [name, setName] = useState(null)
    const [teachers, setTeachers] = useState(null)
    const [studentCount, setStudentCount] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const getClassInfo = async () => {
            try {
                let response
                let info
                response = await fetch(
                    process.env.REACT_APP_SERVER_API +
                        `/class/${classroom.classId}`
                )
                info = await response.json()
                setName(info.id + "-" + info.name)
                response = await fetch(
                    process.env.REACT_APP_SERVER_API +
                        `/class/${classroom.classId}/getstudents`
                )
                info = await response.json()
                setStudentCount(info.length)
                response = await fetch(
                    process.env.REACT_APP_SERVER_API +
                        `/class/${classroom.classId}/getteachers`
                )
                info = await response.json()
                setTeachers(info)
            } catch (error) {
                alert(error.toString())
            }
        }
        getClassInfo()
    }, [])

    const inviteClickHandle = async () => {
        setShow(true)
        const response = await fetch(
            process.env.REACT_APP_SERVER_API +
                `/class/${classroom.classId}/invitedtoken`
        )
        const token = await response.json()
        navigator.clipboard.writeText(token || '')
        setTimeout(() => {
            setShow(false)
        }, 1000)
    }

    return (
        <>
            <Modal show={show}>
                <Alert variant="success">
                    <IoCopyOutline />
                    Invite code copied!
                </Alert>
            </Modal>
            <Card>
                <Card.Header as="h5">
                    {name}
                    <BsFillPersonPlusFill
                        className="float-end"
                        onClick={inviteClickHandle}
                    />
                </Card.Header>
                <Card.Body>
                    <ul>
                        <li>
                            <strong>Students:</strong>{" "}
                            {studentCount || <Spinner animation="grow" />}
                        </li>
                        <li>
                            <strong>Teachers:</strong>
                            {teachers ? (
                                <ul>
                                    {teachers.map((teacher) => (
                                        <li key={teacher.id}>
                                            {" "}
                                            <ImUser /> {teacher.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Spinner animation="grow" />
                            )}
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </>
    )
}
