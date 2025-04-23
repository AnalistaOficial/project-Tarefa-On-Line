import './Register.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../../connection';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    signOut, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword    
    } from 'firebase/auth'



    
    function Register() {
        const [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const navigate = useNavigate();
    




        async function handleRegister(e){

            e.preventDefault();

            await createUserWithEmailAndPassword(auth, email, senha)
            .then((value) => {

                toast.success("E-mail cadastrado com sucesso!", {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        navigate('/', { replace: true });
                    }
                });  

                // console.log(value);            
                // navigate('/', { replace: true });
            })
            .catch((error) => {
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    toast.error("E-mail já existe!", {
                        position: "top-right",
                        autoClose: 3000
                    });
                }                
            });
    }


    
        return (
            <div className="page-container">
                <div className="header">
                    <img src="/tarefa-fundo.jpg" alt="Tarefa" />
                    <h1>Crie sua conta</h1>
                    {/* <p>Cadastre-se para começar a organizar suas tarefas</p> */}
                </div>
    
                <div className="login-container">
                    <img src="/login.jpg" alt="Foto de perfil" />
    
                    <form onSubmit={handleRegister} className="login-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Digite seu e-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
    
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder='Crie uma senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
    
                        <button type="submit">Cadastrar</button>
                    </form>
    
                    <Link to='/'>
                        Já tem uma conta? Faça login
                    </Link>
                </div>
            </div>
        );
    }
    
    export default Register;
    

