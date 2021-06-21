import { FiSettings } from 'react-icons/fi';

import ProcessList from './../../components/process-list/process-list';
import AppMenu from '../../components/app-menu/app-menu';
import './Processes.css';

function Processes() {
    return (
        <>
        <AppMenu pageName="Processos" addButtonLink="/add-edit-process/add"/>
        <div className="Processes">
            <div className="Processes-header">
                <div className="Processes-Header-title">
                    <FiSettings size="128" />
                    <h2 className="Processes-Page-title-text">Gerenciar Processos</h2>
                </div>
            </div>
            <div className="Processes-body">
                <div className="Processes-list">
                    <ProcessList />
                </div>
            </div>
        </div>
        </>
    );
}

export default Processes;