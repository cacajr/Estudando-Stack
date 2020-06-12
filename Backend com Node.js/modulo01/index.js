const express = require('express');

const app = express();

// permite que o express consiga interpretar formatos json no body da requisicao
app.use(express.json());

// representara nosso "banco de dados" de usuarios a priore
const users = ['Carlos', 'Junior', 'Antonio'];

// Middleware Global (Pois toda rota que for chamada, passara antes por esse Middleware)
app.use((req, res, next) => {
    // Começo a calcular quanto tempo durou a requisicao
    console.time('Request');
    // Mostrando detalhes como: metodo chamado e a rota da requisicao
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    // Faz com que esse Middleware nao pare a execucao das outra requisicoes
    next();
    // Termino de calcular quanto tempo durou a requisicao
    console.timeEnd('Request');
});

// Criando Middlewares local
function checkUsersExists(req, res, next){
    // Averiguo se o atributo name no Body da requisicao foi enviado
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required!' });
    }
    return next();
}

function checkUserInArray(req, res, next){
    // Resgatando um usuario usando informacao do index no params da requisicao e usando com
    const user = users[req.params.index];
    // Averiguo se o index informado no params da requisicao existe
    if(!user){
        return res.status(400).json({ error: 'User does not exist!' });
    }
    // Adicionando uma nova variavel a requisicao que guardara o usuario
    // Assim, posso usa-lo em qualquer requisicao que utilize esse Middleware
    // sem precisar fazer desestruturacao
    req.user = user;
    return next();
}

// LISTA TODOS OS USUARIOS
// http://localhost:3333/users
app.get('/users', (req, res) => {
    // retorna o array de users em formato json
    return res.json(users);
});

// LISTA SOMENTE UM USUARIO ESPECIFICO PELO SEU INDICE
// http://localhost:3333/users/:index
app.get('/users/:index', checkUserInArray, (req, res) => {
    // Retorna uma resposta no formato json para o usuario
    // Lembrando que req.user foi desestruturado no Middleware checkUserInArray
    return res.json(req.user);
});

// CRIA UM USUARIO
// http://localhost:3333/users
app.post('/users', checkUsersExists, (req, res) => {
    // efetua uma desestruturacao pegando os dados(name) no body da requisicao
    const { name } = req.body;
    // guarda a informacao no array que representa o banco de dados
    users.push(name);
    // retorna uma resposta (array completo)
    return res.json(users)
});

// EDITA UM USUARIO
// http://localhost:3333/users/:index
app.put('/users/:index', checkUserInArray, checkUsersExists, (req, res) => {
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
app.delete('/users/:index', checkUserInArray, (req, res) => {
    // resgato o index do usuario que esta no params da requisicao
    const { index } = req.params;
    // deleto no, no array (banco de dados), o elemento com o indice informado
    users.splice(index, 1);
    // retorno a resposta com o array de users completo
    return res.json(users);
});

// porta em que o servidor(app) esta rodando
app.listen(3333);