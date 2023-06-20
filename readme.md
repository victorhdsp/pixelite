# PixiLite

O objetivo desse modulo é simplificar meu dia a dia, como desenvolvedor frontend, frequentemente recebo projetos para fazer que não tem imagens em WEBP ou que estão com imagens ridiculamente pesadas, e é necessario comprimir e criar as versões WEBP para melhor performace, e uma boa pontuação no "PageSpeed Insights"[https://pagespeed.web.dev].

## Funcionamento

O modulo funciona da seguinte forma, você pode instalar ele globalmente, e passar o Path da sua "public" com as imagens, ou a forma que eu prefiro é instalar ele localmente, e colocar ele pra iniciar junto ao "Nuxt Generate" (Na empresa que trabalho utilizamos nuxt).

### Uso
- $npm install -g pixilite
- pixilite --src=<caminho-da-public>

Ele vai gerar os arquivos e colocar devolta na "public", porem vai criar um "public-backup" com os arquivos antigos.

### Argumentos
* --src=./public: Diretorio onde estão as imagens.
* --replace=false: Substitui as imagens que já são webp dentro do diretorio, por padrão as imagens que já tem uma versão WEBP são ignoradas. 