import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import {MainLayout}  from 'app/layout';
import HomePage  from 'app/homepage';
import ListProject from 'app/projects';
import ListPipeline from 'app/pipeline';
import {RingkasanKinerja, SebaranProyek} from 'app/laporan';
import {RouteWithLayout}  from 'components';

const AppRoute = props =>
    <Switch>
        <Redirect key="redirect.home" exact from="/" to="/home" />
        <RouteWithLayout key="home"  path="/home" exact layout={MainLayout} component={HomePage}/>
        <RouteWithLayout key="project" pageTitle="List Project" exact layout={MainLayout} path="/project" component={ListProject} />
        <RouteWithLayout key="pipeline" pageTitle="List Pipeline" exact layout={MainLayout} path="/pipeline" component={ListPipeline} />    
        <RouteWithLayout key="ringkasan-kinerja" pageTitle="Ringkasan Kinerja" exact layout={MainLayout} path="/ringkasan-kinerja" component={RingkasanKinerja} />
        <RouteWithLayout key="sebaran-proyek" pageTitle="Sebaran Proyek" exact layout={MainLayout} path="/sebaran-proyek" component={SebaranProyek} />
    </Switch>

export default AppRoute;