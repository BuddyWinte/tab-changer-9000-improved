const injectStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .tab-changer-window {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: #1a1a1a;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      font-family: 'Poppins', sans-serif;
      color: #fff;
      overflow: hidden;
      z-index: 9999;
      user-select: none;
    }

    .window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #2a2a2a;
      cursor: move;
    }

    .window-title {
      font-weight: 600;
      font-size: 16px;
      margin: 0;
    }

    .close-button {
      background: #ff5f57;
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 0.8;
    }

    .tab-list {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px;
    }

    .tab-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
      margin-bottom: 4px;
    }

    .tab-item:hover {
      background: #2a2a2a;
    }

    .tab-icon {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      object-fit: contain;
    }

    .tab-label {
      font-size: 14px;
      font-weight: 400;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    ::-webkit-scrollbar-thumb {
      background: #3a3a3a;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #4a4a4a;
    }
  `;
  document.head.appendChild(style);
};

const createWindow = (tabs) => {
  const window = document.createElement('div');
  window.className = 'tab-changer-window';
  
  const header = document.createElement('div');
  header.className = 'window-header';
  
  const title = document.createElement('h2');
  title.className = 'window-title';
  title.textContent = 'Tab Changer';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-button';
  closeBtn.onclick = () => window.remove();
  
  header.appendChild(title);
  header.appendChild(closeBtn);
  
  const tabList = document.createElement('div');
  tabList.className = 'tab-list';
  
  tabs.forEach(tab => {
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    
    const icon = document.createElement('img');
    icon.className = 'tab-icon';
    icon.src = tab.favicon;
    icon.alt = tab.label;
    
    const label = document.createElement('span');
    label.className = 'tab-label';
    label.textContent = tab.label;
    
    tabItem.appendChild(icon);
    tabItem.appendChild(label);
    
    tabItem.onclick = () => {
      document.title = tab.title;
      const favicon = document.querySelector("link[rel~='icon']") || document.createElement('link');
      favicon.type = 'image/x-icon';
      favicon.rel = 'shortcut icon';
      favicon.href = tab.favicon;
      document.head.appendChild(favicon);
    };
    
    tabList.appendChild(tabItem);
  });
  
  window.appendChild(header);
  window.appendChild(tabList);

  let isDragging = false;
  let currentX = window.offsetLeft;
  let currentY = window.offsetTop;
  let initialMouseX;
  let initialMouseY;

  const dragStart = (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    
    const rect = window.getBoundingClientRect();
    currentX = rect.left;
    currentY = rect.top;
    
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    
    window.style.userSelect = 'none';
    
    window.style.position = 'fixed';
    window.style.transform = 'none';
    window.style.left = currentX + 'px';
    window.style.top = currentY + 'px';
  };

  const drag = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;
    
    const newX = currentX + dx;
    const newY = currentY + dy;
    
    window.style.left = newX + 'px';
    window.style.top = newY + 'px';
  };

  const dragEnd = () => {
    isDragging = false;
    window.style.userSelect = '';
  };

  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  
  return window;
};

const initTabChanger = (tabs) => {
  injectStyles();
  const tabChanger = createWindow(tabs);
  document.body.appendChild(tabChanger);
};

const tabsData = [
  { 
    label: 'Google Drive', 
    title: 'Google Drive', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/drive.png' 
  },
  { 
    label: 'Gmail', 
    title: 'Gmail', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/gmail.png' 
  },
  { 
    label: 'Duolingo', 
    title: 'Duolingo', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/duo.png' 
  },
  { 
    label: 'Zoom', 
    title: 'Zoom', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/zoom.png' 
  },
  { 
    label: 'Slack', 
    title: 'Slack', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/slack.png' 
  },
  { 
    label: 'Microsoft Teams', 
    title: 'Microsoft Teams', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/teams.png' 
  },
  { 
    label: 'Notion', 
    title: 'Notion', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/notion.png' 
  },
  { 
    label: 'Evernote', 
    title: 'Evernote', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/evernote.png' 
  },
  { 
    label: 'Khan Academy', 
    title: 'Khan Academy', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/khan.png' 
  },
  { 
    label: 'Google Classroom', 
    title: 'Google Classroom', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/googleclassroom.png' 
  },
  { 
    label: 'Canvas', 
    title: 'Canvas', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/canvas.png' 
  },
  { 
    label: 'Moodle', 
    title: 'Moodle', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/moodle.png' 
  },
  { 
    label: 'Quizlet', 
    title: 'Quizlet', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/quizlet.png' 
  },
  { 
    label: 'Trello', 
    title: 'Trello', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/trello.png' 
  },
  { 
    label: 'Flipgrid', 
    title: 'Flipgrid', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/flipgrid.png' 
  },
  { 
    label: 'Spotify', 
    title: 'Spotify', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/spotify.png' 
  },
  { 
    label: 'Desmos', 
    title: 'Desmos', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/desmos.png' 
  },
  { 
    label: 'Outlook', 
    title: 'Outlook', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/outlook.png' 
  },
  { 
    label: 'Onenote', 
    title: 'Onenote', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/onenote.png' 
  },
  { 
    label: 'SimpleMind', 
    title: 'SimpleMind', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/simplemind.png' 
  },
  { 
    label: 'Wolfram', 
    title: 'Wolfram', 
    favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/wolfram.png' 
  }
];

initTabChanger(tabsData);
