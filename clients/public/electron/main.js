const { app, BrowserWindow} = require('electron')


function createWindown(){
    const win = new BrowserWindow({
        width:1200,
        height:1000,
        webPreferences:{
            nodeIntegration:true,
        }
    })

    win.loadURL('http:localhost:3000')

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