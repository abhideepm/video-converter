const electron = require('electron')
const ipc = electron.ipcRenderer
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')

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

let output

ipc.on('open-folder', () => {
	ipc.send('select-folder')
})

ipc.on('select-output-folder', (_, outputPath) => {
	if (!fs.readdirSync(outputPath).length) {
		output = outputPath
		ipc.send('open-select-file', outputPath)
	} else ipc.send('invalid-output-folder')
})

ipc.on('render-file', (_, filePath) => {
	const inputPath = filePath
	const outputPath = path.join(output, '/output.m3u8')
	const options = [
		'-codec',
		'copy',
		'-start_number',
		'0',
		'-hls_time',
		'10',
		'-hls_list_size',
		'0',
		'-f',
		'hls',
	]

	const proc = new ffmpeg(inputPath)
	proc
		.on('end', () => {
			ipc.send('toggle-status-main')
		})
		.on('error', error => {
			console.log(error)
		})
		.outputOptions(options)
		.output(outputPath)
		.run()
})
