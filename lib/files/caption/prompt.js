"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptAltRules = exports.promptWriteAlt = void 0;
exports.promptWriteAlt = `
    Escreva o 'alt' dessa imagem, seguindo as regras de 'alt' estabelecidadas no brasil, 
    porém tendo em mente o público são pessoas cegas que não conseguem identificar cada 
    elemento na tela por isso precisa ser bastante descritivo.`;
exports.promptAltRules = `
    Tenha em mente que o 'alt' precisa seguir as seguintes regras:
    O atributo ALT deve possuir as seguintes características:
    - Ser acurado e equivalente, representar o mesmo conteúdo e função da imagem;
    - Ser sucinto, a função e/ou conteúdo devem ser descritas de forma sintética, poucas
    palavras ou uma frase curta.
    - Não ser redundante ou prover a mesma informação já apresentada no contexto da
    imagem.
    - Não iniciar o texto alternativo com “imagem de...”, “gráfico de...” ou “foto de...”
    para descrever a imagem. É desnecessária e redundante a informação de que
    aquele conteúdo apresentado é uma imagem.`;
