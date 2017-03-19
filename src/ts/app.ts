import * as React from 'react';
import * as ReactDom from 'react-dom';
import {AppComponent} from "./components/layouts/main-layout";

window.onload = () => {
    ReactDom.render(
        React.createElement(AppComponent),
        document.getElementById('app')
    );
};