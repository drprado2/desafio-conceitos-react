import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [formData, setFormData] = useState({
    title: "Título do seu repositório",
    url: "http://minhaurl.example",
    techs: "JS, C#"
  })

  useEffect(() => {
    api.get('repositories').then(r => setRepositories(r.data));
  }, []);

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', formData);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(r => r.id !== id) || []);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r =>
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <div>
          <div>
            <label htmlFor="title">Título</label>
            <br/>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleFormChange}/>
          </div>
          <div>
            <label htmlFor="url">Url</label>
            <br/>
            <input type="text" name="url" id="url" value={formData.url} onChange={handleFormChange}/>
          </div>
          <div>
            <label htmlFor="techs">Tecnologias</label>
            <br/>
            <input type="text" name="techs" id="techs" value={formData.techs} onChange={handleFormChange}/>
          </div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
