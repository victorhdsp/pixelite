const fs = require('fs/promises');

async function deleteDir(dir) {
  try {
    await fs.readdir(dir, { recursive: true }, () => { })
    await fs.rm(dir, { recursive: true }, () => { })
  } catch (error) {
    return []
  }
}

async function copyFile(src, dest, name) {
  try {
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
  } catch (error) {
    await fs.mkdir(dest, { recursive: true }, () => { })
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
  }
}

async function readDir(dir) {
  return {
    path: dir,
    items: await fs.readdir(dir)
  }
}

async function readAllDir(folder, options) {
  const { path, items } = folder
  options = {
    callback: () => { },
    archives: [],
    ...options
  }
  
  for (let i = 0; i < items.length; i++) {
    const name = items[i];
    const type = name.includes('.') ? name.split('.').reverse()[0] : 'folder'

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

module.exports = {
  deleteDir,
  copyFile,
  readDir,
  readAllDir
}