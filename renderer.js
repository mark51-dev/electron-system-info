const cpuModel = document.getElementById('cpu-model')
const compName = document.getElementById('comp-name')
const osTypeArch = document.getElementById('os')
const memTotal = document.getElementById('mem-total')
const cpuUsage = document.getElementById('cpu-usage')
const cpuFree = document.getElementById('cpu-free')
const sysUptime = document.getElementById('sys-uptime')

window.electronAPI.cpuModel((event, value) => {
	cpuModel.innerText = value
	event.sender.send('pc-info:cpuModel:main', value)
})

window.electronAPI.hostName((event, value) => {
	compName.innerText = value
	// event.sender.send('pc-info:hostName:main', value)
})

window.electronAPI.operationSystem((event, value) => {
	osTypeArch.innerText = value
	// event.sender.send('pc-info:cpuModel:main', value)
})

window.electronAPI.systemMemory((event, value) => {
	memTotal.innerText = value
	// event.sender.send('pc-info:cpuModel:main', value)
})

window.electronAPI.cpuUsage((event, value) => {
	cpuUsage.innerText = value
	document.getElementById('cpu-progress').style.width = `${value}%`
	if (parseInt(value) > 20) {
		document.getElementById('cpu-progress').style.background = 'red'
	} else {
		document.getElementById('cpu-progress').style.background = '#30c88b'
	}
	// event.sender.send('pc-info:cpuModel:main', value)
})

window.electronAPI.cpuFree((event, value) => {
	cpuFree.innerText = value + '%'
	// event.sender.send('pc-info:cpuModel:main', value)
})

window.electronAPI.systemUptime((event, value) => {
	sysUptime.innerText = value
	// event.sender.send('pc-info:cpuModel:main', value)
})