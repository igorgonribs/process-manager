import { FiSettings, } from 'react-icons/fi';

import ProcessList from './../../components/process-list/process-list';
import './Processes.css';

function Processes() {
    return (
        <div className="Processes">
            <div className="Processes-header">
                <div className="Processes-Header-title">
                    <FiSettings size="128" />
                    <h2 className="Processes-Page-title-text">Gerenciar processos</h2>
                </div>
            </div>
            <div className="Processes-body">
                <div className="Processes-list">
                    <ProcessList />
                </div>
            </div>
        </div>
    );
}

export default Processes;