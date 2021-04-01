const { app, BrowserWindow } = require('electron')
const fs = require('fs-extra')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    resizable: false,
    webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js')
        
    }
  })
  //win.removeMenu()
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if(fs.existsSync(process.env.TEMP + "/forge-modinstaller.jar")) {  
    fs.unlinkSync(process.env.TEMP + "/forge-modinstaller.jar")
  }
  if(fs.existsSync(process.env.TEMP + "/big-floppa.zip")) {  
  fs.unlinkSync(process.env.TEMP + "/big-floppa.zip")
  }
  if(fs.existsSync(process.env.TEMP + "/big-floppa-main")) {  
  fs.rmdirSync(process.env.TEMP + "/big-floppa-main", {recursive: true})
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})