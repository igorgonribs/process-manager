import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ProcessList from './../../components/process-list/process-list';
import './Processes.css';

function Processes() {
    return (
        <div className="Processes">
            <div className="Processes-header">
                <div className="Processes-Header-title">
                    <FiSettings size="128" />
                    <h2 className="Processes-Page-title-text">Gerenciar Processos</h2>
                </div>
            </div>
            <div className="Processes-body">
                <Link to="/add-edit-process/add">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiPlusCircle />}
                        style={{ width: 140, marginBottom: 12 }}
                    >Adicionar</Button>
                </Link>
                <div className="Processes-list">
                    <ProcessList />
                </div>
            </div>
        </div>
    );
}

export default Processes;