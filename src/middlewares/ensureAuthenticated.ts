// DEFINIMOS DE FORMA MANUAL OS TIPOS DO REQUEST, RESPONSE E NEXT
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

// AQUI COMEÇAMOS EXPORTANDO UMA FUNÇÃO
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // validação do token JWT

    // Primeiro: pegar o token da requisição, que vai/vem pelo Header
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing', 401);
    }

    // Vem assim: Bearer xxxxxxxxxx
    // dividimos o que vem e criamos um array, dedsta forma
    // primeira posição não queremos
    const [, token] = authHeader.split(' ');

    // verificamos se o token é válido
    // passamos o token e o secret
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // forçamos que o decoded é do tipo TokenPayload
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        // se retornou um usuário válido, dentro dele temos o payload
        // e, podemos continuar usando o sistema
        return next();
    } catch {
        throw new AppError('Invalid JWT Token', 401);
    }
}
