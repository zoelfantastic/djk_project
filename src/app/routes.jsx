import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import {MainLayout}  from 'app/layout';
import HomePage  from 'app/homepage';
import ListProject from 'app/projects';
import {RouteWithLayout}  from 'components';

const AppRoute = props =>
    <Switch>
        <Redirect key="redirect.home" exact from="/" to="/home" />
        <RouteWithLayout key="home"  path="/home" exact layout={MainLayout} component={HomePage}/>
        <RouteWithLayout key="project" pageTitle="List Project" exact layout={MainLayout} path="/project" component={ListProject} />
        {/* <Route path="/pipeline" component={PipelinePage} /> */}
    </Switch>

export default AppRoute;