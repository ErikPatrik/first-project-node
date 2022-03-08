import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        // É verificado primeiro se o e-mail do usuário é válido
        const usersRepository = getRepository(User);

        // Aqui temos acessos aos métodos o TypeORM
        const user = await usersRepository.findOne({ where: { email } });

        // Se não achar o usuário
        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        // user.password - Senha criptografada
        // password - Senha não criptografada (a que tentou logar)

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        // Usuário autenticado

        // Agora, vamos assinar nosso token, nao sendo a senha
        // primeiro parâmetro é o payload
        // segunda parâmetro, é uma chave secreta// md5 learn fs
        // terceiro parâmetro são configurações do token, como:
        // -subjetct: qual usuário gerou o ID
        // -expiresIn: tempo de expiração
        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
