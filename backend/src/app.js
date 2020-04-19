const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter(project => repositories.title.includes(title))
    : repositories;
  
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;
  const repositorie = { id: uuid(), title, url, techs, likes};
  
  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const idx = repositories.find((likes, index, array) => likes.id === `${id}`);
  
  if (idx === undefined){
    return response.status(400).json({ error: "Repositorie not found"});
  }
  
  const { likes } = idx;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  if (repositorieIndex === undefined){
    return response.status(400).json({ error: "Repositorie not found"});
  }

  const repositorie = {
    id,
    title,
    url, 
    techs,
    likes
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  if (repositorieIndex === -1){
    return response.status(400).json({ error: "Repositorie not found"});
  }

  repositories.splice(repositorieIndex, 1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const idx = repositories.find(likes => likes.id === id);

  //console.log(idx);
  if (idx === undefined){
    return response.status(400).json({ error: "Repositorie not found"});
  }
  
  const { title, url, techs, likes } = idx;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  if (repositorieIndex === undefined){
    return response.status(400).json({ error: "Repositorie not found"});
  }

  const repositorie = {
    id,
    title,
    url, 
    techs,
    likes: likes + 1
  };

  //console.log(idx);
  //console.log(likes);

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);

});

module.exports = app;
