import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { login, name, password } = request.body;
  const createUserService = container.resolve(CreateUserService);
  const newUser = await createUserService.execute({ login, password });

  return response.json(newUser);
});

export default usersRouter;
