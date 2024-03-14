import sharp from "sharp";
import fs from "fs/promises";
import { pathInput, pathOutput } from "../config";

type ImageType = 'webp' | 'avif' | 'jpeg' | 'png'

export async function convertImage (path:string, name:string, type:ImageType) {
  const relativePath = path.replace(pathInput, '')

  const execute = async () => {
    const image = await sharp(`${path}/${name}`)

    const output = `${pathOutput}${relativePath}/${name.replace(/\.[^/.]+$/, '')}.${type}`
    await image
      .resize({
        fit: 'inside',
        withoutEnlargement: true
      })
      [type]({ quality: 98 })
      .toFile(output)
  }

  try {
    await execute()
  } catch (error) {
    await fs.mkdir(`${pathOutput}${relativePath}`, { recursive: true })
    await execute()
  }
}