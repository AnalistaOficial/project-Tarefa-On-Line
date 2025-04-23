import './Tarefas.css';
import { useState, useEffect } from 'react';
import { db } from '../../connection';
import { collection, addDoc, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut } from 'firebase/auth'; // adicione signOut se ainda não tiver



function Tarefas() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
  
    try {
      await signOut(auth); // desloga do Firebase
      sessionStorage.removeItem("@login"); // limpa sessão local
      navigate('/'); // redireciona pra tela de login
    } catch (err) {
      console.error("Erro ao sair:", err);
      toast.error("Erro ao sair. Tente novamente.", {
        position: "top-right",
        autoClose: 1000
      });
    }
  };
  
  // Pegar usuário do sessionStorage
  useEffect(() => {
    const dados = sessionStorage.getItem("@login");
    console.log(dados)
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
    setCarregando(false);
  }, []);

  // Salvar tarefa com o UID do usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tarefa.trim()) {
      toast.warn("Digite algo!", {
        position: "top-right",
        autoClose: 1000
    });
      return;
    }

    if (!usuario) {
      toast.error("Usuário não identificado!", {
        position: "top-right",
        autoClose: 1000
    });
      return;
    }

    try {
      if (editando) {
        // Atualizar tarefa
        const tarefaRef = doc(db, 'tarefas', editando.id);
        await updateDoc(tarefaRef, {
          tarefa: tarefa,
          criadoEm: new Date()
        });

        toast.success("Tarefa atualizada!", {
            position: "top-right",
            autoClose: 1000
        });
        
        setEditando(null);
      } else {
        // Adicionar nova tarefa
        await addDoc(collection(db, 'tarefas'), {
          tarefa: tarefa,
          criadoEm: new Date(),
          uid: usuario.uid,
          email: usuario.email
        });
        console.log(usuario.uid)
        toast.success("Tarefa registrada!", {
            position: "top-right",
            autoClose: 1000
        });
      }

      setTarefa('');
    } catch (err) {
      console.error("Erro ao registrar:", err);
      toast.error("Erro ao registrar a tarefa.", {
        position: "top-right",
        autoClose: 1000
    });
    }
  };

  // Buscar tarefas apenas do usuário logado
  useEffect(() => {
    if (!usuario?.uid) return;

    const q = query(
      collection(db, 'tarefas'),
      where('uid', '==', usuario.uid),
      orderBy('criadoEm', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Tarefas carregadas:", lista); // 👈 Ajuda no debug
      setTarefas(lista);
    });

    return () => unsubscribe();
  }, [usuario]);

  // Função para editar a tarefa
  const handleEditar = (t) => {
    setTarefa(t.tarefa);
    setEditando(t);
  };

  // Função para excluir a tarefa
  const handleConcluir = async (id) => {
    try {
      await deleteDoc(doc(db, 'tarefas', id));
      toast.success("Tarefa excluída!", {
        position: "top-right",
        autoClose: 1000
    });
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      toast.error("Erro ao excluir tarefa.", {
        position: "top-right",
        autoClose: 1000
    });
    }
  };

  // Cancelar edição
  const handleCancelarEdicao = () => {
    setTarefa('');
    setEditando(null);
  };

  if (carregando) return <p>Carregando usuário...</p>;

  return (
    <div className="register-task">
      <div className="topo">
        <img className="logout-btn" src="/btn-logout.png" alt="Sair" onClick={handleLogout}/>
      </div>
      <h2>{editando ? "Editar Tarefa" : "Registrar Nova Tarefa"}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Descreva sua tarefa aqui..."
        />
        <button type="submit">{editando ? "Editar" : "Registrar"}</button>
        {editando && (
          <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
        )}
      </form>

      <div className="lista-tarefas">
        <h3>Minhas Tarefas</h3>
        <ul>
          {tarefas.length === 0 && <p>Sem tarefas cadastradas.</p>}
          {tarefas.map(t => {
            const data = t.criadoEm?.toDate?.();
            const dataFormatada = data
              ? data.toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Data indisponível';

            return (
              <li key={t.id} className="tarefa-item">
                <span className="tarefa-texto">{t.tarefa}</span>
                <span className="tarefa-data">{dataFormatada}</span>
                <button className="editar-btn" onClick={() => handleEditar(t)}>Editar</button>
                <button className="concluir-btn" onClick={() => handleConcluir(t.id)}>Concluir</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tarefas;

