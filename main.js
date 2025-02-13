const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,             // 창 가로 크기
    height: 300,            // 창 세로 크기
    frame: false,           // 기본 프레임(제목바 등) 제거
    transparent: true,      // 배경 투명
    alwaysOnTop: true,      // 항상 화면 위에
    hasShadow: false,       // 그림자 제거 (원하는 대로)
    resizable: false,       // 창 크기 조절 비활성화
    webPreferences: {
      nodeIntegration: true // HTML에서 JS 사용 가능
    }
  });

  mainWindow.loadFile('index.html'); // index.html 불러오기
}

// 앱 준비되면 창을 하나 만듦
app.whenReady().then(() => {
  createWindow();

  // 맥OS에서 Dock 아이콘 눌러 다시 활성화할 때 창이 없으면 새 창 열기
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫히면 종료(단, 맥은 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
