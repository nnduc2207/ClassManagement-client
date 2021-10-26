import { Route } from "react-router"

function DecisionRoute({
    trueComponent,
    falseComponent,
    decision,
    ...rest
}) {
    return (
        <Route
            {...rest}
            component={decision ? trueComponent : falseComponent}
        />
    )
}

export default DecisionRoute
