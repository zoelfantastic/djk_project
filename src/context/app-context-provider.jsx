import React from 'react';
import AppContext from './context';

const { Provider } = AppContext;

const AppContextProvider = ({ appContext, children }) => {
    return <Provider value={appContext}>
        {
            React.Children.map(children, child => {
                return React.cloneElement(child, { appContext: appContext})
            })
        }
    </Provider>
}

export default AppContextProvider;