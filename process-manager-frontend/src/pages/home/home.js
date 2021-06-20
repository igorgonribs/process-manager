import { FiCodesandbox, } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AppMenu from '../../components/app-menu/app-menu';
import './Home.css';

function Home() {
    return (
        <>
        <AppMenu pageName="Home"/>
        <div className="Home">
            <header className="Home-header">
                <div className="Home-Header-title">
                    <FiCodesandbox size="128" />
                    <h2 className="Home-Page-title-text">Bem Vindo User</h2>
                </div>
                <div className="Home-card-list">
                    <Link to="./processes/" className="Home-card-item Home-card-process">
                        Processos
                    </Link>
                    <Link to="./users" className="Home-card-item Home-card-user">
                        Usuários
                    </Link>
                    <Link to="./process/report" className="Home-card-item Home-card-report">
                        Parecer
                    </Link>

                </div>
            </header>
        </div>
        </>
    );
}

export default Home;
