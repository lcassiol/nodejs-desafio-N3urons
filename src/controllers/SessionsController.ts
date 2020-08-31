import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { login, password } = request.body;
      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        login,
        password,
      });

      delete user.password;

      return response.json({ user, token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
