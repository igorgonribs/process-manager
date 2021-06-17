import { FiUserCheck, } from 'react-icons/fi';
import './Users.css';

function Users() {
    return (
        <div className="Users">
            <header className="Users-header">
                <div className="Header-title">
                    <FiUserCheck size="128" />
                    <h2 className="Page-title-text">Página de usuários</h2>
                </div>
                <div className="Users-card-list">

                </div>
            </header>
        </div>
    );
}

export default Users;