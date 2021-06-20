import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import InputMask from "react-input-mask";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';


import AppMenu from '../../components/app-menu/app-menu';
import { operations } from './../../utils/operations';
import api from '../../services/api';
import './AddEditUser.css';

function AddEditUser() {

    let { operation, id } = useParams();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({ id: null, name: "", cpf: "", profile: { id: null } });

    const [fieldName, setFieldName] = React.useState("");
    const [fieldCpf, setFieldCpf] = React.useState("");
    const [fieldProfileId, setFieldProfileId] = React.useState(0);

    const [modalTitle, setModalTitle] = React.useState("");
    const [modalText, setModalText] = React.useState("");
    const [modalButtons, setModalButtons] = React.useState([]);

    const [currentOperation, setCurrentOperation] = React.useState(null);

    React.useEffect(() => {
        setCurrentOperation(operations.find(x => x.name == operation));
        if (id)
            api.get(`user/${id}`).then(response => {
                setCurrentUser(response.data);
                setFieldName(response.data.name);
                setFieldCpf(response.data.cpf);
                setFieldProfileId(response.data.profile.id);
                setLoading(false);
            })
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDone = () => {
        setLoading(true);
        const newUser = { id: currentUser.id, name: fieldName, cpf: fieldCpf, profile: { id: fieldProfileId } };
        if (currentUser.id != null)
            api.put(`user`, newUser).then(response => {
                console.log("Usuário atualizado");
                setCurrentUser(newUser);
                setLoading(false);
                setModalTitle("Pronto");
                setModalText("Usuário atualizado");
                setModalButtons(["VOLTAR"]);
                setOpen(true);
            })
                .catch(error => {
                    setModalTitle("OPS...");
                    setModalText("Ocorreu um erro...");
                    setModalButtons(["OK"]);
                    setOpen(true);
                    setLoading(false);
                });
        else
            api.post(`user`, newUser).then(response => {
                console.log("Usuário adicionado");
                setCurrentUser(newUser);
                setLoading(false);
                setModalTitle("Pronto");
                setModalText("Usuário adicionado");
                setModalButtons(["VOLTAR"]);
                setOpen(true);
            })
                .catch(error => {
                    setModalTitle("OPS...");
                    setModalText("Ocorreu um erro...");
                    setModalButtons(["OK"]);
                    setOpen(true);
                    setLoading(false);
                });
    }

    const resolveLoading = () => {
        return ((currentOperation && currentOperation.name == 'view') || loading);
    }

    const handleChangeName = (event) => {
        setFieldName(event.target.value);
    }

    const handleChangeCpf = (event) => {
        setFieldCpf(event.target.value.replace(/\D/g, ''));
    }

    const handleChangeProfile = (event) => {
        setFieldProfileId(event.target.value)
    }

    const resolveDisabledDoneButton = () => {
        return !(fieldName && fieldProfileId && fieldCpf && fieldCpf.length == 11)
    }

    return (
        <>
        <AppMenu pageName="Usuários" goBack={true}/>
            <div className="AddEditUser">
                <div className="AddEditUser-header">
                    <div className="AddEditUser-Header-title">
                        <FiUserPlus size="128" />
                        <h2 className="AddEditUser-Page-title-text">{currentOperation ? currentOperation.label : ""} Usuário</h2>
                    </div>
                </div>
                <div className="AddEditUser-body">
                    <div className="AddEditUser-form">
                        <div className="AddEditUser-form-line-item">
                            <label for="name">Nome</label>
                            <input name="name" maxLength="100" disabled={resolveLoading()} value={fieldName} onChange={handleChangeName}></input>
                        </div>
                        <div className="AddEditUser-form-line-item">
                            <label for="cpf">CPF</label>
                            <InputMask mask="999.999.999-99" disabled={resolveLoading()} value={fieldCpf} onChange={handleChangeCpf} />
                        </div>
                        <div className="AddEditUser-form-line-item">
                            <label for="role">Função</label>
                            <select name="role" disabled={resolveLoading()} value={fieldProfileId} onChange={handleChangeProfile}>
                                <option value="0">Selecione...</option>
                                <option value="1">Administrador</option>
                                <option value="2">Triador</option>
                                <option value="3">Operador</option>
                            </select>
                        </div>
                        <div className="AddEditUser-form-line-item">
                            {
                                loading ?
                                    <CircularProgress style={{ alignSelf: 'center' }} />
                                    :
                                    <Button variant="contained" color="primary" disabled={resolveDisabledDoneButton()} onClick={handleClickDone}>Concluir</Button>
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

export default AddEditUser;