import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { login, name, password } = request.body;
  const createUserService = new CreateUserService();
  const newUser = await createUserService.execute({ login, password });

  return response.json(newUser);
});

export default usersRouter;
