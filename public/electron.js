const { app, dialog, BrowserWindow, ipcMain, Menu } = require('electron')

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
			{ label: 'New Project' },
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

ipcMain.on('openSelectFile', e => {
	if (os.platform() === ('win32' || 'linux')) {
		dialog
			.showOpenDialog({ properties: ['openFile'] })
			.then(result => {
				e.sender.send('selected-file', result.filePaths[0])
			})
			.catch(err => console.log(err))
	}
})
