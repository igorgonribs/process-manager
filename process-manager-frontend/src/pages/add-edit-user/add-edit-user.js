import { FiUserCheck } from 'react-icons/fi';
import './AddEditUser.css';

function AddEditUser() {
    return (
        <div className="AddEditUser">
            <header className="AddEditUser-header">
                <div className="AddEditUser-Header-title">
                    <FiUserCheck size="128" />
                    <h2 className="Page-title-text">Edição/Adição de usuários</h2>
                </div>
                <div className="AddEditUser-list">
                </div>
            </header>
        </div>
    );
}

export default AddEditUser;