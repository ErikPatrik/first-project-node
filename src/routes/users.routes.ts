import { Router } from 'express';
// importamos os services
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
// importamos a parte de upload de arquivos
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

// ATUALIZAMOS UMA ÚNICA INFORMAÇÃO DO USUÁRIO
// É NECESSÁRIO AUTENTICAÇÃO
// single: upload de um único arquivo
// array: upload de vários arquivos
// any: um único arquivo ou vários
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file?.filename,
            });

            delete user.password;

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }

        return response.json({ ok: true });
    }
);

export default usersRouter;
