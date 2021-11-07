import { ListGroup } from "react-bootstrap"
import ClassItem from "./ClassItem/ClassItem"

export default function ClassList({ classes }) {
    return (
        <ListGroup variant="flush">
            {classes.map((e) => (
                <ListGroup.Item>
                    <ClassItem classroom={e} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
