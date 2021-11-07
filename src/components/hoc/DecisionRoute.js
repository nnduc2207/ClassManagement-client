import { Route } from "react-router"

function DecisionRoute({
    path,
    falsePath,
    TrueComponent,
    FalseComponent,
    decision,
    trueProps,
    falseProps,
    ...rest
}) {
    const render = () => {
        if (decision) {
            return (
                <Route
                    path={path}
                    render={() => <TrueComponent {...trueProps} />}
                    {...rest}
                />
            )
        }
        return (
            <Route
                path={falsePath}
                render={() => <FalseComponent {...falseProps} />}
                {...rest}
            />
        )
    }

    return render()
}

export default DecisionRoute
