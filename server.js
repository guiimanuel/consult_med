const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const agendamento = require('./models/agendamento.model');
const medico = require('./models/medico.model');
const paciente = require('./models/paciente.model');
const bancoSangue = require('./models/bancoSangue.model');
const internamento = require('./models/internamento.model');
const cirurgia = require('./models/cirurgia.model');
const db = require('./config/database');

const app = express();
const port = 8200;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));

var pacientes = [
    {id_paciente:1, nome: 'Guilherme Manuel', idade: 16, cpf: 12345678901},
    {id_paciente:2, nome: 'Arthur Gusmão', idade: 16, cpf: 23456789012},
    {id_paciente:3, nome: 'Jefferson Ricardo', idade: 17, cpf: 34567890123}
];

var medicos = [
    {id_medico:1, nome: 'Stephan Lacerda', idade: 28, especializacao: 'Cardiologia'},
    {id_medico:2, nome: 'Richard Guilherme', idade: 37, especializacao: 'Pediatria'},
    {id_medico:3, nome: 'Kelven Sérgio', idade: 56, especializacao: 'Urologia'}
];

var agendamentos = [
    {id_agendamento:1, nome_paciente: 'Guilherme Manuel', hora_inicio: 16, especializacao: 'Cardiologia' }
];

var bancosSangue = [
    {id_sangue:1, tipo_sangue: 'A+', quantidade: 10},
];

var internamentos = [
    {id_internamento:1, nome_paciente: 'Guilherme Manuel', quarto: 101, data_entrada: '2024-01-10'},
];

var cirurgias = [
    {id_cirurgia:1, nome_paciente: 'Arthur Gusmão', tipo_cirurgia: 'Apendicite', data_cirurgia: '2024-02-15'},
];

//home
app.get('/', (req, res) => {
    res.render('home')
});

//-----------------------------------------listar------------------------------------------------------------//
// pacientes
app.get('/pacientes', async (req,res) => {
    try{
        let pacientes = await paciente.findAll({raw: true});
        res.render('listarPaciente', {pacientes});
    }catch(error){
        console.error('Erro ao buscar pacientes:', error);
        res.status(500).send('Erro ao buscar pacientes');
    }
});

//medicos
app.get('/medicos', async (req,res) => {
    try{
        let medicos = await medico.findAll({raw: true});
        res.render('listarMedico', {medicos});
    }catch(error){
        console.error('Erro ao buscar pacientes:', error);
        res.status(500).send('Erro ao buscar pacientes');
    }
});

//agendamentos
app.get('/agendamentos', async (req,res) => {
    try{
        let agendamentos = await agendamento.findAll({raw: true});
        res.render('listarAgendamento', {agendamentos});
    }catch(error){
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).send('Erro ao buscar agendamentos');
    }
});

//bancos de sangue
app.get('/bancosSangue', (req,res) => {
    try{
        let bancosSangue = bancoSangue.findAll({raw: true});
        res.render('listarBancoSangue', {bancosSangue});
    }catch(error){
        console.error('Erro ao buscar bancos de sangue:', error);
        res.status(500).send('Erro ao buscar bancos de sangue');
    }
});

//internamentos
app.get('/internamentos', (req,res) => {
    try{
        let internamentos = internamento.findAll({raw: true});
        res.render('listarInternamento', {internamentos});
    }catch(error){
        console.error('Erro ao buscar internamentos:', error);
        res.status(500).send('Erro ao buscar internamentos');
    }
});

//cirurgias
app.get('/cirurgias', (req,res) => {
    try{
        let cirurgias = cirurgia.findAll({raw: true});
        res.render('listarCirurgia', {cirurgias});
    }catch(error){
        console.error('Erro ao buscar cirurgias:', error);
        res.status(500).send('Erro ao buscar cirurgias');
    }
});

//-----------------------------------------cadastrar------------------------------------------------------------//
//pacientes
app.get('/pacientes/novo', (req,res) => {
    res.render('cadastrarPaciente');
});

app.post('/pacientes', async (req,res) => {
    try{
        await paciente.create({
            nome: req.body.nome,
            idade: req.body.idade,
            cpf: req.body.cpf
        });
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao cadastrar paciente:', error);
        res.status(500).send('Erro ao cadastrar paciente');
    }
    const {nome, idade, cpf} = req.body;
    console.log(nome)
    console.log(idade)
    console.log(cpf)
    const novoPaciente = {
        id_paciente: pacientes.length + 1,
        nome: nome,
        idade: idade,
        cpf: cpf
    };
    pacientes.push(novoPaciente);
    res.render('listarPaciente', {pacientes});
});

//medicos
app.get('/medicos/novo', (req,res) => {
    res.render('cadastrarMedico')
});

app.post('/medicos', async (req,res) => {
    try{
        await medico.create({
            nome: req.body.nome,
            idade: req.body.idade,
            especializacao: req.body.especializacao
        });
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao cadastrar médico:', error);  
        res.status(500).send('Erro ao cadastrar médico');
    }
    const {nome, idade, especializacao} = req.body;
    const novoMedico = {
        id_medico: medicos.length + 1,
        nome: nome,
        idade: idade,
        especializacao: especializacao
    };
    medicos.push(novoMedico);
    res.render('listarMedico', {medicos});
});

//agendamentos
app.get('/agendamentos/novo', (req,res) => {
    res.render('cadastrarAgendamento')
});

app.post('/agendamentos', async (req,res) => {
    try{
        await agendamento.create({
            nome_paciente: req.body.nome,
            hora_inicio: req.body.hora_inicio,
            especializacao: req.body.especializacao
        });
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao cadastrar agendamento:', error);
        res.status(500).send('Erro ao cadastrar agendamento');
    }
    const {nome_paciente, hora_inicio, especializacao} = req.body;
    const novoAgendamento = {
        id_agendamento: agendamentos.length + 1,
        nome_paciente: nome,
        hora_inicio: hora_inicio,
        especializacao: especializacao
    };
    agendamentos.push(novoAgendamento);
    res.render('listarAgendamento', {agendamentos});
});

//bancos de sangue
app.get('/bancosSangue/novo', (req,res) => {
    res.render('cadastrarBancoSangue')
});

app.post('/bancosSangue', async (req,res) => {
    try{
        await bancoSangue.create({
            tipo_sangue: req.body.tipo_sangue,
            quantidade: req.body.quantidade
        });
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao cadastrar banco de sangue:', error);
        res.status(500).send('Erro ao cadastrar banco de sangue');
    }
    const {tipo_sangue, quantidade} = req.body;
    const novoBancoSangue = {
        id_sangue: bancosSangue.length + 1,
        tipo_sangue: tipo_sangue,
        quantidade: quantidade
    };
    bancosSangue.push(novoBancoSangue);
    res.render('listarBancoSangue', {bancosSangue});
});

//internamentos
app.get('/internamentos/novo', (req,res) => {
    res.render('cadastrarInternamento')
});

app.post('/internamentos', async (req,res) => {
    try{
        await internamento.create({
            nome_paciente: req.body.nome_paciente,
            quarto: req.body.quarto,
            data_entrada: req.body.data_entrada
        });
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao cadastrar internamento:', error);
        res.status(500).send('Erro ao cadastrar internamento');
    }
    const {nome_paciente, quarto, data_entrada} = req.body;
    const novoInternamento = {
        id_internamento: internamentos.length + 1,
        nome_paciente: nome_paciente,
        quarto: quarto,
        data_entrada: data_entrada
    };
    internamentos.push(novoInternamento);
    res.render('listarInternamento', {internamentos});
});

//cirurgias
app.get('/cirurgias/novo', (req,res) => {
    res.render('cadastrarCirurgia')
});

app.post('/cirurgias', async (req,res) => {
    try{
        await cirurgia.create({
            nome_paciente: req.body.nome_paciente,
            tipo_cirurgia: req.body.tipo_cirurgia,
            data_cirurgia: req.body.data_cirurgia
        });
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao cadastrar cirurgia:', error);
        res.status(500).send('Erro ao cadastrar cirurgia');
    }
    const {nome_paciente, tipo_cirurgia, data_cirurgia} = req.body;
    const novaCirurgia = {
        id_cirurgia: cirurgias.length + 1,
        nome_paciente: nome_paciente,
        tipo_cirurgia: tipo_cirurgia,
        data_cirurgia: data_cirurgia
    };
    cirurgias.push(novaCirurgia);
    res.render('listarCirurgia', {cirurgias});
});

//-----------------------------------------detalhar------------------------------------------------------------//
//pacientes
app.get('/pacientes/:id_paciente', async (req,res) => {
    try{
        const pacienteDetalhar = await paciente.findByPk(req.params.id_paciente, {raw: true});
        res.render('detalharPaciente', {paciente: pacienteDetalhar});
    }catch(error){
        console.error('Erro ao buscar paciente:', error);
        res.status(500).send('Erro ao buscar paciente');
    }

});

//medicos
app.get('/medicos/:id_medico', async (req,res) => {
    try{
        const medicoDetalhar = await medico.findByPk(req.params.id_medico, {raw: true});
        res.render('detalharMedico', {medico: medicoDetalhar});
    }catch(error){
        console.error('Erro ao buscar médico:', error);
        res.status(500).send('Erro ao buscar médico');
    }
});

//agendamentos
app.get('/agendamentos/:id_agendamento', async (req,res) => {
    try{
        const agendamentoDetalhar = await agendamento.findByPk(req.params.id_agendamento, {raw: true});
        res.render('detalharAgendamento', {agendamento: agendamentoDetalhar});
    }catch(error){
        console.error('Erro ao buscar agendamento:', error);
        res.status(500).send('Erro ao buscar agendamento');
    }
});

//bancos de sangue
app.get('/bancosSangue/:id_sangue', async (req,res) => {
    try{
        const bancoSangueDetalhar = await bancoSangue.findByPk(req.params.id_sangue, {raw: true});
        res.render('detalharBancoSangue', {bancoSangue: bancoSangueDetalhar});
    }catch(error){
        console.error('Erro ao buscar banco de sangue:', error);
        res.status(500).send('Erro ao buscar banco de sangue');
    }
});

//internamentos
app.get('/internamentos/:id_internamento', async (req,res) => {
    try{
        const internamentoDetalhar = await internamento.findByPk(req.params.id_internamento, {raw: true});
        res.render('detalharInternamento', {internamento: internamentoDetalhar});
    }catch(error){
        console.error('Erro ao buscar internamento:', error);
        res.status(500).send('Erro ao buscar internamento');
    }
});

//cirurgias
app.get('/cirurgias/:id_cirurgia', async (req,res) => {
    try{
        const cirurgiaDetalhar = await cirurgia.findByPk(req.params.id_cirurgia, {raw: true});
        res.render('detalharCirurgia', {cirurgia: cirurgiaDetalhar});
    }catch(error){
        console.error('Erro ao buscar cirurgia:', error);
        res.status(500).send('Erro ao buscar cirurgia');
    }
});

//-----------------------------------------editar------------------------------------------------------------//
//pacientes
app.get('/pacientes/:id_paciente/editar', async (req,res) => {
    try{
        const pacienteEditar = await pacientes.findByPk(req.params.id_paciente, {raw: true});
        res.render('editarPaciente', {paciente: pacienteEditar});
    }catch(error){
        console.error('Erro ao buscar paciente:', error);
        res.status(500).send('Erro ao buscar paciente');
    }
});

app.post('/pacientes/:id_paciente', async (req,res) => {
    try{
        let pacienteAtualizar = await paciente.findByPk(req.params.id_paciente);
        pacienteAtualizar.nome = req.body.nome;
        pacienteAtualizar.idade = req.body.idade;
        pacienteAtualizar.cpf = req.body.cpf;
        await pacienteAtualizar.save();
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao atualizar paciente:', error);
        res.status(500).send('Erro ao atualizar paciente'); 
    }
});

//medicos
app.get('/medicos/:id_medico/editar', async (req,res) => {
    try{
        const medicoEditar = await medicos.findByPk(req.params.id_medico, {raw: true});
        res.render('editarMedico', {medico: medicoEditar});
    }catch(error){
        console.error('Erro ao buscar médico:', error);
        res.status(500).send('Erro ao buscar médico');
    }
});

app.post('/medicos/:id_medico', async(req,res) => {
    try{
        let medicoAtualizar = await medico.findByPk(req.params.id_medico);
        medicoAtualizar.nome = req.body.nome;
        medicoAtualizar.idade = req.body.idade;
        medicoAtualizar.especializacao = req.body.especializacao;
        await medicoAtualizar.save();
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao atualizar médico:', error);
        res.status(500).send('Erro ao atualizar médico');
    }
});

//agendamentos
app.get('/agendamentos/:id_agendamento/editar', async (req,res) => {
    try{
        const agendamentoEditar = await agendamentos.findByPk(req.params.id_agendamento, {raw: true});
        res.render('editarAgendamento', {agendamento: agendamentoEditar});
    }catch(error){
        console.error('Erro ao buscar agendamento:', error);
        res.status(500).send('Erro ao buscar agendamento');
    }
});

app.post('/agendametnos/:id_agendamento', async (req,res) => {
    try{
        let agendamentoAtualizar = await agendamento.findByPk(req.params.id_agendamento);
        agendamentoAtualizar.nome_paciente = req.body.nome;
        agendamentoAtualizar.hora_inicio = req.body.hora_inicio;
        agendamentoAtualizar.especializacao = req.body.especializacao;
        await agendamentoAtualizar.save();
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).send('Erro ao atualizar agendamento');
    }
});

//bancos de sangue
app.get('/bancosSangue/:id_sangue/editar', async (req,res) => {
    try{
        const bancoSangueEditar = await bancosSangue.findByPk(req.params.id_sangue, {raw: true});
        res.render('editarBancoSangue', {bancoSangue: bancoSangueEditar});
    }catch(error){
        console.error('Erro ao buscar banco de sangue:', error);
        res.status(500).send('Erro ao buscar banco de sangue');
    }
});

app.post('/bancosSangue/:id_sangue', async (req,res) => {
    try{
        let bancoSangueAtualizar = await bancoSangue.findByPk(req.params.id_sangue);
        bancoSangueAtualizar.tipo_sangue = req.body.tipo_sangue;
        bancoSangueAtualizar.quantidade = req.body.quantidade;
        await bancoSangueAtualizar.save();
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao atualizar banco de sangue:', error);
        res.status(500).send('Erro ao atualizar banco de sangue');
    }
});

//internamentos
app.get('/internamentos/:id_internamento/editar', async (req,res) => {
    try{
        const internamentoEditar = await internamentos.findByPk(req.params.id_internamento, {raw: true});
        res.render('editarInternamento', {internamento: internamentoEditar});
    }catch(error){
        console.error('Erro ao buscar internamento:', error);
        res.status(500).send('Erro ao buscar internamento');
    }
});

app.post('/internamentos/:id_internamento', async (req,res) => {
    try{
        let internamentoAtualizar = await internamento.findByPk(req.params.id_internamento);
        internamentoAtualizar.nome_paciente = req.body.nome_paciente;
        internamentoAtualizar.quarto = req.body.quarto;
        internamentoAtualizar.data_entrada = req.body.data_entrada;
        await internamentoAtualizar.save();
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao atualizar internamento:', error);
        res.status(500).send('Erro ao atualizar internamento');
    }
});

//cirurgias
app.get('/cirurgias/:id_cirurgia/editar', async (req,res) => {
    try{
        const cirurgiaEditar = await cirurgias.findByPk(req.params.id_cirurgia, {raw: true});
        res.render('editarCirurgia', {cirurgia: cirurgiaEditar});
    }catch(error){
        console.error('Erro ao buscar cirurgia:', error);
        res.status(500).send('Erro ao buscar cirurgia');
    }
});
app.post('/cirurgias/:id_cirurgia', async (req,res) => {
    try{
        let cirurgiaAtualizar = await cirurgia.findByPk(req.params.id_cirurgia);
        cirurgiaAtualizar.nome_paciente = req.body.nome_paciente;
        cirurgiaAtualizar.tipo_cirurgia = req.body.tipo_cirurgia;
        cirurgiaAtualizar.data_cirurgia = req.body.data_cirurgia;
        await cirurgiaAtualizar.save();
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao atualizar cirurgia:', error);
        res.status(500).send('Erro ao atualizar cirurgia');
    }
});

//-----------------------------------------excluir------------------------------------------------------------//
//pacientes
app.post('/pacientes/:id_paciente/excluir', async(req,res) => {
    try{
        let pacienteExcluir = await paciente.findByPk(req.params.id_paciente);
        await pacienteExcluir.destroy();
        res.redirect('/pacientes');
    }catch(error){
        console.error('Erro ao excluir paciente:', error);
        res.status(500).send('Erro ao excluir paciente');
    }
});

//medicos
app.post('/medicos/:id_medico/excluir', async(req,res) => {
    try{
        let medicoExcluir = await medico.findByPk(req.params.id_medico);
        await medicoExcluir.destroy();
        res.redirect('/medicos');
    }catch(error){
        console.error('Erro ao excluir médico:', error);
        res.status(500).send('Erro ao excluir médico');
    }
});

//agendamentos
app.post('/agendamentos/:id_agendamento/excluir', async (req,res) => {
    try{
        let agendamentoExcluir = await agendamento.findByPk(req.params.id_agendamento);
        await agendamentoExcluir.destroy();
        res.redirect('/agendamentos');
    }catch(error){
        console.error('Erro ao excluir agendamento:', error);
        res.status(500).send('Erro ao excluir agendamento');
    }
});

//bancos de sangue
app.post('/bancosSangue/:id_sangue/excluir', async (req,res) => {
    try{
        let bancoSangueExcluir = await bancoSangue.findByPk(req.params.id_sangue);
        await bancoSangueExcluir.destroy();
        res.redirect('/bancosSangue');
    }catch(error){
        console.error('Erro ao excluir banco de sangue:', error);
        res.status(500).send('Erro ao excluir banco de sangue');
    }
});

//internamentos
app.post('/internamentos/:id_internamento/excluir', async (req,res) => {
    try{
        let internamentoExcluir = await internamento.findByPk(req.params.id_internamento);
        await internamentoExcluir.destroy();
        res.redirect('/internamentos');
    }catch(error){
        console.error('Erro ao excluir internamento:', error);
        res.status(500).send('Erro ao excluir internamento');
    }
});

//cirurgias
app.post('/cirurgias/:id_cirurgia/excluir', async (req,res) => {
    try{
        let cirurgiaExcluir = await cirurgia.findByPk(req.params.id_cirurgia);
        await cirurgiaExcluir.destroy();
        res.redirect('/cirurgias');
    }catch(error){
        console.error('Erro ao excluir cirurgia:', error);
        res.status(500).send('Erro ao excluir cirurgia');
    }
});

db.sync()
    .then(() => {
        console.log('Banco de dados sincronizado.');
    })
    .catch((e) => {
        console.error('Erro ao sincronizar o banco de dados:', e);
    });

app.listen(port,() => {
    console.log(`Servidor em execução: http://localhost:${port}`)
})