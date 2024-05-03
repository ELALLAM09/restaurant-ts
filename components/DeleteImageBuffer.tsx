import fs from 'fs'
import path from 'path'

const deleteImageBuffer = async (image: any) => {
  const imagePath = path.join(process.cwd(), 'public/', image)

  try {
    fs.unlinkSync(imagePath)
  } catch (error) {
    console.log('delete image error', error)
  }
}

export default deleteImageBuffer
