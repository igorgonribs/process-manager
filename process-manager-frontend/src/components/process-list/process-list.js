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
import { resolveStatusColorByStatusId } from '../../utils/process-status';
import './ProcessList.css';

export default function ProcessList() {

    const [processesList, setProcessesList] = React.useState(null);

    React.useEffect(() => {

        api.get('process').then(response => {
            setProcessesList(response.data)
        }).catch(error => {
            setProcessesList([]);
        });
    }, []);

    const resolveNumberOfReportsPending = process => {
        return `${process.reports.length} de ${process.users.length}`
    }

    const resolveWhatDisplay = () => {
        if (!processesList)
            return (<CircularProgress style={{ alignSelf: 'center', margin: 64 }} />);
        else if (processesList.length == 0)
            return (<p>Não há processos.</p>);
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
                                                <FiPaperclip className="ProcessList-reports-done-icon"  />
                                                <p className="ProcessList-reports-done-text">{resolveNumberOfReportsPending(process)}</p>
                                            </div>
                                            <p className="ProcessList-item-subtext">Deadline: {process.expectedReportDate.split(" ")[0]} às {process.expectedReportDate.split(" ")[1]}</p>
                                        </div>
                                    </div>
                                </div>

                                <ListItemSecondaryAction>
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
            );
    }

    return resolveWhatDisplay();
}
