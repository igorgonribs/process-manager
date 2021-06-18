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

import './UserList.css';

export default function UserList() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <List >
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <>
                            <ListItem key={value} role={undefined} dense button style={{ paddingLeft: 40 }}>
                                <ListItemIcon>
                                    <FiUserCheck />
                                </ListItemIcon>

                                <div>
                                    <p className="UserList-item-text" >Igor Gonçalves Ribeiro Silva</p>
                                    <p className="UserList-item-subtext">Administrador</p>
                                    <p className="UserList-item-subtext">11094463655</p>
                                </div>

                                <ListItemSecondaryAction>
                                    <Link to="./add-edit-user">
                                        <Fab color="secondary" aria-label="edit" size="medium" >
                                            <FiEdit />
                                        </Fab>
                                    </Link>
                                    <Fab aria-label="delete" size="medium" onClick={handleClickOpen}>
                                        <FiTrash />
                                    </Fab>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </>
                    );
                })}
            </List>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Deletar Usuário?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja deletar este usuário?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NÃO
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        SIM
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
