import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FiMenu, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { getUserLogged } from '../../utils/loginLogout';
import { permissions } from '../../utils/permissions';
import "./AppMenu.css";

function AppMenu({ pageName, addButtonLink, goBack }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const resolveGoBack = () => {
        if (goBack == true)
            return (<div className="App-appbar-menuButton">
                <IconButton edge="start" color="inherit" aria-label="back" onClick={() => { history.goBack(); }}>
                    <FiArrowLeft />
                </IconButton>
            </div>);

        return;
    }

    const resolveAddButton = () => {
        if (addButtonLink)
            return (
                <div className="App-appbar-add-button">
                    <IconButton edge="start" color="inherit" aria-label="add" onClick={() => history.push(addButtonLink)}>
                        <FiPlus />
                    </IconButton>
                </div>
            );

        return;
    }

    const resolveProcessPage = () => {
        const user = getUserLogged();
        if (user.profile.id != permissions.adm)

            return (<MenuItem onClick={() => { handleClose(); history.push("/processes"); }}>Processos</MenuItem>);
    }

    const resolveUserPage = () => {
        const user = getUserLogged();
        if (user.profile.id == permissions.adm)
            return (<>
                <MenuItem onClick={() => { handleClose(); history.push("/users"); }}>Usuários</MenuItem>
                <MenuItem onClick={() => { handleClose(); history.push("/processes"); }}>Processos</MenuItem>
            </>);

        return;
    }

    return (
        <div className="App-appbar-root">
            <AppBar position="static" >
                <Toolbar className="App-appbar">
                    <div className="App-appbar-organizer">
                        <div className="App-appbar-menuButton-list">
                            <div className="App-appbar-menuButton">
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                                    <FiMenu />
                                </IconButton>
                            </div>
                            {resolveGoBack()}
                        </div>
                        <div className="App-appbar-title">
                            <Typography variant="h6" >
                                {/* {pageName} */ "Olá, " + getUserLogged().name}
                            </Typography>
                        </div>
                        {resolveAddButton()}

                    </div>
                </Toolbar>
            </AppBar>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {resolveProcessPage()}
                {resolveUserPage()}
                <MenuItem onClick={() => { handleClose(); history.push("/"); }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default AppMenu;