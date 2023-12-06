# PixiLite

O objetivo desse modulo é simplificar meu dia a dia, como desenvolvedor frontend, frequentemente recebo projetos para fazer que não tem imagens em WEBP ou que estão com imagens ridiculamente pesadas, e é necessario comprimir e criar as versões WEBP para melhor performace, e uma boa pontuação no "[PageSpeed Insights](https://pagespeed.web.dev)".


## Funcionamento
* Recomendo fortemente que você gere um backup das imagens antes de usar por precaução, porque como é um plugin pessoal, ele não foi la muito testado, até agora não rolou nenhum problema, mas pode rolar ❤️ *

O modulo funciona da seguinte forma, você pode instalar ele globalmente, e passar o Path da sua "public" com as imagens, ou a forma que eu prefiro é instalar ele localmente, e colocar ele pra iniciar junto ao "Nuxt Generate" (Na empresa que trabalho utilizamos nuxt).

### Uso
    1. globalmente
    - $ npm install -g pixilite
    - $ pixilite --src=[seu-caminho]

    2. localmente
    - $ npm install pixilite
    ```
      #package.json
        ...
        "scripts": {
            "generate": "nuxt generate && pixelite --src=/.output/public",
        }
        ...
    ```

~~Ele vai gerar os arquivos e colocar devolta na "public", porem vai criar um "public-backup" com os arquivos antigos.~~

Ele não gera mais backup dos arquivos e substitui a imagem original por uma versão comprimida, fica a seu cargo criar um backup se julgar necessário, removi essa função pois o "pixelite" foi projetado para funcionar com Framework então eu simplesmente passei o codigo para editar a "dist gerada" e não a pasta original, dessa forma não afeta meus arquivos e não pesa o projeto em produção. ❤️

### Argumentos
* --src=./public: Diretorio onde estão as imagens.
