import React from 'react';
import ReactDOM from 'react-dom';
import styles from './../scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasePage from './page/BasePage';
import { MainContextProvider } from './context/MainContext';

var st = styles;
const root = document.getElementById('root');

ReactDOM.render(
    <MainContextProvider>
        <BasePage />
    </MainContextProvider>
, root);