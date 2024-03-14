import fs from 'fs/promises'
import { Folder, Options } from '../utils/types'

export async function deleteDir (dir:string): Promise<true|false>{
  try {
    await fs.readdir(dir, { recursive: true })
    await fs.rm(dir, { recursive: true })
    return true

  } catch (error) {
    return false
  }
}

export async function copyFile(src:string, dest:string, name:string): Promise<true|false> {
  try {
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
    return true
  } catch (error) {
    await fs.mkdir(dest, { recursive: true })
    await fs.copyFile(`${src}${name}`, `${dest}${name}`)
    return false
  }
}

export async function readDir(dir:string) {
  return {
    path: dir,
    items: await fs.readdir(dir)
  }
}

export async function readAllDir(folder: Folder, options?: Options) {
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