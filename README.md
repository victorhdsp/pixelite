# Pixelite

![GitHub repo size](https://img.shields.io/github/repo-size/victorhdsp/pixelite?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/victorhdsp/pixelite?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/victorhdsp/pixelite?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/victorhdsp/pixelite?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/victorhdsp/pixelite?style=for-the-badge)

<img src="https://github.com/victorhdsp/pixelite/blob/master/readme-hero.jpg?raw=true" alt="Coisas de dormir, mascara, remedio, agua...">

> Pixelite é um módulo NPM com a missão de converter imagens de png ou jpg para os formatos web, facilitando a vida de quem trabalha com servidores estáticos.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Conversão dos arquivos para o formato web.
  - [x] Adicionar sinalização de que a aplicação esta rodando de forma constante.
- [x] Criação de um backup das imagens para caso de problemas.
- [x] Modificação dos arquivos estáticos do site, substituindo `<img>` por `<picture>` com seus devidos `<sources>`.
- [x] Implementação em tempo real para JSX.
- [x] Utilização de inteligência artificial para construir os "alts", melhorando a acessibilidade e dando menos trabalho.
- [x] Persistir as informações já criadas.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente de `node.js`
- Você instalou a versão mais recente de `npm`

## 🚀 Instalando Pixelite

Para instalar o pixelite, siga estas etapas:

Linux e macOS:

```
$ npm install -D pixelite
```

## ☕ Usando o Pixelite

O pixelite foi pensado para ser usado nos arquivos estáticos, os que vão para a produção direto para o servidor.

```
$ pixelite src=<pasta dos arquivos>
```

Pode ser uma boa idéia e é o que eu faço no meus projetos, adicionar o pixelite no processo de build, no caso do **React** ficaria algo como `pixelite src=./out` e no caso do **Vue** `pixelite src=./public`

## 📫 Contribuindo para o Pixelite

Para contribuir com pixelite, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o título do link">
        <img src="https://avatars3.githubusercontent.com/u/83098581" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Victor Hugo</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 😄 Seja um dos contribuidores

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir.

## 📝 Licença

Esse projeto está sob a licença Apache 2.0. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
