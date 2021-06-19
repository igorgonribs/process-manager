import { FiUserCheck, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
                <Link to="/add-edit-user/add">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiPlusCircle />}
                        style={{ width: 140, marginBottom: 12 }}
                    >Adicionar</Button>
                </Link>
                <div className="Users-list">
                    <UserList />
                </div>
            </div>
        </div>
    );
}

export default Users;