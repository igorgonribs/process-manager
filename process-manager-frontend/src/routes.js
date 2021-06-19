import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home/home';
import Users from './pages/users/users';
import AddEditUser from './pages/add-edit-user/add-edit-user';
import AddEditProcess from './pages/add-edit-process/add-edit-process';
import Processes from './pages/processes/processes';
import Reports from './pages/reports/report';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Users} path="/users" exact />
            <Route component={AddEditUser} path="/add-edit-user/:operation/:id" exact />
            <Route component={AddEditUser} path="/add-edit-user/:operation" exact />
            <Route component={AddEditProcess} path="/add-edit-process/:operation" exact />
            <Route component={Processes} path="/processes" exact />
            <Route component={Reports} path="/process/report" exact />
        </BrowserRouter>
    );
}

export default Routes; 