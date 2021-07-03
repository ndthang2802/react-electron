const { app, BrowserWindow} = require('electron')


function createWindown(){
    const win = new BrowserWindow({
        width:1600,
        height:1400,
        webPreferences:{
            nodeIntegration:false,
            allowEval: false,
        }
    })

    win.loadURL('http:127.0.0.1:3000')

    const content = win.webContents
    console.log(content)
    
}

app.whenReady().then(createWindown)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});