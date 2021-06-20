import React from 'react';
import { FiCodesandbox, } from 'react-icons/fi';
import InputMask from "react-input-mask";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

import { saveUserSession, redirectByProfile, removeUserSession } from '../../utils/loginLogout';
import api from '../../services/api';
import './Login.css';

function Login() {

    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    const [fieldCpf, setFieldCpf] = React.useState("");
    const [fieldPassword, setFieldPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(removeUserSession, []);
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCpf = (event) => { setFieldCpf(event.target.value.replace(/\D/g, '')) }

    const handleChangePassword = (event) => { setFieldPassword(event.target.value) }

    const handleClickDone = () => {
        setLoading(true);
        api.get(`login/${fieldCpf}`).then(response => {
            setLoading(false);
            saveUserSession(response.data);
            history.push(redirectByProfile());
        })
        .catch(error => {
            setLoading(false);
            setOpen(true);
        })
    }

    const resolveLoading = () => {
        return loading;
    }

    const resolveDisabledDoneButton = () => {
        return !(fieldCpf && fieldPassword)
    }

    return (
        <>
            <div className="Login">
                <div className="Login-header">
                    <div className="Login-Header-title">
                        <FiCodesandbox size="128" />
                        <h2 className="Login-Page-title-text">Bem Vindo</h2>
                    </div>
                </div>
                <div className="Login-body">
                    <div className="Login-form">
                        <div className="Login-form-line-item">
                            <label for="cpf">CPF</label>
                            <InputMask mask="999.999.999-99" disabled={resolveLoading()} value={fieldCpf} onChange={handleChangeCpf} />
                        </div>

                        <div className="Login-form-line-item">
                            <label for="password">Senha</label>
                            <input name="password" maxLength="12" type="password" disabled={resolveLoading()} value={fieldPassword} onChange={handleChangePassword}></input>
                        </div>
                        {
                            loading ?
                                <CircularProgress style={{ alignSelf: 'center', marginBottom: 24 }} />
                                :
                                <Button variant="contained" color="primary" disabled={resolveDisabledDoneButton()} onClick={handleClickDone}>Entrar</Button>
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
                <DialogTitle id="alert-dialog-title">OPS...</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Não foi possível logar. Verifique seus dados e tente novamente.
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

export default Login;
