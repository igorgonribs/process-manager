import { FiCodesandbox, } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Header-title">
                    <FiCodesandbox size="128" />
                    <h2 className="Page-title-text">Bem Vindo User</h2>
                </div>
                <div className="Home-card-list">
                    <Link to="./processes/" className="Home-card-item Home-card-process">
                        Processos
                    </Link>
                    <Link to="./users" className="Home-card-item Home-card-user">
                        Usuários
                    </Link>
                    <Link to="./reports" className="Home-card-item Home-card-report">
                        Parecer
                    </Link>

                </div>
            </header>
        </div>
    );
}

export default Home;
