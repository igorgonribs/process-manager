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
import { useParams, useHistory } from 'react-router-dom';

import { operations } from './../../utils/operations';
import { convertJavascriptDateToBackendDate, convertBackenddateToJavascriptDate } from '../../utils/date';
import { resolveStatusIdByStatusName, resolveStatusNameByStatusId } from '../../utils/process-status';
import { getUserLogged } from '../../utils/loginLogout';
import AppMenu from '../../components/app-menu/app-menu';
import api from '../../services/api';
import './AddEditProcess.css';

function arrayMove(array, from, to) {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}

const SortableMultiValue = SortableElement(props => {
    const onMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle(props => (
    <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);


function AddEditProcess() {

    let { operation, id } = useParams();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentOperation, setCurrentOperation] = React.useState(null);
    const [userOperatorList, setUserOperatorList] = React.useState([]);
    const [currentProcess, setCurrentProcess] = React.useState({});

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

    // Configura operação [add, edit, view]
    React.useEffect(() => {
        setCurrentOperation(operations.find(x => x.name == operation));
        if (id)
            api.get(`process/${id}`).then(response => {
                setCurrentProcess(response.data);
                setFieldName(response.data.name);
                setFieldDeadline(convertBackenddateToJavascriptDate(response.data.expectedReportDate));
                setFieldDescription(response.data.description);
                setFieldStatus(resolveStatusIdByStatusName(response.data.status));
                setFieldResponsibles(response.data.users.map(x => { return { value: x.id.toString(), label: x.name } }));
                setLoading(false);
            })
    }, []);

    // Busca usuários operadores
    React.useEffect(() => {
        api.get("user/operators").then(response => {
            const usersList = response.data.map(x => { return { value: x.id.toString(), label: x.name } });
            setUserOperatorList(usersList);
        }
        )
    }, []);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(fieldResponsibles, oldIndex, newIndex);
        setFieldResponsibles(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDone = () => {
        setLoading(true);

        const newProcess = {
            id: currentProcess.id,
            name: fieldName,
            description: fieldDescription,
            expectedReportDate: convertJavascriptDateToBackendDate(fieldDeadline),
            users: fieldResponsibles.map(x => { return { id: x.value } })
        };

        if (currentProcess.id != null) {
            newProcess.status = resolveStatusNameByStatusId(fieldStatus);
            api.put("process", newProcess).then(response => {
                setModalTitle("Pronto");
                setModalText("Processo atualizado");
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
        } else {
            newProcess.createdBy = { id: getUserLogged().id };
            api.post("process", newProcess).then(response => {
                setModalTitle("Pronto");
                setModalText("Processo criado");
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
    }

    const handleChangeName = event => {
        setFieldName(event.target.value);
    }
    const handleChangeDeadline = event => {
        setFieldDeadline(event.target.value);
    }
    const handleChangeResponsibles = selectedOptions => {
        setFieldResponsibles(selectedOptions);
    }
    const handleChangeDescription = event => {
        setFieldDescription(event.target.value);
    }
    const handleChangeStatus = event => {
        setFieldStatus(event.target.value);
    }

    const resolveDisabled = () => {
        return ((currentOperation && currentOperation.name == 'view') || loading);
    }

    const resolveButtonDoneDisabled = () => {
        if (currentOperation && currentOperation.name == 'view')
            return true;

        return !(fieldName && fieldDeadline && fieldDescription && fieldResponsibles && fieldResponsibles.length > 0 && fieldStatus && fieldStatus != 0);
    }

    const resolveSelectStatus = () => {
        if (currentOperation && currentOperation.name == "add")
            return;
        else return (
            <div className="AddEditProcess-form-line-item">
                <label for="status">Status</label>
                <select name="status" disabled={resolveDisabled()} onChange={handleChangeStatus} value={fieldStatus}>
                    <option value="1">Criado</option>
                    <option value="2">Executando processo</option>
                    <option value="3">Aguardando Parecer</option>
                    <option value="4">Sucesso</option>
                    <option value="5">Insucesso</option>
                    <option value="6">Cancelado</option>
                </select>
            </div>
        )
    }

    return (
        <>
            <AppMenu pageName="Processos" goBack={true}/>
            <div className="AddEditProcess">
                <div className="AddEditProcess-header">
                    <div className="AddEditProcess-Header-title">
                        <FiSettings size="128" />
                        <h2 className="AddEditProcess-Page-title-text">{currentOperation ? currentOperation.label : ""} Processo</h2>
                    </div>
                </div>
                <div className="AddEditProcess-body">
                    <div className="AddEditProcess-form">
                        <div className="AddEditProcess-form-line-item">
                            <label for="name">Nome</label>
                            <input name="name" maxLength="100" disabled={resolveDisabled()} onChange={handleChangeName} value={fieldName}></input>
                        </div>
                        {
                            resolveSelectStatus()
                        }
                        <div className="AddEditProcess-form-line-item">
                            <label for="deadline">Deadline</label>
                            <input id="deadline" type="datetime-local" disabled={resolveDisabled()} onChange={handleChangeDeadline} value={fieldDeadline} />
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            <label for="role">Reponsáveis</label>
                            <SortableSelect
                                className="AddEditProcess-select-users"
                                useDragHandle
                                axis="xy"
                                onSortEnd={onSortEnd}
                                distance={4}
                                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                                isMulti
                                options={userOperatorList}
                                value={fieldResponsibles}
                                onChange={handleChangeResponsibles}
                                components={{
                                    MultiValue: SortableMultiValue,
                                    MultiValueLabel: SortableMultiValueLabel,
                                }}
                                closeMenuOnSelect={false}

                            />
                        </div>

                        {
                            currentProcess.reports ?
                                currentProcess.reports.map(report => (
                                    <div className="AddEditProcess-form-line-item">
                                        <label><b>Report de {report.writer.name}</b></label>
                                        <p>{report.description}</p>
                                    </div>
                                )) : null
                        }

                        <div className="AddEditProcess-form-line-item">
                            <label for="description">Descrição</label>
                            <textarea name="description" rows="4" cols="50" maxLength="400" disabled={resolveDisabled()} onChange={handleChangeDescription} value={fieldDescription}></textarea>
                        </div>
                        <div className="AddEditProcess-form-line-item">
                            {
                                loading ?
                                    <CircularProgress style={{ alignSelf: 'center' }} />
                                    :
                                    <Button variant="contained" color="primary" disabled={resolveButtonDoneDisabled()} onClick={handleClickDone}>Concluir</Button>
                            }
                        </div>
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

export default AddEditProcess;