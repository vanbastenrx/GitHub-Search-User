'use strict';

const renderUserGit = document.querySelector('.apresentacao');
const btn = document.querySelector('.buscar');
const input = document.querySelector('input');
const API_URL = 'https://api.github.com/users/';

const githubUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}${user}`);
    const data = await response.json();
    console.log(data);
    if (!response) throw new Error(`${message}`);
    renderUser(data);
  } catch (err) {
    console.error(err.message);
  }
};

const renderUser = data => {
  const html = `<div class="githubHead">
  <div class="foto--perfil"><img src="${data.avatar_url}"></div>
<div class="biografia">
  <div class="githubNome">${!data.name || null ? 'Sem Nome' : data.name}</div>
  <div class="github--username"><a href="${data.html_url}">@${data.login}</a></div>
</div>
</div>

<div class="gitBio">
  <div class="github--bio">${!data.bio || null ? 'Sem biografia' : data.bio}</div>
  <div class="github--repo">
    <div class="repos">
      <div class="repositorio">Repositórios</div>
      <div class="qtd--repo">${data.public_repos}</div>
    </div>
    <div class="repos">
      <div class="seguidores">Seguidores</div>
      <div class="qtd--seguidores">${data.followers}</div>
    </div>
    <div class="repos">
      <div class="seguindo">Seguindo</div>
      <div class="qtd--seguindo">${data.following}</div>
    </div>
  </div>

  <div class="social--media">
    <div class="local">
      <img src="./imagens/location-pin.svg">
      <p class="local">${!data.location || null ? 'Localização' : data.location}</p>
    </div>
    <div class="twitter">
      <img src="./imagens/twitter.svg">
      <p class="local"><a href="">${!data.twitter_username || null ? 'Twitter' : data.twitter_username}</a></p>
    </div>
    <div class="portifolio">
      <img src="./imagens/globe.svg">
      <p class="local"><a href="${data.blog}">Portfólio</a></p>
    </div>
    <div class="empresa">
      <img style="width:2em" src="./imagens/briefcase.svg">
      <p class="local">${!data.company || null ? 'Freelancer' : data.company}</p>
    </div>
  </div>
</div>`;
  renderUserGit.insertAdjacentHTML('afterbegin', html);
};


btn.addEventListener('submit', (e) => {
  e.preventDefault();
  githubUser(input.value);
  input.value = '';
});
