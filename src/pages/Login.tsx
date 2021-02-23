import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password} from 'primereact/password';


import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../App.css';
import { useHistory } from 'react-router-dom';

interface Props{
    onHandleLogin(isLoggin:boolean):void
}

const Login: React.FC<Props> = ({onHandleLogin}) => {
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory<any>();
    const [loggin,setLoggin] = useState(false);

    const onLogin = ()=>{
        console.log("hey")
        let username = "Admin";
        let passwd = "CLOBI2021";
        if(usuario == username && pass == passwd){
            setLoggin(true);
            setTimeout(()=>{
                onHandleLogin(true);
                setLoggin(false);
                history.push("/dashboard")
            },1500)
        }
    }

    const header = (
        <>
        <img alt="Card" src="https://womancart.in/images/login-img-n.svg" />
        </>
    );
    const footer = (
        <span className="">
            <Button onClick={onLogin} label="Entrar" icon="pi pi-sign-in" />
            <img hidden={!loggin} src="https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif" width="30px" height="30px" />
        </span>
    );
    return (
        <>
            <br />
            <div className="main">
                <div className="p-grid">
                    <div className="p-col-12">
                        <Card  title="Iniciar Sesion" style={{ width: '25em' }} footer={footer} header={header}>
                            <div className="p-grid p-d-flex p-jc-center p-ai-center p-flex-column">
                                <div className="p-col-12">
                                    <span className="p-input-icon-left">
                                       
                                        <InputText value={usuario} onChange={(e) => setUsuario(e.currentTarget.value)} placeholder="Usuario" />
                                    </span>
                                </div>
                                <div className="p-col-12">
                                    <span className="p-input-icon-left">
                                        
                                        <Password  value={pass} onChange={(e) => setPass(e.currentTarget.value)} placeholder="Contraseña" />
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
