import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { login, name, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const newUser = await createUserService.execute({ login, password });

    return response.json(newUser);
  }
}
