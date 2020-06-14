const express = require('express');
const app = express();

app.use(express.json());

arrayProjects = [{ id: "1", title: 'Primeiro Projeto', tasks: ['Nova tarefa'] },
                 { id: "2", title: 'Segundo Projeto', tasks: ['Nova tarefa'] }];

contReq = 0;

//CRIANDO MIDDLEWARES
// MIDDLEWARE GLOBAL QUE CALCULA QUANTAS REQUISICOES FORAM FEITAS ATE ENTAO
app.use((req, res, next) => {
    contReq += 1
    console.log(`Número de requisições até então: ${contReq}`)
    next();
});

// MIDDLEWARE QUE TRATA O ID DA REQUISICAO
function checkIdProjectExists(req, res, next){
    if(!(req.params.id > 0 && req.params.id <= arrayProjects.length)){
        return res.status(400).json({ error: 'Project ID does not exist!' });
    }
    return next();
}

// CRIANDO UM PROJETO
app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    
    const projetc = {
        id: id,
        title: title,
        task: ['Nova tarefa']
    };

    arrayProjects.push(projetc);

    return res.json(projetc);
});

// LISTA TODOS OS PROJETOS
app.get('/projects', (req, res) => {
    return res.send(arrayProjects);
});

// LISTA UM PROJETO ESPECIFICO
app.get('/projects/:id', checkIdProjectExists, (req, res) => {
    const { id } = req.params;
    
    return res.json(arrayProjects[id-1]);
});

// EDITA O TITULO DE UM PROJETO ESPECIFICO
app.put('/projects/:id', checkIdProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    arrayProjects[id-1].title = title;

    return res.json(arrayProjects);
});

// DELETA UM PROJETO ESPECIFICO
app.delete('/projects/:id', checkIdProjectExists, (req, res) => {
    const { id } = req.params;

    arrayProjects.splice(id-1, 1);

    return res.json(arrayProjects);
});

// ADICIONA UMA TAREFA EM UM PROJETO ESPECIFICO
app.post('/projects/:id/tasks', checkIdProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    arrayProjects[id-1].tasks.push(title);

    return res.json(arrayProjects);
});

app.listen(3333);