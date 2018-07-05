import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function (Component) {
    class Authenticate extends Component {
        
        componentWillMount() {
            if (!this.props.user.isAuthenticated()) {
                this.context.router.history.push('/login')
            }
        }
        render () {
            return(
            <Component {...this.props} />
            )
        }   
    }
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    const mapStateToProps = state => {
        return {
            user: state.auth.user
        }
    };

    return connect(
        mapStateToProps,
    )(Authenticate)
}