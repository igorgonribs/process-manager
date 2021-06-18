import { FiUserCheck } from 'react-icons/fi';
import UserList from './../../components/user-list/user-list';
import './Users.css';

function Users() {
    return (
        <div className="Users">
            <div className="Users-header">
                <div className="Users-Header-title">
                    <FiUserCheck size="128" />
                    <h2 className="Users-Page-title-text">Gerenciar usuários</h2>
                </div>
            </div>
            <div className="Users-body">
                <div className="Users-list">
                    <UserList />
                </div>
            </div>
        </div>
    );
}

export default Users;