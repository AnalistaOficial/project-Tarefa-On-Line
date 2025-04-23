import './Home.css'
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


function Home() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();




     async function handleLogin(e) {

        e.preventDefault();

        await signInWithEmailAndPassword(auth, email, senha)
        .then((value) => {

            console.log(value);
            sessionStorage.setItem("@login", JSON.stringify({
            email: value.user.email,
            uid: value.user.uid
            }));

            toast.success("Login efetuado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                    navigate('/tarefas', { replace: true });
                }
            });           
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-credential') {
                toast.error("Usuário/Senha inválido!", {
                    position: "top-right",
                    autoClose: 3000
                });
            }
        });
    };




    return (
        <div className="page-container">
            <div className="header">
                <img src="/tarefa-fundo.jpg" alt="Tarefa" />
                <h1>Tarefas On-Line</h1>
            </div>

            <div className="login-container">
                <img src="/login.jpg" alt="Sua foto" />

                <form onSubmit={handleLogin} className="login-form">
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
                        placeholder='Digite sua senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar</button>
                </form>
                <Link to='/register'>
                    Não possue uma conta? Cdastre-se
                </Link>
            </div>
        </div>
    );
}

export default Home;
