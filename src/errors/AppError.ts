class AppError {
    // propriedades que eu consigo acessar fora da classe
    public readonly message: string;

    public readonly statusCode: number; //código http de erro

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
