import React from 'react';
import { FiSettings } from 'react-icons/fi';
import Select, { components } from 'react-select';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { resolveStatusColorByStatusId } from '../../utils/process-status';
import './Report.css';

const mockProcess = {
    name: "Processo Adicionado",
    status: "Cancelado",
    description: "Processo de teste - Adicionar, status Criado",
    expectedReportDate: "30/06/2021 11:30",
    users: [
        {
            id: 2
        }
    ],
    reports: [],
    createdBy: {
        id: 2
    }
}

function Report() {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentProcess, setCurrentProcess] = React.useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            setCurrentProcess(mockProcess);
        }, 3000);

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDone = () => {
        console.log("Clicou.");
        setLoading(true);
        setTimeout(() => {
            handleClickOpen();
            setLoading(false);
        }, 3000);
    }

    const resolveDisabled = () => {
        return loading;
    }

    return (
        <>
            <div className="Report">
                <div className="Report-header">
                    <div className="Report-Header-title">
                        <FiSettings size="128" />
                        <h2 className="Report-Page-title-text">Enviar Parecer</h2>
                    </div>
                </div>
                <div className="Report-body">

                    <div className="Report-form">
                        {
                            !currentProcess ?
                                <CircularProgress style={{ alignSelf: 'center', margin: 64 }} />
                                :
                                <>
                                    <div className="Report-form-line-item">
                                        <label><b>Processo:</b> {currentProcess.name}</label>

                                        <p className="Report-status-label" style={{ backgroundColor: resolveStatusColorByStatusId(currentProcess.status) }}>{currentProcess.status.toUpperCase()}</p>

                                    </div>
                                    <div className="Report-form-line">
                                        <label><b>Prazo para enviar parecer:</b> {currentProcess.expectedReportDate.split(" ")[0]} às {currentProcess.expectedReportDate.split(" ")[1]}</label>
                                    </div>
                                    <div className="Report-form-line">
                                        <label for="description"><b>Descrição:</b></label>
                                        <p style={{marginTop:0}}>{currentProcess.description}</p>
                                    </div>
                                    <div className="Report-form-line">
                                        <label for="report"><b>Parecer de Usuario logado:</b></label>
                                        <textarea name="report" maxLength="255" disabled={resolveDisabled()}></textarea>
                                    </div>
                                    <div className="Report-form-line">
                                        {
                                            loading ?
                                                <CircularProgress style={{ alignSelf: 'center' }} />
                                                :
                                                <Button variant="contained" color="primary" onClick={handleClickDone}>Enviar</Button>
                                        }
                                    </div>
                                </>
                        }
                    </div>

                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Pronto!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Parecer enviado!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Report;