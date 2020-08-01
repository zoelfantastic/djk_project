import React, { useContext } from 'react';
const AppContext = React.createContext();

const withAppContext = WrappedComponent => {
    const name = `withAppContext(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    const AppContextWrapper = (props) => {
        const appContext = useContext(AppContext);
        return <WrappedComponent {...props} appContext={appContext} />
    }
    AppContextWrapper.displayName = name;
    AppContextWrapper.WrappedComponent = WrappedComponent;
    return AppContextWrapper;
}

export { withAppContext };
export default AppContext;