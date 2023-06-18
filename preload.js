const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    cpuModel: (callback) => ipcRenderer.on('pc-info:cpuModel', callback),
    hostName: (callback) => ipcRenderer.on('pc-info:hostName', callback),
    operationSystem: (callback) => ipcRenderer.on('pc-info:os', callback),
    systemMemory: (callback) => ipcRenderer.on('pc-info:systemMemory', callback),
    cpuUsage: (callback) => ipcRenderer.on('pc-info:cpuUsage', callback),
    cpuFree: (callback) => ipcRenderer.on('pc-info:cpuFree', callback),
    systemUptime: (callback) => ipcRenderer.on('pc-info:systemUptime', callback),
})

