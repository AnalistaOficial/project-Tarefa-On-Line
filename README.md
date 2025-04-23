# Tarefa On-Line

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.6.10-FFCA28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/Docker-24.0.5-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Testado](https://img.shields.io/badge/Testado-100%25-success?logo=checkmarx)](#)
[![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)](#)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue)](LICENSE)

## Descrição

O projeto "Tarefa On-Line" permite que os usuários registrem, editem, excluam e visualizem suas tarefas. Utiliza Firebase para autenticação e banco de dados em tempo real, além de um frontend desenvolvido com React.

### Funcionalidades

- **Login**: Usuários podem fazer login com e-mail e senha.
- **Registro**: Usuários podem criar uma conta utilizando e-mail e senha.
- **Gerenciamento de Tarefas**: Os usuários podem adicionar, editar, concluir e excluir tarefas.
- **Autenticação de Usuários**: Utiliza Firebase Authentication para gerenciar usuários.

## Tecnologias Utilizadas

- **[React](https://reactjs.org/)**: Biblioteca para construção da interface do usuário.
- **[Firebase](https://firebase.google.com/)**: Usado para autenticação de usuários e gerenciamento de dados.
- **[React Router](https://reactrouter.com/)**: Navegação entre páginas.
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)**: Banco de dados para armazenar as tarefas.
- **[Toastify](https://fkhadra.github.io/react-toastify/)**: Para notificações de sucesso ou erro.
- **[Docker](https://www.docker.com/)**: Para containerização do projeto.


## Estrutura do Projeto

- `src/components`: Contém os componentes principais do projeto (Login, Registro, Tarefas).
- `src/pages`: Contém as páginas de Login, Registro e Tarefas.
- `src/routes`: Define as rotas da aplicação.
- `src/connection`: Contém a configuração do Firebase.

## Como Rodar o Projeto

### Pré-requisitos

1. Ter o Docker instalado.
2. Configurar o Firebase para utilizar no projeto.

### Configuração do Firebase

Para usar o Firebase no projeto, você precisa configurar seu próprio ambiente no Firebase Console. Siga as instruções abaixo para configurar o Firebase corretamente:

#### Passo 1: Criar um Projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Clique em "Adicionar projeto" e siga as instruções para criar um novo projeto. Durante o processo de criação, você pode desmarcar a opção de ativar o Google Analytics, caso não deseje utilizá-lo.

#### Passo 2: Configurar Firebase Authentication e Firestore

1. **Ativar o Firebase Authentication**:
   - No Firebase Console, no menu de navegação à esquerda, clique em **Authentication**.
   - Na aba **Sign-in method**, ative o método de autenticação que deseja usar (por exemplo, Email/Password).

2. **Ativar o Firestore Database**:
   - No Firebase Console, no menu de navegação à esquerda, clique em **Firestore Database**.
   - Crie um banco de dados no Firestore e configure as regras de segurança conforme necessário (para desenvolvimento, você pode usar regras de leitura e escrita públicas, mas não é recomendado em produção).

#### Passo 3: Configurar as Credenciais do Firebase

1. No Firebase Console, no menu de navegação à esquerda, clique em **Configurações do Projeto** (ícone de engrenagem no canto inferior esquerdo).
2. Vá até a aba **Configurações gerais** e, em seguida, role até a seção **Suas Apps**.
3. Clique em **Web App** para obter suas credenciais Firebase.
4. Copie o bloco de configuração do Firebase, semelhante ao código abaixo:

```javascript

Dentro do diretório 'tarefas/'
Criar o diretóriio 'connection/'
Dentro deste diretório, criar o arquivo 'index.jsx', após, colar o codigo abaixo.

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


//Adicionar as info de sua conexão com o Firebase.
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_AUTH_DOMAIN_AQUI",
    projectId: "SEU_PROJECT_ID_AQUI",
    storageBucket: "SEU_STORAGE_BUCKET_AQUI",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
    appId: "SEU_APP_ID_AQUI",
    measurementId: "SEU_MEASUREMENT_ID_AQUI"
};
  
  // Initialize Firebase

  const dbConfig = initializeApp(firebaseConfig);
  
  const db = getFirestore(dbConfig);

  const auth = getAuth(dbConfig);

  export { db, auth };


Atenção:

No ambiente do Firebase criar uma coleção por nome 'tarefas'.

Em Index você deve criar esses index da sua coleção.

'tarefas' ==>	{uid Crescente} {criadoEm Decrescente}. Estes são os campos do seu documento que precisam ser indexados.