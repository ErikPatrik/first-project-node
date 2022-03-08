import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

// aqui precisamos receber
interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    // recebemos o data que é um Request e retornamos o User da Promise
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        // regra pra não criar usuário com e-mail duplicado
        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('E-mail address already');
        }

        // aqui criptografamos a senha
        const hashedPassword = await hash(password, 8);

        // agora criamos a entidade do usuário
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // agora salvamos o usuário na base de dados
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
