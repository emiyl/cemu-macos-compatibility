import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import tga2png from 'tga2png'
import request from 'sync-request'

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

const tgaArr = getImages('./src/icons','tga')
const pngArr = getImages('./src/icons','png').filter(x => !tgaArr.includes(x))

for (const titleid of tgaArr) {
  const tgaPath = `./src/icons/${titleid}.tga`
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
    `./src/icons/${titleid}.png`,
    `./icons/${titleid}.${format}`,
    format
  )
}

function getLatestReleases() {
  return JSON.parse(request('GET','https://api.github.com/repos/cemu-project/Cemu/releases', { headers: { 'Content-Type': 'application/json', 'User-Agent': 'emiyl' } }).getBody())
}

async function getLatestWorkflow() {
  let ret

  let commits = JSON.parse(request('GET','https://api.github.com/repos/cemu-project/Cemu/commits', { headers: { 'Content-Type': 'application/json', 'User-Agent': 'emiyl' } }).getBody())
  let runs = JSON.parse(request('GET','https://api.github.com/repos/cemu-project/Cemu/actions/runs', { headers: { 'Content-Type': 'application/json', 'User-Agent': 'emiyl' } }).getBody())
  
  let i = -1
  while (!ret) {
      i++
      const commit = commits[i]
      if (!commit) break
      const run = runs.workflow_runs.find(x => x.head_sha == commit.sha && x.workflow_id == 34555033)
      if (run && run.conclusion == 'success') ret = run
  }

  return ret
}

async function getCachedEntries() {
  let latestReleases = await getLatestReleases()
  let releases = [{
      overwriteMe: true,
      label: 'Latest release',
      version: '',
      url: 'https://github.com/cemu-project/Cemu/releases/latest',
      target: '_blank',
  }]

  function getRelease(release) {
      let obj = {}

      if (release) {
          obj = {
              label: `Latest ${release.prerelease ? 'pre-' : ''}release`,
              version: release.tag_name,
              ghurl: release.html_url,
              ghtarget: '_blank'
          }
      }
      else return

      let macosAsset = release.assets.find(x => x.name.includes('macos'))
      if (!macosAsset) {
          releases.push(obj)
          return
      }

      obj.url = macosAsset.browser_download_url
      obj.target = ''
      
      if (releases[0].overwriteMe) releases = []
      releases.push(obj)
  }

  getRelease(latestReleases.filter(x => !x.prerelease)[0])
  getRelease(latestReleases.filter(x => x.prerelease)[0])

  let latestWorkflow = await getLatestWorkflow()
  if (latestWorkflow) {
      if (releases[0].overwriteMe) releases = []
      releases.push({
          label: 'Latest commit',
          commit: latestWorkflow.head_sha,
          url: latestWorkflow.html_url,
          target: '_blank'
      })
  }

  if (releases) fs.writeFile('./cachedReleases.json', JSON.stringify(releases.map(x => {
    x.overwriteMe = true
    return x
  })), err => { if (err) console.log(err) })
  else console.log(releases)
}

getCachedEntries()

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

const titles = getAllFiles('./tests')
.filter(file => file.endsWith('.json'))
.map(x => require(`./${x}`))

let titleObj = {}
for (const title of titles) {
  const tid = title.titleID
  delete title.titleID

  titleObj[tid] = title
}
fs.writeFileSync('./titles.json', JSON.stringify(titleObj))

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})