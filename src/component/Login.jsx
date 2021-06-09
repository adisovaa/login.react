import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import './Login.css';

const Login = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorEmail, setErrorEmail] = useState('Емейл не должен быть пустым!');
    const [errorPassword, setErrorPassword] = useState('Пароль не должен быть пустым!');
    const [formValid, setFormValid] = useState(false);
    let history = useHistory();

    useEffect(() =>{
        if (errorEmail || errorPassword){
            setFormValid(false)
        }else {
            setFormValid(true)
        }
    }, [errorEmail, errorPassword]);


    const blurHandle = e =>{
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'name':
                setNameDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    const userHandle = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    };

    const emailHandle = e =>{
        setEmail(e.target.value);
        if (!e.target.value){
            setEmailDirty(true);
        }else{
            setEmailDirty(false);
            setErrorEmail('')
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailDirty(true);
            setErrorEmail('Не корректный Емейл!');
        }else {
            setEmailDirty(false);
            setErrorEmail('')
        }
    };

    const passwordHandle = e =>{
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 8){
            setErrorPassword('Пароль не должен быть длиннее 3 и меньше 8!');
            if (!e.target.value){
                setErrorPassword('Пароль не должен быть пустым!')
            }
        }else {
            setErrorPassword('')
        }
    };


    return (
        <div className="login">
            <form>
                <div className="loginContainer">
                    <div className="loginItem">
                        <h1>Логин</h1>
                        <div className="loginUserName">
                            <div className={nameDirty ? "userName".concat(' error') : "userName"}>
                                <p>Имя*</p>
                                <input
                                    onBlur={e => blurHandle(e)}
                                    type="text"
                                    placeholder="Ваше имя"
                                    required
                                    value={user.name}
                                    onChange={userHandle}
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className="loginUserEmail">
                            <div className={emailDirty ? 'userEmail'.concat(' error') : 'userEmail'}>
                                <p>Электронный адрес*</p>
                                <input
                                    onBlur={e => blurHandle(e)}
                                    type="email"
                                    placeholder="Введите адрес электронной почты"
                                    required
                                    value={email}
                                    onChange={emailHandle}
                                    name="email"
                                />
                                {emailDirty ? <p style={{color: 'red'}}>{errorEmail}</p> : null}
                            </div>
                        </div>
                        <div className="loginPassword">
                            <div className={passwordDirty ? 'userPassword'.concat(' error') : 'userPassword'}>
                                <p>Пароль*</p>
                                <input
                                    onBlur={e => blurHandle(e)}
                                    type="password"
                                    name='password'
                                    placeholder="Ваш пароль"
                                    value={password}
                                    onChange={passwordHandle}
                                    required
                                />
                                {passwordDirty ? <p style={{color: "red"}}>{errorPassword}</p> : null}
                            </div>
                        </div>
                        <div className="loginButtons">
                            <button className="loginBtn">Войти</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;