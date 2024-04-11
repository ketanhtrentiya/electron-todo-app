const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // Handle Application Close Event
  mainWindow.on('closed', () => app.quit());
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/views/add.html`);
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Quit",
        accelerator: (() => {
          if(process.platform === 'darwin') {
            return "Command + Q";
          } else {
            return "Ctrl + Q"
          }
        })(),
        click() {
          app.quit();
        }
      }
    ],
  },
];

if (process.platform === "darwin") {
  menuTemplate.unshift({
    label: "",
  });
}