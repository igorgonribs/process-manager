import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home/home';
import Users from './pages/users/users';
import AddEditUser from './pages/add-edit-user/add-edit-user';
import Processes from './pages/processes/processes';
import Reports from './pages/reports/reports';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Users} path="/users" exact />
            <Route component={AddEditUser} path="/add-edit-user" exact />
            <Route component={Processes} path="/processes" exact />
            <Route component={Reports} path="/reports" exact />
        </BrowserRouter>
    );
}

export default Routes; 