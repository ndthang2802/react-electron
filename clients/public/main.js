const { app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')


function createWindown(){
    const win = new BrowserWindow({
        width:1600,
        height:1400,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation:false
        }
    })
    if(isDev){
            win.loadURL('http:127.0.0.1:3000')
        }
    else{
        win.loadFile('build/index.html')
    }
    
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