const electron = require('electron')
const ipc = electron.ipcRenderer
const ffmpeg = require('fluent-ffmpeg')
const process = require('child_process')
const path = require('path')

const ffmpegPath = require('ffmpeg-static').replace(
	'app.asar',
	'app.asar.unpacked'
)
const ffprobePath = require('ffprobe-static').path.replace(
	'app.asar',
	'app.asar.unpacked'
)

//tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

const selectFile = document.getElementById('selectFile')

let output

selectFile.addEventListener('click', () => {
	ipc.send('open-select-file')
})

ipc.on('select-output-folder', (_, outputPath) => {
	output = outputPath
})

ipc.on('selected-file', (_, paths) => {
	process.exec(`${ffmpegPath} -i ${paths} ${path.join(output, '/output.avi')}`)
})
