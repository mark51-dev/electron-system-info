const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron')
const path = require('path')
const osu = require('node-os-utils')

const cpu = osu.cpu
const mem = osu.mem
const os = osu.os


process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true: false

let win

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: './assets/icon.png',
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true,
		},
		resizable: true,
	})
	win.loadFile('./index.html')
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

const menu = [
	{
		role: 'fileMenu'
	}
]



app.whenReady().then(() => {
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})

	ipcMain.on('pc-info:cpuModel:main', (_event, value) => {
		// console.log(value) // will print value to Node console
	})

	setInterval(() => {
		win.webContents.send('pc-info:cpuModel', cpu.model())
		win.webContents.send('pc-info:hostName', os.hostname())
		win.webContents.send('pc-info:os', `${os.type()} ${os.arch()}`)
		win.webContents.send('pc-info:systemUptime', `${secondsToDhms(os.uptime())}`)

		mem.info()
			.then(info => {
				win.webContents.send('pc-info:systemMemory', `${info.totalMemMb}`)
			}).catch(err => console.log)

		cpu.usage()
			.then(info => {
				win.webContents.send('pc-info:cpuUsage', `${info}`)
			}).catch(err => console.log)

		cpu.free()
			.then(info => {
				win.webContents.send('pc-info:cpuFree', `${info}`)
			}).catch(err => console.log)

	}, 2000)

	createWindow()

	const mainMenu = Menu.buildFromTemplate(menu)
	Menu.setApplicationMenu(mainMenu)
	win.webContents.openDevTools()
})

function secondsToDhms(seconds) {
	seconds += seconds
	const d = Math.floor(seconds / (3600 * 24))
	const h = Math.floor((seconds % (3600 * 24)) / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	const s = Math.floor(seconds % 60)
	return `${d}d, ${h}h, ${m}m, ${s}s`
}