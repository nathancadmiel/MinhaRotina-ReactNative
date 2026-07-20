const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o Banco de Dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Ajuste se o seu usuário do MySQL for diferente
  password: '',          // Coloque a senha do seu banco de dados aqui
  database: 'minharotina'
});

db.connect(err => {
  if (err) console.error('Erro ao conectar no MySQL:', err);
  else console.log('Banco de Dados MySQL Conectado com sucesso!');
});

// ROTA DE CADASTRO (Senha simples sem criptografia)
app.post('/register', (req, res) => {
  const { email, senha } = req.body;
  
  db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], (err, result) => {
    if (err) return res.status(400).json({ error: 'E-mail já cadastrado ou erro interno.' });
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

// ROTA DE LOGIN (Comparando senha simples direto)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'E-mail não encontrado.' });
    }

    const usuario = results[0];

    // Compara o texto direto que você digitou com o que está no banco
    if (senha !== usuario.senha) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    // Retorna o e-mail para o App salvar e dar as boas-vindas
    return res.json({ message: 'Logado com sucesso!', email: usuario.email });
  });
});

// ==================== NOVAS ROTAS DE TAREFAS ====================

// Listar tarefas de um usuário específico
app.get('/tarefas/:email', (req, res) => {
  const { email } = req.params;
  db.query('SELECT id, texto AS nome, concluida FROM tarefas WHERE email_usuario = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    
    // Converte o campo "concluida" de 0/1 do MySQL para true/false do Javascript
    const formatadas = results.map(t => ({ ...t, concluida: !!t.concluida }));
    return res.json(formatadas);
  });
});

// Adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { email_usuario, texto } = req.body;
  db.query('INSERT INTO tarefas (email_usuario, texto) VALUES (?, ?)', [email_usuario, texto], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao salvar tarefa.' });
    return res.status(201).json({ id: result.insertId, nome: texto, concluida: false });
  });
});

// Concluir uma tarefa
app.put('/tarefas/:id/concluir', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE tarefas SET concluida = TRUE WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao concluir tarefa.' });
    return res.json({ message: 'Tarefa concluída com sucesso!' });
  });
});

// Excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tarefas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
    return res.json({ message: 'Tarefa deletada com sucesso!' });
  });
});

// Escuta em 0.0.0.0 para evitar bloqueios de rede no Expo Web
app.listen(3000, '0.0.0.0', () => console.log('Servidor rodando na porta 3000 em 0.0.0.0'));