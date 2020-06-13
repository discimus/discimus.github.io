const abaAlunosSemAcesso = document.getElementById('AlunosSemAcessoTittle');
const abaAlunosAtivos = document.getElementById('AlunosAtivosTittle');
const abaAlunosInativosTittle = document.getElementById('AlunosInativosTittle');

const abaProfessoresSemAcesso = document.getElementById('ProfessoresSemAcessoTittle');
const abaProfessoresAtivos = document.getElementById('ProfessoresAtivosTittle');
const abaProfessoresInativosTittle = document.getElementById('ProfessoresInativosTittle');

const abaUsuariosAtivos = document.getElementById('UsuariosAtivosTittle');

const abaAulasDadas = document.getElementById('AulasDadasTittle');
const abaAulasAssistidas = document.getElementById('AulasAssistidasTittle');
const abaOpcoesRegistro = document.getElementById('OpcoesRegistroTittle');

const carregando = document.getElementById('carregando');
const conteudo = document.getElementById('conteudo');

let tabelaConteudo = null;

const alterarStatusUsuario = function (acao, id) {
  $(carregando).removeClass('hide');

  const url = 'http://'+host+'/api/usuario/'+acao+'/'+id;

  $.ajax({
    type: "POST",
    url: url,
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic "+btoa(user+":"+pass));
    },
    success: function (retorno){
      ////  sucesso
    },
    error: function (response){
      ////  erro
    }
  });
};

const ativar = function (id) {
  alterarStatusUsuario('ativar', id);
}

const ativarProfSemAcesso = function (id) {
  ativar(id);
  listarProfessoresSemAcesso();
};

const ativarProfInativo = function (id) {
  ativar(id);
  listarProfessoresInativos();
}

const ativarAlunoSemAcesso = function (id) {
  ativar(id);
  listarAlunosSemAcesso();
};

const ativarAlunoInativo = function (id) {
  ativar(id);
  listarAlunosInativos();
}

const inativar = function (id) {
  alterarStatusUsuario('inativar', id);
};

const inativarAlunoAtivo = function (id) {
  inativar(id);
  listarAlunosAtivos();
};

const inativarProfAtivo = function (id) {
  inativar(id);
  listarProfessoresAtivos();
};

const consultarUsuarios = function (tipo, statusUsuarios, cor, msg) {
  // $(carregando).removeClass('hide');

  const titulos = [
    {'title': 'Aluno'},
    {'title': 'ID'},
    {'title': 'Nome Completo'},
    {'title': 'Whatsapp'},
    {'title': 'Nascimento'},
    {'title': 'Ano'},
    {'title': 'E-mail'},
    {'title': 'Escola'},
  ];

  const botao = "<a class='ui tiny "+cor+" button'>"+msg+"<a>";

  const colunas = [
    [botao,"1","Socrates","-","470 a.C.","2020","socrates@philo.com","Socratica"],
    [botao,"1","Platão","-","470 a.C.","2020","socrates@philo.com","Academia de Platão"],
    [botao,"1","Aristóteles","-","470 a.C.","2020","socrates@philo.com","Escola Aristotélica"]
  ];

  mostrarConteudo(titulos, colunas);
};

const criarTabela = function (nomeTabela, classes) {
  if(tabelaConteudo)
    $(tabelaConteudo).remove();
      
  tabelaConteudo = document.createElement('table');
  $(tabelaConteudo).attr('id', nomeTabela);
  $(tabelaConteudo).addClass(classes);
};

const mostrarConteudo = function (titulosColunas, payload) {
  conteudo.innerHTML = "";
  conteudo.appendChild(tabelaConteudo);
  $(tabelaConteudo).DataTable({
    'columns': titulosColunas,
    'data': payload,
    'scrollX': true,
    'scrollY': "300px",
    'paging': false,
    'dom': 'Bfrtip',
    'buttons': [
        'copy', 'excel', 'pdf', 'print'
    ]
  }).draw();
};

const listarAlunosSemAcesso = function () {
  criarTabela('tabelaAlunosSemAcesso', '');
  consultarUsuarios('alunos', 'aguardando', "green", "Ativar");
};

const listarAlunosAtivos = function () {
  criarTabela('tabelaAlunosAtivos', '');
  consultarUsuarios('alunos', 'ativos', "red", "Inativar");
};

const listarAlunosInativos = function () {
  criarTabela('tabelaAlunosInativos', '');
  consultarUsuarios('alunos', 'inativos', "green", "Ativar");
}

const listarProfessoresSemAcesso = function () {
  criarTabela('tabelaProfessoresSemAcesso', '');
  consultarUsuarios('professores', 'aguardando', "green", "Ativar");
};

const listarProfessoresAtivos = function () {
  criarTabela('tabelaProfessoresAtivos', '');
  consultarUsuarios('professores', 'ativos', "red", "Inativar");
};

const listarProfessoresInativos = function () {
  criarTabela('tabelaProfessoresInativos', '');
  consultarUsuarios('professores', 'inativos', "green", "Ativar");
};

abaAlunosSemAcesso.addEventListener('click', listarAlunosSemAcesso);
abaAlunosAtivos.addEventListener('click', listarAlunosAtivos);
abaAlunosInativosTittle.addEventListener('click', listarAlunosInativos);

abaProfessoresSemAcesso.addEventListener('click', listarProfessoresSemAcesso);
abaProfessoresAtivos.addEventListener('click', listarProfessoresAtivos);
abaProfessoresInativosTittle.addEventListener('click', listarProfessoresInativos);

listarAlunosSemAcesso();