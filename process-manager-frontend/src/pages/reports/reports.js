import { FiPaperclip, } from 'react-icons/fi';
import './Reports.css';

function Reports() {
    return (
        <div className="Reports">
            <header className="Reports-header">
                <div className="Reports-Header-title">
                    <FiPaperclip size="128" />
                    <h2 className="Reports-Page-title-text">Página de Pareceres</h2>
                </div>
                <div className="Reports-card-list">

                </div>
            </header>
        </div>
    );
}

export default Reports;