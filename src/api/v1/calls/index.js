const express = require('express');
const realm = require('../../../services/realm');
const messageHandler = require('../../../messageHandler');

const app = module.exports = express.Router();

const handle = (req, res, next) => {
  const { id } = req.params;

  if (!id) return next();

  const client = realm.getClientById(id);

  const { type, dst, payload } = req.body;

  const message = {
    type,
    src: id,
    dst,
    payload
  };

  messageHandler(client, message);

  res.sendStatus(200);
};

app.post('/offer', handle);

app.post('/candidate', handle);

app.post('/answer', handle);

app.post('/leave', handle);
