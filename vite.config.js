import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import tga2png from 'tga2png'

if (!fs.existsSync('./icons')) fs.mkdirSync('./icons')

function getDirContents(p) {
  return fs.readdirSync(p, function (err, files) {
    var retArr = []
    files.forEach(f => retArr.push(f))
    return retArr
  })
}

function getImages(p, type) {
  return getDirContents(p).map(x => {
    if (x.endsWith(`.${type}`)) return path.basename(x,`.${type}`)
  }).filter(x => x)
}

function outputSharpImage(inputPath, outputPath, outputFormat) {
  let img = sharp(inputPath)

  if (outputFormat == 'jpeg') img.jpeg({ quality: 100 })
  if (outputFormat == 'png') img.png()
  else if (outputFormat == 'webp') img.webp({ quality: 100 })
  else if (outputFormat == 'avif') img.avif({ quality: 70 })

  img.toFile(outputPath, (err,) => {
    if (err) console.log(err)
  })
}

const tgaArr = getImages('./srcIcons','tga')
const pngArr = getImages('./srcIcons','png').filter(x => !tgaArr.includes(x))

for (const titleid of tgaArr) {
  const tgaPath = `./srcIcons/${titleid}.tga`
  const pngPath = `./icons/${titleid}.png`

  tga2png(tgaPath, pngPath).then(buf=> {
    for (const format of ['jpeg','webp','avif']) {
      outputSharpImage(
        pngPath,
        `./icons/${titleid}.${format}`,
        format
      )
    }
  }, err => {
    console.log('error', err)
  })
}

for (const titleid of pngArr) for (const format of ['jpeg','png','webp','avif']) {
  outputSharpImage(
    `./srcIcons/${titleid}.png`,
    `./icons/${titleid}.${format}`,
    format
  )
}

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})