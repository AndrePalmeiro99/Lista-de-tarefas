const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//cria uma lista no html
function criaLista() {
    const li = document.createElement('li');
    return li;
}

//adiciona a tarefa apertando enter
inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    }
})

// //limpa o input
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//cria um botao que apaga a tarefa
function criaBotaoApagar(li) {
    li.innerText += ' '; 
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

//Adiciona a tarefa em um espaço da lista feita anteriormente
function criaTarefa(textoInput) {
    const li = criaLista();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

//verifica se existe uma tarefa digitada
btnTarefa.addEventListener('click', function() {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

//verifica se foi clicado no botao de apagar e remove a tarefa
document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

//salva as tarefas
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefas()