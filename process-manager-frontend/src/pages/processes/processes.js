import { FiSettings, } from 'react-icons/fi';
import './Processes.css';

function Processes() {
    return (
        <div className="Processes">
            <header className="Processes-header">
                <div className="Header-title">
                    <FiSettings size="128" />
                    <h2 className="Page-title-text">Página de Processos</h2>
                </div>
                <div className="Processes-card-list">

                </div>
            </header>
        </div>
    );
}

export default Processes;