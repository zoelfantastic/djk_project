import React, { PureComponent } from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Switch} from "react-router-dom";
import AppRoute from 'app/routes';
import AppContextProvider from 'context';
import appContext from 'app/store/app-context';
import { history } from 'app/store';
import axios from "axios";

const CONFIG_URL = `${process.env.PUBLIC_URL}/config/app.js`;

class App extends PureComponent {
    constructor(props) {
        super(props); 
        appContext.credentialStore.cookies = this.cookies;
        this.state = {
            configLoaded: false
        }       
    }

    componentDidMount() {
        axios.get(CONFIG_URL)
        .then(response => {
          if (response) {
            const appConfig = response.data;
            
            const _appCfg = Object.assign({}, appContext.appConfig,   appConfig)
            Object.assign(appContext, { appConfig: _appCfg });
  
            this.setState(prevState => ({ configLoaded: true }));
          }
        })
        .catch(error => {
          console.log("Error when loading configuration", error.message);
          this.setState({ configLoadError: error.message });    // TODO: Should use React <ErrorBoundary/>
        });
    }

    renderApp() {
        return (
            <AppContextProvider appContext={appContext}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <AppRoute />
                    </Switch>
                </ConnectedRouter>
            </AppContextProvider>
        );
    }

    render() {
        return(
            this.state.configLoaded ? this.renderApp() : null
        );
    }

}

// const App = ({history}) => {
//     return <div className="app">
//         <ConnectedRouter history={history}>
//             <Switch>
//                 <AppRoute />
//             </Switch>
//         </ConnectedRouter>
//     </div>
// }

export default App;