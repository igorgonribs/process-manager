import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FiMenu, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { getUserLogged } from '../../utils/loginLogout';
import { permissions } from '../../utils/permissions';
import "./AppMenu.css";

function AppMenu({ addButtonLink, goBack }) {

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

    const resolveCanAddItem = () => {
        if(addButtonLink.includes("user") && (getUserLogged().profile.id != permissions.adm))
            return false;

        else if(addButtonLink.includes("process") && (getUserLogged().profile.id != permissions.triage))
            return false;

        else return true;
    }

    const resolveAddButton = () => {
        if (addButtonLink && resolveCanAddItem())
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
                <MenuItem onClick={() => { handleClose(); history.push("/users"); }}>Usu??rios</MenuItem>
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
                            <h5>
                                {"Ol??, " + getUserLogged().name}
                            </h5>
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