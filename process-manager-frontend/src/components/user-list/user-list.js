import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import { FiEdit, FiTrash, FiUserCheck } from 'react-icons/fi';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../services/api';
import './UserList.css';

export default function UserList() {

    const [open, setOpen] = React.useState(false);
    const [usersList, setUsersList] = React.useState(null);
    const [modalTitle, setModalTitle] = React.useState("Deletar Usuário?");
    const [modalText, setModalText] = React.useState("Tem certeza de que deseja deletar este usuário?");
    const [modalButtons, setModalButtons] = React.useState(["SIM", "NÃO"]);
    const [userToDelete, setUserToDelete] = React.useState({});

    React.useEffect(() => {

        api.get('user').then(response => {
            setUsersList(response.data)
        }).catch(error => {
            setUsersList([]);
        });
    }, []);

    const handleClickOpenDelete = () => {
        setModalTitle("Deletar Usuário?");
        setModalText("Tem certeza de que deseja deletar este usuário?");
        setModalButtons(["SIM", "NÃO"]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUser = () => {
        api.delete(`user/${userToDelete.id}`).then(response => {
            const newUserList = usersList.filter(x => x.id != userToDelete.id);
            setUsersList(newUserList);
            setUserToDelete({});
        }).catch(error => {
            setModalTitle("OPS...");
            setModalText(error.response.data);
            setModalButtons(["OK"]);
            setOpen(true);
        });
    }

    const resolveWhatDisplay = () => {
        if (!usersList)
            return (<CircularProgress style={{ alignSelf: 'center', margin: 64 }} />);
        else if (usersList.length == 0)
            return (<p>Não há usuários.</p>);
        else
            return (
                <List >
                    {usersList.map((user) => {

                        return (
                            <>
                                <ListItem key={user.id} role={undefined} dense button style={{ paddingLeft: 40 }}>
                                    <div className="UserList-list-item-header">
                                        <ListItemIcon>
                                            <FiUserCheck />
                                        </ListItemIcon>

                                    </div>

                                    <div>
                                        <p className="UserList-item-text" >{user.name}</p>
                                        <p className="UserList-item-subtext">{user.profile.description}</p>
                                        <p className="UserList-item-subtext">{user.cpf}</p>
                                    </div>

                                    <ListItemSecondaryAction>
                                        <Link to={`/add-edit-user/edit/${user.id}`}>
                                            <Fab color="secondary" aria-label="edit" size="medium" >
                                                <FiEdit />
                                            </Fab>
                                        </Link>
                                        <Fab aria-label="delete" size="medium" onClick={() => {
                                            setUserToDelete(user);
                                            handleClickOpenDelete();
                                        }
                                        }>
                                            <FiTrash />
                                        </Fab>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </>
                        );
                    })}
                </List>
            );
    }

    return (
        <>
            {
                resolveWhatDisplay()
            }

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
                                if (button == "SIM")
                                    deleteUser();

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
