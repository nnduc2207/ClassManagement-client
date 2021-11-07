import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from '../../helper/auth';
import { LOGOUT } from '../../store/actions';

export default function AuthRequired(ComposedComponent) {
    const history = useHistory()
    class Authentication extends Component {

        state = {
            user: null
        }

        getUserInfo = async () => {
            if (!this.props.token) {
                return history.push({
                    pathname: '/login',
                    state: {errorMsg: 'Require login'}
                });
            }

            try {
                const result = await getUser(this.props.token)
                return this.setState({ user: result })
            } catch (error) {
                this.props.logout()
                return history.push({
                    pathname: '/login',
                    state: {errorMsg: 'Expired login'}
                });
            }
        }

        componentWillMount() {
            this.getUserInfo()
        }

        componentWillUpdate(nextProps) {
            if (this.props.token !== nextProps.token) {
                this.getUserInfo()
            }
        }

        render() {
            return this.state.user ? <ComposedComponent user={this.state.user} /> : <Spinner animation="grow" />
        }
    }

    const mapStateToProps = (state) => {
        return { token: state.token };
    }

    const mapDispathToProps = (dispath) => {
        return {
            logout: () => dispath({ type: LOGOUT })
        }
    }

    return connect(mapStateToProps, mapDispathToProps)(Authentication);
}