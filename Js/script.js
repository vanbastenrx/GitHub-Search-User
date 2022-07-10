'use strict';

const API_URL = 'https://api.github.com/users/';

const userError = document.querySelector('.user-error');
const renderUserGit = document.querySelector('.apresentacao');
const btn = document.querySelector('.buscar');
const input = document.querySelector('input');
const nome = document.querySelector('.github--nome');
const userName = document.querySelector('.github--username');
const bio = document.querySelector('.github--bio');
const repo = document.querySelector('.qtd--repo');
const followers = document.querySelector('.qtd--seguidores');
const following = document.querySelector('.qtd--seguindo');
const repositorio = document.querySelector('.repositorio');
const seguidores = document.querySelector('.seguidores');
const seguindo = document.querySelector('.seguindo');
const apresentacao = document.querySelector('.apresentacao');
const local = document.querySelector('.location');
const twitter = document.querySelector('.twit');
const portifolio = document.querySelector('.port');
const work = document.querySelector('.work');
let img = document.createElement('img');
let imagem = document.querySelector('.foto--perfil');


const githubUser = async (user) => {
  try {
    // Chamada da API
    const response = await fetch(`${API_URL}${user}`);
    const data = await response.json();

    // Erros
    if (!response) throw new Error(`${message}`);
    // Render no HTML
    renderUser(data);
  } catch (err) {
    console.error(err.message);
  }
};

// Se o usuário não existir.
const userNotExist = () => {
  const user = 'Usuário não encontrado!';
  input.placeholder = user;
  apresentacao.style.opacity = 0;
};

const renderUser = data => {

  const status = 'Indisponível';
  const companyStatus = 'Freelancer';
  const biographStatus = 'Sem descrição';
  const repoStatus = 'repositórios';
  const qtdFollower = 'seguidores';
  const qtdFollowing = 'seguindo';

  // Elementos do HTML com a API
  apresentacao.style.opacity = 1;
  img.src = data.avatar_url;
  imagem.appendChild(img);
  nome.innerHTML = data.name;
  userName.innerHTML = !data.login ? userNotExist() : `@${data.login}`;
  bio.innerHTML = !data.bio ? biographStatus : data.bio;
  
  portifolio.innerHTML = data.html_url;
  local.innerHTML = !data.location ? status : data.location;
  work.innerHTML = !data.company ? companyStatus : data.company;
  twitter.innerHTML = !data.twitter_username ? status : data.twitter_username;

  // Strings
  repositorio.innerHTML = repoStatus;
  seguidores.innerHTML = qtdFollower;
  seguindo.innerHTML = qtdFollowing;
  repo.innerHTML = data.public_repos;
  followers.innerHTML = data.followers;
  following.innerHTML = data.following;
};

// Input + botão
btn.addEventListener('submit', (e) => {
  e.preventDefault();
  input.value === '' ? false :
  githubUser(input.value.toLowerCase());
  input.value = '';
  input.placeholder = 'Buscar usuário...';
});