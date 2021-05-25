import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import NegocioException from '@shared/exceptions/NegocioException';
import '@shared/infra/typeorm';
import '@shared/config/DIContainer';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof NegocioException) {
    return response.status(error.statusCode).json({
      status: 'Erro de Regra de Negócio',
      message: Array.from(error.messages),
      'Tecnical Message': error.developermessage,
    });
  }
  return response.status(500).json({
    status: 'Erro de Servidor',
    message: 'Internal server error. Please contact the suport.',
    'Tecnical Message': error.message,
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on Port 3333!');
});
