require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

const User = require('./models/User');

async function checkToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ message: 'Token inválido!' });
  }
}

app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.status(200).json({ user });
});

app.post('/auth/register', async (req, res) => {
  const {name, email, password, confirmPassword} = req.body;

  if (!name) return res.status(422).json({ message: 'O nome é obrigatório!' });
  if (!email) return res.status(422).json({ message: 'O e-mail é obrigatório!' });
  if (!password) return res.status(422).json({ message: 'A senha é obrigatória!' });

  if (password !== confirmPassword) {
    return res.status(422).json({ message: 'As senhas não conferem!' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({ message: 'E-mail já cadastrado!' });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash
  });

  try {
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ message: 'O email é obrigatório!' });
  if (!password) return res.status(422).json({ message: 'A senha é obrigatória!' });

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ message: 'Usuário não encontrado!' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: 'Senha inválida!' });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    );

    res.status(200).json({ message: 'Autenticação realizada com sucesso!', token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.post('/user/generateCat', checkToken, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const user = req.user; // Acesso ao usuário autenticado
    console.log(user);

    // Cria um objeto com as informações da nova imagem de gato
    const newCatImage = {
      generationDate: new Date().toString(), // Data atual
      imageUrl: imageUrl
    };

    // Adiciona a nova imagem de gato ao array de catImages do usuário
    user.catImages.push(newCatImage);

    // Salva as alterações no banco de dados
    await user.save();

    res.status(200).json({ message: 'Gato gerado e adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao gerar e adicionar o gato:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.1hctbd8.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
  app.listen(8080);
  console.log('Conectou no Mongo');
}).catch(err => console.log(err));
