import path from 'path';
import crypto from 'crypto';
// ARMAZENA CONFIGURAÇÕES DE IMAGENS OU ARQUIVOS DO PROJETO
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    // Opção acessível para saber onde os arquivos ficam
    directory: tmpFolder,
    // Armazenar as imagens que o usuário fez no aplicativo no próprio projeto
    storage: multer.diskStorage({
        // __dirname é o diretório do PC até o arquivo, ai voltamos duas pastas até o tmp
        destination: tmpFolder,
        filename(request, file, callback) {
            // geramos um hash aleatório
            const fileHash = crypto.randomBytes(10).toString('hex');
            // assim, montamos o nome com o hash na frente
            const filename = `${fileHash}-${file.originalname}`;

            // nulo porque não recebeu nenhum erro, e o nome do arquivo
            return callback(null, filename);
        },
    }),
};
