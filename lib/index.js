const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pathInput = path.join(__dirname, './src/input');
const pathOutput = path.join(__dirname, './src/output');

const folders = []
let counter = 0, total = 0;

const readFolder = (path) => {
    return {
        path,
        folder: fs.readdirSync(path)
    }
}

const getAllFoldersToArray = (data) => {
    const { folder, path } = data;

    folder.forEach((item) => {
        folders.push({
            path,
            name: item,
            type: item.includes('.') ? item.split('.')[1] : 'folder'
        });

        if (!item.includes('.')) {
            const newPath = `${path}/${item}`;
            const newFolder = readFolder(newPath);

            getAllFoldersToArray(newFolder);
        }
    })
}

const createImage = async (options) => {
  const { input, name } = options;
  const output = input.replace('input', 'output');

  const image = sharp(`${input}/${name}`);
  
  fs.mkdirSync(output, { recursive: true });
  if (fs.existsSync(`${output}/${name}`)) {
    fs.rmSync(`${output}/${name}`);
  }
  
  const metatadata = await image.metadata();
  if (metatadata.width > 1920) {
    image.resize(1920);
  }

  return {
    image,
    path: output
  };
}

const compressImage = async (input, name) => {
  const { image, path } = await createImage({ input, name });
  const regex = /(jpg|png|jpeg)/g

  image.jpeg({ quality: 95 }).toFile(`${path}/${name}`);
  image.webp({ quality: 95 }).toFile(`${path}/${name.replace(regex, 'webp')}`);
}

const start = async (dir ,options={replace:false}) => {
  const initialDir = readFolder(dir);
  
  getAllFoldersToArray(initialDir);

  let images = folders.filter(({type}) => (type === 'jpg' || type === 'png' || type === 'jpeg'));

  if (!options.replace) {
      images = images.filter(({name, path, type}) => {
          const exist = folders.filter((oldItem) => (
              oldItem.path === path && oldItem.name === name.replace(type, 'webp')
          ))[0];

          return !exist;
      });
  }

  total = images.length;
  images.forEach(async (input) => {
    await compressImage(input.path, input.name);
  })
}

const copyDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((item) => {
    const path = `${src}/${item}`;
    const newPath = `${dest}/${item}`;

    if (fs.lstatSync(path).isDirectory()) {
      copyDir(path, newPath);
    } else {
      fs.copyFileSync(path, newPath);
    }
  })
}

const execute = async (dir, options) => {
  /*
    1. Vai verificar o diretório da variavel e retornar um array com todos os arquivos e pastas e salvar na variável public
    2. Vai copiar os arquivos e colocar eles dentro de "./src/input"
    3. Vai executar o start para que ele converta os arquivos e os coloque dentro de "./src/output"
    4. Vai copiar os arquivos de "./src/output" e colocar eles dentro do diretório da variável
    5. Vai copiar os arquivos de "./src/input" e colocar eles dentro do diretório da variável + "/backup"

  */
  fs.rmdirSync(pathInput, { recursive: true });
  fs.mkdirSync(pathInput, { recursive: true });

  fs.rmdirSync(pathOutput, { recursive: true });
  fs.mkdirSync(pathOutput, { recursive: true });

  copyDir(dir, pathInput);

  setTimeout(async () => {
    await start(pathInput, options);

    setTimeout(() => {
      copyDir(pathOutput, dir);
      copyDir(pathInput, `${dir}-backup`);
      
      console.log(`finished, ${counter} images compressed`);
    }, 500);
  }, 100);

}
execute('./public', {replace: false});

module.exports = {
  execute
}