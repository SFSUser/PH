import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Button, FormControl, InputGroup, Navbar } from 'react-bootstrap';
import { MainContext } from '../context/MainContext';
import * as I from 'react-feather';
import Helmet from 'react-helmet';
import html2canvas from 'html2canvas'
import 'animate.css';

/**
 * BasePage component (Common for all pages components)
 * @class BasePage
 * @author Samael Fierro <sfstricks@hotmail.com>
 */
export default class BasePage extends Component<any, any> {  
    static contextType = MainContext;
    private templateRef = null;

    constructor(props){
        super(props);
        this.state = {
            name: "NOMBRE"
        };
        this.templateRef = React.createRef();
    }

    componentDidMount(){
        let me = this;
    }

    private getColor(index: number): number {
        index += 1;
        while(index > 5){
            index -= 5;
        }
        return index;
    }

    private export() {
        let me = this;
        html2canvas(me.templateRef.current, {
            //allowTaint: true,
            logging: true,
            //taintTest: false,
            //onrendered: save /*0.4.1*/
        }).then(canvas =>{
            let a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.download=me.state.name +".png";
            a.target="_blank";
            a.click();
            a.remove();
        });
    }

    render (){
        let me = this;
        let have_o = me.state?.name?.includes("O");
        return (
            <div className="base-page">
                {me.state?.busy &&
                    <div className="locker">
                        <div className="container">
                            Generando... por favor espera
                        </div>
                    </div>
                }
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Generador Pacto Sabroso - Pacto Histórico</title>
                </Helmet>
                <div className="fixer">
                    <h5 className="text-center">
                        Escribe tu nombre sabroso:
                    </h5>
                    <InputGroup className="mb-3 mt-3">
                        <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
                        <FormControl
                            type="text" 
                            maxLength={10}
                            value={me.state?.name} 
                            onChange={ e => me.setState({name: e.target.value?.toUpperCase()})}
                            />
                    </InputGroup>

                    <div className="text-center mb-3">
                        <Button variant='success' onClick={e=>me.export()}>
                            <I.Download/> Guardar imagen
                        </Button>
                    </div>

                    <div ref={me.templateRef}>
                        <div className="template template-1">
                            <div className="pacto-nombre">
                                {me.state?.name?.split("")?.map( (l, i) => 
                                    l == "O" ? 
                                    <span key={i} className="letra-o">Ñ</span>
                                    :
                                    <span key={i} className={`color-${me.getColor(i)} z-${i % 2} ${!have_o && i == 0?"no-":""}first-letter`}>{l}</span>
                                )}
                                {!have_o && <span className="paloma"></span>}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <b>Créditos: </b>Sam F.S.
                    </div>
                </div>
            </div>
        );
    }
}