const electron = require('electron')
const ipc = electron.ipcRenderer
const selectFile = document.getElementById('selectFile')

selectFile.addEventListener('click', () => {
	console.log('clicked')
	ipc.send('openSelectFile')
})
