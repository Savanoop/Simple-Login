import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const th = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
}

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const tableRows = [];

        const { user, users } = this.props;

        users && users.items && users.items.map(_users => {
            tableRows.push(
                <tr>
                    <td style={th} title={_users.firstName}>
                        {_users.firstName}
                    </td>
                    <td style={th} title={_users.lastName}>
                        {_users.lastName}
                    </td>
                    <td style={th} title={_users.userName}>
                        {_users.username}
                    </td>
                </tr>
            )
        })

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table style={{
                        fontFamily: "arial",
                        borderCollapse: "collapse",
                        width: "100%"
                    }}>
                        <tr>
                            <th style={th}>First Name</th>
                            <th style={th}>Last Name</th>
                            <th style={th}> Username</th>
                        </tr>
                        {tableRows}
                    </table>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };