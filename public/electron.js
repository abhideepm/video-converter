const { app, dialog, BrowserWindow, Menu, Notification } = require('electron')
const ipc = require('electron').ipcMain

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
		show: false,
	})
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)
	mainWindow.on('closed', () => (mainWindow = null))
	mainWindow.webContents.openDevTools()
	mainWindow.maximize()
	mainWindow.show()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

const menu = Menu.buildFromTemplate([
	{
		label: 'Menu',
		submenu: [
			{
				label: 'New Project',
				click(_, mainWindow) {
					mainWindow.webContents.send('open-folder')
				},
			},
			{ type: 'separator' },
			{
				label: 'Exit',
				click() {
					app.quit()
				},
			},
		],
	},
])

Menu.setApplicationMenu(menu)

ipc.on('select-folder', e => {
	dialog
		.showOpenDialog({
			title: 'Select Empty Output Folder',
			buttonLabel: 'Select Folder',
			properties: ['openDirectory', 'promptToCreate', 'createDirectory'],
		})
		.then(result => {
			if (!result.canceled)
				e.sender.send('select-output-folder', result.filePaths[0])
			else {
				dialog.showErrorBox('Folder not Selected', 'Please select a folder')
			}
		})
})

ipc.on('open-select-file', e => {
	dialog
		.showOpenDialog({
			title: 'Select File to Convert',
			buttonLabel: 'Select',
			filters: [{ name: 'MP4 File', extensions: ['mp4'] }],
			properties: ['openFile'],
		})
		.then(result => {
			if (!result.canceled)
				e.sender.send('toggle-status-true', result.filePaths[0])
			else {
				dialog.showErrorBox('File not Selected', 'Please select a file')
			}
		})
		.catch(err => console.log(err))
})

ipc.on('start-processing', (e, path) => {
	e.sender.send('selected-file', path)
})

ipc.on('toggle-status-main', e => {
	e.sender.send('toggle-status-false')
})

ipc.on('invalid-output-folder', e => {
	dialog.showMessageBox({
		type: 'error',
		buttons: ['OK'],
		title: 'Invalid Output Folder',
		message:
			'The selected Output Folder is not empty, please select an Empty Folder',
	})
})
