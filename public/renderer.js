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
		ipc.send('open-select-file')
	} else ipc.send('invalid-output-folder')
})

ipc.on('selected-file', async (e, paths) => {
	const inputPath = paths
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

	var proc = new ffmpeg()

	proc
		.addInput(inputPath)
		.on('end', function () {
			ipc.send('toggle-status-main')
		})
		.on('error', function (error) {
			console.log(error)
		})
		.outputOptions(options)
		.output(outputPath)
		.run()
})
