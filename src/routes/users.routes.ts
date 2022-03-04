import { Router } from 'express';
// importamos o service
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// AQUI CRIAMOS A ROTA PRA INSERÇÃO
usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // deletamos a senha do retorno do usuário, pra não visualizar a senha
        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({
            error: err.message,
        });
    }
});

export default usersRouter;
