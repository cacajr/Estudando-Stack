const express = require('express');

const app = express();

// permite que o express consiga interpretar formatos json no body da requisicao
app.use(express.json());

// representara nosso "banco de dados" de usuarios a priore
const users = ['Carlos', 'Junior', 'Antonio'];

// LISTA TODOS OS USUARIOS
// http://localhost:3333/users
app.get('/users', (req, res) => {
    // retorna o array de users em formato json
    return res.json(users);
});

// LISTA SOMENTE UM USUARIO ESPECIFICO PELO SEU INDICE
// http://localhost:3333/users/:index
app.get('/users/:index', (req, res) => {
    // efetua uma desistruturacao pegando o index no params(:index) da requisicao
    const { index } = req.params;
    //retorna uma resposta no formato json para o usuario
    return res.json(users[index]);
});

// CRIA UM USUARIO
// http://localhost:3333/users
app.post('/users', (req, res) => {
    // efetua uma desistruturacao pegando os dados(name) no body da requisicao
    const { name } = req.body;
    // guarda a informacao no array que representa o banco de dados
    users.push(name);
    // retorna uma resposta (array completo)
    return res.json(users)
});

// EDITA UM USUARIO
// http://localhost:3333/users/:index
app.put('/users/:index', (req, res) => {
    // resgato o index que veio no params da requisicao
    const { index } = req.params;
    // resgato o name que veio no body da requisicao
    const { name } = req.body;
    // efetuo a mudanca no array(banco de dados)
    users[index] = name;
    // retorno a resposta (array completo)
    return res.json(users);
});

// DELETA UM USUARIO
// http://localhost:3333/users/:index
app.delete('/users/:index', (req, res) => {
    // resgato o index do usuario que esta no params da requisicao
    const { index } = req.params;
    // deleto no, no array (banco de dados), o elemento com o indice informado
    users.splice(index, 1);
    // retorno a resposta com o array de users completo
    return res.json(users);
});

// porta em que o servidor(app) esta rodando
app.listen(3333);