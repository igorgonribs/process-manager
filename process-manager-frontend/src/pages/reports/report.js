import React from 'react';
import { FiSettings } from 'react-icons/fi';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../services/api';
import AppMenu from '../../components/app-menu/app-menu';
import { resolveStatusColorByStatusId, resolveStatusIdByStatusName } from '../../utils/process-status';
import { convertBackenddateToJavascriptDate } from '../../utils/date';
import { getUserLogged } from '../../utils/loginLogout';
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

    let { id } = useParams();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentProcess, setCurrentProcess] = React.useState(null);

    // Campos
    const [fieldName, setFieldName] = React.useState("");
    const [fieldDeadline, setFieldDeadline] = React.useState(new Date());
    const [fieldResponsibles, setFieldResponsibles] = React.useState([]);
    const [fieldDescription, setFieldDescription] = React.useState("");
    const [fieldStatus, setFieldStatus] = React.useState(1);

    // Modal
    const [modalTitle, setModalTitle] = React.useState("");
    const [modalText, setModalText] = React.useState("");
    const [modalButtons, setModalButtons] = React.useState([]);

    React.useEffect(() => {
        if (id)
            api.get(`process/${id}`).then(response => {
                setCurrentProcess(response.data);
                setFieldName(response.data.name);
                setFieldDeadline(convertBackenddateToJavascriptDate(response.data.expectedReportDate));
                setFieldStatus(resolveStatusIdByStatusName(response.data.status));
                setLoading(false);
            })
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDone = () => {
        setLoading(true);

        let newReport = { description: fieldDescription, writerId: getUserLogged().id, processId: currentProcess.id }
        api.post("report", newReport).then(response => {
            setModalTitle("Pronto");
            setModalText("Report enviado");
            setModalButtons(["VOLTAR"]);
            setOpen(true);
            setLoading(false);
        }).catch(error => {
            setModalTitle("OPS...");
            setModalText("Ocorreu um erro...");
            setModalButtons(["OK"]);
            setOpen(true);
            setLoading(false);
        });
    }

    const resolveDisabled = () => {
        return loading;
    }

    const handleChangeDescription = event => {
        setFieldDescription(event.target.value);
    }

    const resolveButtonDoneDisabled = () => {
        return !(fieldDescription);
    }

    return (
        <>
        <AppMenu pageName="Parecer" goBack={true}/>
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
                                        <p style={{ marginTop: 0 }}>{currentProcess.description}</p>
                                    </div>
                                    <div className="Report-form-line">
                                        <label for="report"><b>Parecer de {getUserLogged().name}:</b></label>
                                        <textarea name="report" maxLength="255" disabled={resolveDisabled()} onChange={handleChangeDescription} value={fieldDescription}></textarea>
                                    </div>
                                    <div className="Report-form-line">
                                        {
                                            loading ?
                                                <CircularProgress style={{ alignSelf: 'center' }} />
                                                :
                                                <Button variant="contained" color="primary" onClick={handleClickDone} disabled={resolveButtonDoneDisabled()}>Enviar</Button>
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
                <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        modalButtons.map(button => (
                            <Button onClick={() => {
                                if (button == "VOLTAR")
                                    history.goBack();

                                handleClose();
                            }} color="primary">
                                {button}
                            </Button>
                        )
                        )
                    }
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Report;