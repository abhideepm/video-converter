const { app, dialog, BrowserWindow, Menu } = require('electron')
const ipc = require('electron').ipcMain

const path = require('path')
const isDev = require('electron-is-dev')
const os = require('os')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	})
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)
	mainWindow.on('closed', () => (mainWindow = null))
	mainWindow.webContents.openDevTools()
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
				click() {
					dialog
						.showOpenDialog({
							title: 'Select Empty Output Folder',
							buttonLabel: 'Select Folder',
							properties: [
								'openDirectory',
								'promptToCreate',
								'createDirectory',
							],
						})
						.then(result => {
							if (result) {
								mainWindow.webContents.send(
									'select-output-folder',
									result.filePaths[0]
								)
							}
						})
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

ipc.on('open-select-file', e => {
	if (os.platform() === ('win32' || 'linux')) {
		dialog
			.showOpenDialog({
				title: 'Select File to Convert',
				buttonLabel: 'Select',
				filters: [{ name: 'MP4 File', extensions: ['mp4'] }],
				properties: ['openFile'],
			})
			.then(result => {
				if (result) e.sender.send('selected-file', result.filePaths[0])
			})
			.catch(err => console.log(err))
	}
})

ipc.on('invalid-output-folder', e => {
	dialog
		.showMessageBox({
			type: 'error',
			buttons: ['OK'],
			title: 'Invalid Output Folder',
			message:
				'The selected Output Folder is not empty, please select an Empty Folder',
		})
		.then(result => {
			if (result) e.sender.send('open-select-file')
		})
		.catch(err => console.log(err))
})
