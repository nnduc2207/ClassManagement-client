import { useState } from "react"
import { useEffect } from "react"
import { Col, Container, Row, Card, Spinner } from "react-bootstrap"
import ClassList from "../ClassList/ClassList"

export default function Home({ user }) {
    const [classes, setClasses] = useState(null)

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER_API + `/user/${user.id}/getclasses`)
                const classesInfo = await response.json()
                setClasses(classesInfo)
            } catch (error) {
                alert(error.toString())
            }
        }
        getClasses()
    },[user.id])
    return (
        <div className="Home">
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        <Card>
                            <Card.Header as="h5">Class</Card.Header>
                            <Card.Body>
                                {classes ? <ClassList classes={classes} /> : <Spinner className="align-middle" animation="grow" />}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

