const express = require('express');
const mysql = require('mysql2'); // ou 'mysql'
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// --- CONEXÃO DO MYSQL ---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'minharotina'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Banco de Dados MySQL Conectado com sucesso!');
  }
});

// --- ROTA DE LOGIN ---
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'E-mail não encontrado.' });
    }

    const usuario = results[0];

    if (senha !== usuario.senha) {
      return res.status(400).json({ error: 'Senha incorreta.' });
    }

    const nomeGerado = usuario.email.split('@')[0];
    const nomeFormatado = nomeGerado.charAt(0).toUpperCase() + nomeGerado.slice(1);

    return res.json({ 
      message: 'Logado com sucesso!', 
      email: usuario.email,
      nome: nomeFormatado
    });
  });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000 em 0.0.0.0');
});