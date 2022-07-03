/* ESTE SCRIPT ES PARA QUE FUNCIONE ELECTRON Y LANZE LAS VISTAS */

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })
  
    /* AQUI PUEDES CAMBIAR LA RUTA PARA PONER PRIMERO EL LOGIN */
    win.loadFile('src/assets/views/index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })
