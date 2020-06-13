const frameContent            = document.getElementById('frameContent');
const linkSobre               = document.getElementById('linkSobre');
const linkProjetoRosaParks    = document.getElementById('linkProjetoRosaParks');
const linkConsumindoApiCovid  = document.getElementById('linkConsumindoApiCovid');

const carregarPagina = function (url) {
  frameContent.src = url;
};

const carregarPaginaSobre = function () {
  carregarPagina('./pages/info/info.html');
};

const carregarPaginaProjetoRosaParks = function () {
  carregarPagina('./pages/projeto-rosa-parks/index.html');
};

const carregarPaginaConsumoApiCovid = function () {
  carregarPagina('./pages/consumindo-api-covid/index.html');
};

linkSobre.addEventListener('click', carregarPaginaSobre);
linkProjetoRosaParks.addEventListener('click', carregarPaginaProjetoRosaParks);
linkConsumindoApiCovid.addEventListener('click', carregarPaginaConsumoApiCovid);