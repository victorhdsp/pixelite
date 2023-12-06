const sharp = require('sharp');
const fs = require('fs/promises');
const { pathInput, pathOutput } = require('../config');

async function convertImage (path, name, type) {
  const relativePath = path.replace(pathInput, '')

  const execute = async () => {
    const image = await sharp(`${path}/${name}`)

    if (typeof image[type] !== 'function') {
      console.log(`error converting ${path}/${name}`)
      type = 'png'
    }

    const output = `${pathOutput}${relativePath}/${name.replace(/\.[^/.]+$/, '')}.${type}`
    await image
      .resize({
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

module.exports = {
  convertImage
}