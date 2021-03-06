import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import { FiEdit, FiEye, FiSettings, FiPaperclip, FiFile } from 'react-icons/fi';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../../services/api';
import { getUserLogged } from '../../utils/loginLogout';
import { resolveStatusColorByStatusId } from '../../utils/process-status';
import './ProcessList.css';
import { permissions } from '../../utils/permissions';

export default function ProcessList() {

    const [processesList, setProcessesList] = React.useState(null);

    React.useEffect(() => {
        const userLogged = getUserLogged();
        if(userLogged.profile.id == permissions.operator) {
            api.get(`report/mine/${userLogged.id}`).then(response => {
                setProcessesList(response.data)
            }).catch(error => {
                setProcessesList([]);
            });
        }
        else {
            api.get('process').then(response => {
                setProcessesList(response.data)
            }).catch(error => {
                setProcessesList([]);
            });
        }
    }, []);

    const resolveNumberOfReportsPending = process => {
        return `${process.reports.length} de ${process.users.length}`
    }

    const resolveButtonsToDisplay = (process) => {
        if (getUserLogged().profile.id == permissions.operator)
            return (
                <>
                    <Link to={`/process/report/${process.id}`}>
                        <Fab color="secondary" aria-label="report" size="medium" >
                            <FiFile />
                        </Fab>
                    </Link>
                </>
            );
        else if (getUserLogged().profile.id == permissions.triage)
            return (
                <>
                    <Link to={`/add-edit-process/edit/${process.id}`}>
                        <Fab color="primary" aria-label="edit" size="medium" >
                            <FiEdit />
                        </Fab>
                    </Link>
                    <Link to={`/add-edit-process/view/${process.id}`}>
                        <Fab color="secondary" aria-label="view" size="medium" >
                            <FiEye />
                        </Fab>
                    </Link>
                </>
            );
        else
            return (
                <>
                    <Link to={`/add-edit-process/view/${process.id}`}>
                        <Fab color="secondary" aria-label="view" size="medium" >
                            <FiEye />
                        </Fab>
                    </Link>
                </>
            );


    }

    const resolveWhatDisplay = () => {
        if (!processesList)
            return (<CircularProgress style={{ alignSelf: 'center', margin: 64 }} />);
        else if (processesList.length == 0)
            return (<p>N??o h?? processos.</p>);
        else
            return (
                <List >
                    {processesList.map((process) => {

                        return (
                            <>
                                <ListItem key={process.id} role={undefined} dense button style={{ paddingLeft: 40 }}>

                                    <div className="Process-list-item-content">
                                        <div className="Process-list-item-header">
                                            <ListItemIcon>
                                                <FiSettings />
                                            </ListItemIcon>
                                        </div>

                                        <div className="ProcessList-list-item-body">
                                            <div className="ProcessList-First-Line-process-list-item">
                                                <p className="ProcessList-item-text" >{process.name}</p>
                                                <p className="ProcessList-item-status" style={{ backgroundColor: resolveStatusColorByStatusId(process.status) }}>{process.status.toUpperCase()}</p>
                                            </div>
                                            <div className="ProcessList-Second-Line-process-list-item">
                                                <div className="ProcessList-reports-done-div">
                                                    <FiPaperclip className="ProcessList-reports-done-icon" />
                                                    <p className="ProcessList-reports-done-text">{resolveNumberOfReportsPending(process)}</p>
                                                </div>
                                                <p className="ProcessList-item-subtext">Deadline: {process.expectedReportDate.split(" ")[0]} ??s {process.expectedReportDate.split(" ")[1]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <ListItemSecondaryAction>
                                        {resolveButtonsToDisplay(process)}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </>
                        );
                    })}
                </List>
            );
    }

    return resolveWhatDisplay();
}
