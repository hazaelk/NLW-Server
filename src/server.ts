import express from 'express';
import { routes } from './routes';
import cors from 'cors';

/* GET, POST, PUT, PATCH, DELETE
// GET = Buscar informações
// POST = Cadastro de informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação
*/
// SQLite { cria arquivo local }
// Prisma { transf js em sql }
const app = express();

app.use(cors()) //conseguimos falar exatamente quais endereços do front poderá consumir o backend
app.use(express.json()); //comando executado primeiro e sempre!
app.use(routes);

app.listen(3333, () => {
  console.log('HTTP Server Running!');
});

