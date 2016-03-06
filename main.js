'use strict';


var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');


var mainWindow = null;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    height: 600,
    width:800,
    resizable:false,
    frame:false
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
})


ipc.on('close-main-window', function(){
  app.quit();
});

ipc.on('open-settings-window', function(){
  if (settingsWindow) {
    return;
  }

  settingsWindow = new BrowserWindow({
    frame:false,
    height:200,
    resizable: false,
    width: 200,
  });

  settingsWindow.loadURL('file://' + __dirname + '/app/settins.html');

  settingsWindow.on('closed', function(){
    settingsWindow = null;
  });
});


ipc.on('close-settings-window', function(){
  if (settingsWindow) {
    settingsWindow.close();
  }
});
