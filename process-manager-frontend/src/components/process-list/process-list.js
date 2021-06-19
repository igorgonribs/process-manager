import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import { FiEdit, FiEye, FiSettings, FiPaperclip, FiFile } from 'react-icons/fi';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import './ProcessList.css';

export default function ProcessList() {

    return (
        <>
            <List >
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <>
                            <ListItem key={value} role={undefined} dense button style={{ paddingLeft: 40 }}>

                                <div className="Process-list-item-content">
                                    <div className="Process-list-item-header">
                                        <ListItemIcon>
                                            <FiSettings />
                                        </ListItemIcon>
                                    </div>

                                    <div className="ProcessList-list-item-body">
                                        <div className="ProcessList-First-Line-process-list-item">
                                            <p className="ProcessList-item-text" >Processo 1</p>
                                            <p className="ProcessList-item-status">CANCELADO</p>
                                        </div>
                                        <div className="ProcessList-Second-Line-process-list-item">
                                            <div className="ProcessList-reports-done-div">
                                                <FiPaperclip className="ProcessList-reports-done-icon"  />
                                                <p className="ProcessList-reports-done-text">1 de 2</p>
                                            </div>
                                            <p className="ProcessList-item-subtext">Deadline: 18/06/2021 às 11:00</p>
                                        </div>
                                    </div>
                                </div>

                                <ListItemSecondaryAction>
                                    <Link to="/add-edit-process/edit"  >
                                        <Fab color="primary" aria-label="edit" size="medium" >
                                            <FiEdit />
                                        </Fab>
                                    </Link>
                                    <Link to="/add-edit-process/view">
                                        <Fab color="secondary" aria-label="view" size="medium" >
                                            <FiEye />
                                        </Fab>
                                    </Link>
                                    <Link to="/process/report">
                                        <Fab color="secondary" aria-label="report" size="medium" >
                                            <FiFile />
                                        </Fab>
                                    </Link>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </>
                    );
                })}
            </List>
        </>
    );
}
