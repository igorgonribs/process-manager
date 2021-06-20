import { FiUserCheck } from 'react-icons/fi';

import UserList from './../../components/user-list/user-list';
import AppMenu from '../../components/app-menu/app-menu';
import './Users.css';

function Users() {

    return (
        <>
        <AppMenu pageName="Usuários" addButtonLink="/add-edit-user/add"/>
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
        </>
    );
}

export default Users;