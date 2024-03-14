import fs from 'fs/promises'
import { deleteDir, copyFile, readAllDir, readDir } from './functions/folder'
import { convertImage } from './functions/image'
import { pathInput, pathOutput, typeImages } from './config'

const ConvertAllImagesInFolder = async (dir: string) => {
  console.log('Start converting process...')

  const inputFolder = await readDir(pathInput)
  const inputItems = (await readAllDir(inputFolder)).filter(item => item.type.match(typeImages))

  console.log(`Found ${inputItems.length} images`)
  
  for (let i = 0; i < inputItems.length; i++) {
    const { path, name } = inputItems[i];
    await convertImage(path, name, 'png')
    await convertImage(path, name, 'webp')
    await convertImage(path, name, 'avif')
    console.log(`Converted ${name}, ${i + 1}/${inputItems.length}`)
  }

  const outputFolder = await readDir(pathOutput)
  const outputItems = (await readAllDir(outputFolder))

  console.log(`Start copying ${outputItems.length} images`)
  for (let i = 0; i < outputItems.length; i++) {
    const { path, name } = outputItems[i];
    const relativePath = path.replace(pathOutput, '')
    
    await fs.copyFile(`${path}/${name}`, `${dir}${relativePath}/${name}`)
    console.log(`Copied ${name}, ${i + 1}/${outputItems.length}`)
  }

  console.log('Finished converting process')
}

const SetUpEnvironment = async (dir: string) => {
  console.log(`Environment: ${dir}`)
  console.log('Setting up environment...')
  dir = dir.replace(/\/$/, '')

  await deleteDir(pathInput)
  await fs.mkdir(pathInput, { recursive: true })

  await deleteDir(pathOutput)
  await fs.mkdir(pathOutput, { recursive: true })

  if (await readDir(pathInput) && await readDir(pathOutput)) {
    const folder = await readDir(dir)
    const items = (await readAllDir(folder)).filter(item => item.type.match(typeImages))

    for (let i = 0; i < items.length; i++) {
      const {path, name} = items[i];
      const relativePath = path.replace(dir, '')

      await copyFile(`${dir}${relativePath}/`, `${pathInput}${relativePath}/`, name)
    }

    console.log('Environment setted up')
    return dir
  }

  throw new Error('Error creating environment')
}

const execute = async (dir:string) => {
  const cleanDir = await SetUpEnvironment(dir)
  await ConvertAllImagesInFolder(cleanDir)
}

export default {
  execute
}