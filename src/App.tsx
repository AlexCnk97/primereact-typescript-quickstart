import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    RouteComponentProps
  } from "react-router-dom";


import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import Login from './pages/Login';
import DashboardMain from './pages/DashboardMain';





const App: React.FC = () => {
    const [loggin,setLoggin] = useState(false);



    const onLogin =(isLoggin:boolean)=>{
          setLoggin(isLoggin);
    }
    return (
        <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login onHandleLogin={onLogin}/>
          </Route>
          <Route path="/dashboard">
            <DashboardMain/>
          </Route>
          <Route path="/">
            {loggin ? <DashboardMain /> : <Login onHandleLogin={onLogin}/>}
          </Route>
        </Switch>
      
    </Router>
    )
}

export default App;
