// AQUI VAMOS VERIFICAR SE O USUÁRIO JA TEM IMAGEM PRA SUBSTITUIR A MESMA
// VALIDAR SE O USUÁRIO EXISTE
import { getRepository } from 'typeorm';
import path from 'path';

import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        // Vamos verificar se o ID existe
        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }

        // se o usuário já tinha um avatar, removemos o anterior
        if (user.avatar) {
            // aqui é unido 2 caminhos, o diretório e o arquivo que queremos remover
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );
            // o "stat", aqui verificamos o status de um arquivo, somente se ele existir
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
            );

            // se o arquivo existir, é removido usando unlink
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // aqui atualizamos
        user.avatar = avatarFilename;

        // save utilizado para criar, e também atualizar se caso o ID existir
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
