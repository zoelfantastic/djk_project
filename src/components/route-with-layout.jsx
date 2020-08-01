import React, { useEffect } from "react";
import { Route } from "react-router-dom";

const RouteWithLayout = props => {
    const { layout: Layout, component: Component, pageTitle, path, render,  ...otherProps } = props;

    useEffect(() => {document.title = pageTitle || ""});

    return <Layout title={pageTitle}>
                <Route path={path} render={routeProps => {
                    const { match } = routeProps;
                    const authParams = { path: match.path, url: match.url, params: match.params };
                    const paramProps = { ...otherProps, ...match.params, routeParameters: { path: match.path, url: match.url } };
                    return  <Component {...paramProps} />
                    }} />               
          </Layout>
}

export default RouteWithLayout;