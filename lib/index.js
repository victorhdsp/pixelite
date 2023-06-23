const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

const pathInput = path.join(__dirname, './src/input');
const pathOutput = path.join(__dirname, './src/output');
const images = /(png)|(jpg)|(jpeg)/g

const deleteDir = async (dir) => {
  try {
    await fs.readdir(dir, { recursive: true }, () => { })
    await fs.rmdir(dir, { recursive: true }, () => { })
  } catch (error) {
    return []
  }
}

const copyFile = async (src, dest, name) => {
  try {
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
  } catch (error) {
    await fs.mkdir(dest, { recursive: true }, () => { })
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
  }
}

const readDir = async (dir) => {
  return {
    path: dir,
    items: await fs.readdir(dir)
  }
}

const readAllDir = async (folder, options) => {
  const { path, items } = folder
  options = {
    callback: () => { },
    archives: [],
    ...options
  }

  for (let i = 0; i < items.length; i++) {
    const name = items[i];
    const type = name.split('.')[1] || 'folder'

    if (type === 'folder') {
      const folder = await readDir(`${path}/${name}`)
      const archives = await readAllDir(folder)
      archives.forEach(archive => {
        options.archives.push(archive)
      });
    } else {
      options.callback({ path, name, type })
      options.archives.push({ path, name, type })
    }
  }

  return options.archives
}

const convertImage = async (path, name, type) => {
  const relativePath = path.replace(pathInput, '')

  const execute = async () => {
    const image = await sharp(`${path}/${name}`)

    if (typeof image[type] !== 'function') {
      console.log(`error converting ${path}/${name}`)
      type = 'png'
    }

    const output = `${pathOutput}${relativePath}/${name.replace(/\.[^/.]+$/, '')}.${type}`
    await image
      .resize(1000, 1000, {
        fit: 'inside',
        withoutEnlargement: true
      })
      [type]({ quality: 90 })
      .toFile(output)
  }

  try {
    await execute()
  } catch (error) {
    await fs.mkdir(`${pathOutput}${relativePath}`, { recursive: true }, () => { })
    await execute()
  }
}

const start = async (dir, options) => {
  options = {
    replace: false,
    ...options
  }
  const inputFolder = await readDir(pathInput)
  const inputItems = (await readAllDir(inputFolder)).filter(item => item.type.match(images))

  for (let i = 0; i < inputItems.length; i++) {
    const { path, name } = inputItems[i];
    await convertImage(path, name, 'png')
    await convertImage(path, name, 'webp')
    await convertImage(path, name, 'avif')
  }

  const outputFolder = await readDir(pathOutput)
  const outputItems = (await readAllDir(outputFolder))

  for (let i = 0; i < outputItems.length; i++) {
    const { path, name } = outputItems[i];
    const relativePath = path.replace(pathOutput, '')
    
    await fs.copyFile(`${path}/${name}`, `${dir}${relativePath}/${name}`)
  }
}

const execute = async (dir, options) => {
  dir = dir.replace(/\/$/, '')
  const backupDir = `${dir}-backup`;

  await deleteDir(backupDir)
  await fs.mkdir(backupDir, { recursive: true }, () => { })

  await deleteDir(pathInput)
  await fs.mkdir(pathInput, { recursive: true }, () => { })

  await deleteDir(pathOutput)
  await fs.mkdir(pathOutput, { recursive: true }, () => { })

  if (await readDir(pathInput) && await readDir(pathOutput)) {
    const folder = await readDir(dir)
    const items = (await readAllDir(folder)).filter(item => item.type.match(images))

    for (let i = 0; i < items.length; i++) {
      const {path, name} = items[i];
      const relativePath = path.replace(dir, '')

      await copyFile(`${dir}${relativePath}/`, `${backupDir}${relativePath}/`, name)
      await copyFile(`${dir}${relativePath}/`, `${pathInput}${relativePath}/`, name)
    }

    start(dir, options)
  }


  // setTimeout(async () => {
  //   await start(pathInput, options);

  //   setTimeout(() => {
  //     copyDir(pathOutput, dir);
  //     copyDir(pathInput, `${dir}-backup`);

  //     console.log(`finished, ${counter} images compressed`);
  //   }, 500);
  // }, 100);
}

module.exports = {
  execute
}