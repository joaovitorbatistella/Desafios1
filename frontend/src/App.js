import React, { useState, useEffect } from "react";
import api from './services/api';

import Header from './components/Header';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      id: "5c2d971f-6786-4ace-a57f-71c336fbb0f2",
      title: "Repositório de teste 2",
      url: "http://github.com/",
      techs: [
        "PHP",
        "Java",
        "NodeJS"
      ],
      likes: 0
    });
  
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

function handleRemoveRepository(id) {
      
      api.delete(`repositories/${id}`);
      const idx = repositories.find(ids => ids.id === id);
      setRepositories(repositories.filter(a => a !== idx));
      
  }

  return (
    <>
    <div>
      <Header title="Repositórios" />
      <ul data-testid="repository-list">
        
      {repositories.map(repositorie => 
      <li key={repositorie.id}>{repositorie.title}

        <a href={repositorie.url}>Acessar</a>
      
        <button onClick={() => handleRemoveRepository(`${repositorie.id}`)}>
            Remover
          </button>
      
      </li> )}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
