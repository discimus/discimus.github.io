const botaoConsulta = document.getElementById('botaoConsulta');
const selectPaises = document.getElementById('selectPaises');
const selectInicio = document.getElementById('selectInicio');
const selectFim = document.getElementById('selectFim');
const tituloPais = document.getElementById('tituloPais');
const corpoTabela = document.getElementById('corpoTabela');

const date = new Date;

const mes = [
  '01','02','03','04','05','06',
  '07','08','09','10','11','12'
];
const dia = [
  '01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25','26','27','28','29','30',
  '31'
];

const get = function (url, callBack) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callBack(xmlHttp.response);
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
};

const consultarInstanteAtual = function () {
  return '2020-'+mes[date.getMonth()]+'-'+dia[date.getDate()-1]+'T00:00:00Z';
};

const consultarPaisAtual = function () {
  return selectPaises.value;
}

const consultarInicio = function () {
  const inicio = selectInicio.value;
  let data = '2020-03-01T00:00:00Z';
  if(inicio != ""){
    const mesAtual = date.getMonth();
    if(inicio > mesAtual+1){
      data = '2020-'+mes[mesAtual]+'-01T00:00:00Z';
    } else {
      data = '2020-'+mes[inicio-1]+'-01T00:00:00Z';
    }
  } return data;
};

const consultarFim = function () {
  const fim = selectFim.value;
  let data = consultarInstanteAtual();
  const dataFimRetroativa = eval(fim) < eval(date.getMonth()+1);
  const dataFimMaior = eval(fim) >= eval(selectInicio.value);
  if(fim != "" && dataFimRetroativa && dataFimMaior){
    data = '2020-'+mes[fim-1]+'-01T00:00:00Z';
  } return data;
};

const getURL = function () {
  return 'https://api.covid19api.com'+
  '/country/'+consultarPaisAtual()+'/status/confirmed?'+
  'from='+consultarInicio()+'&to='+
  consultarFim();
}

const consultarDadosCovid = function () {
  get(getURL(), function (data) {
    corpoTabela.innerHTML = "";
    const retorno = eval(data);
    retorno.forEach(function (elemento) {
      if(elemento.Country == tituloPais.textContent){
        const tr = document.createElement('tr');
        const tdCasos = document.createElement('td');
        const tdStatus = document.createElement('td');
        const tdData = document.createElement('td');

        tdCasos.textContent = elemento.Cases;
        tdStatus.textContent = elemento.Status;
        tdData.textContent = elemento.Date;

        tr.appendChild(tdCasos);
        tr.appendChild(tdStatus);
        tr.appendChild(tdData);

        corpoTabela.appendChild(tr);
      }
    });
  });
};

const listarPaises = function() {

  paises.sort(function (a, b) {
    if (a.Country > b.Country) {
      return 1;
    }
    if (a.Country < b.Country) {
      return -1;
    }
    return 0;
  });

  paises.forEach(function (elemento) {
    const option = document.createElement('option');
    option.text = elemento.Country;
    option.value = elemento.Slug;
    selectPaises.appendChild(option);
  });
};

const incluirMeses = function (select) {
  const meses = [
    {"nome":"Jan", "num":01},{"nome":"Fev", "num":02},
    {"nome":"Mar", "num":03},{"nome":"Abr", "num":04},
    {"nome":"Mai", "num":05},{"nome":"Jun", "num":06},
    {"nome":"Jul", "num":07},{"nome":"Ago", "num":08},
    {"nome":"Set", "num":09},{"nome":"Out", "num":10},
    {"nome":"Nov", "num":11},{"nome":"Dez", "num":12}
  ];
  meses.forEach(function (elemento) {
    const option = document.createElement('option');
    option.text = elemento.nome;
    option.value = elemento.num;
    select.appendChild(option);
  });
};

const listarMeses = function () {
  incluirMeses(selectInicio);
  incluirMeses(selectFim);
};

const atualizarTituloTabela = function () {
  tituloPais.textContent = "";
  tituloPais.textContent = selectPaises
    .children[selectPaises.selectedIndex]
    .textContent;
};


botaoConsulta.addEventListener('click', consultarDadosCovid);
selectPaises.addEventListener('change', atualizarTituloTabela)
window.addEventListener('DOMContentLoaded', listarPaises);
window.addEventListener('DOMContentLoaded', listarMeses);