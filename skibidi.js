function createPopup() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const popup = document.createElement('div');
    Object.assign(popup.style, {
        width: '400px',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        fontFamily: '"Poppins", sans-serif',
        color: '#ffffff',
        transition: 'transform 0.3s ease, top 0.3s ease, left 0.3s ease',
        zIndex: '10000',
        resize: 'both',
        overflow: 'hidden',
        maxWidth: '90%',
        maxHeight: '90%',
    });
    document.body.appendChild(popup);
    const storedX = localStorage.getItem('popupX');
    const storedY = localStorage.getItem('popupY');
    if (storedX && storedY) {
        popup.style.left = `${storedX}px`;
        popup.style.top = `${storedY}px`;
    } else {
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    const titleBar = document.createElement('div');
    Object.assign(titleBar.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c2c2c',
        padding: '12px 16px',
        cursor: 'move',
        userSelect: 'none',
    });

    const title = document.createElement('span');
    title.innerText = 'Change Tab & Title';
    Object.assign(title.style, {
        fontSize: '16px',
        fontWeight: '600',
    });
    titleBar.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.innerText = '✖';
    Object.assign(closeButton.style, {
        backgroundColor: '#ff5f57',
        color: '#ffffff',
        border: 'none',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
    });
    closeButton.onmouseover = () => {
        closeButton.style.backgroundColor = '#e04848';
    };
    closeButton.onmouseout = () => {
        closeButton.style.backgroundColor = '#ff5f57';
    };

    closeButton.onclick = () => {
        popup.style.transform = 'scale(0)';
        setTimeout(() => popup.remove(), 300);
    };
    titleBar.appendChild(closeButton);
    popup.appendChild(titleBar);
    const container = document.createElement('div');
    Object.assign(container.style, {
        padding: '16px',
        height: 'calc(100% - 56px)',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #1e1e1e, #2c2c2c)',
    });
    const buttonData = [
        { label: 'Google Drive', title: 'Google Drive', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/drive.png' },
        { label: 'Gmail', title: 'Gmail', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/gmail.png' },
        { label: 'Duolingo', title: 'Duolingo', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/duo.png' },
        { label: 'Zoom', title: 'Zoom', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/zoom.png' },
        { label: 'Slack', title: 'Slack', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/slack.png' },
        { label: 'Microsoft Teams', title: 'Microsoft Teams', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/teams.png' },
        { label: 'Notion', title: 'Notion', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/notion.png' },
        { label: 'Evernote', title: 'Evernote', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/evernote.png' },
        { label: 'Khan Academy', title: 'Khan Academy', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/khan.png' },
        { label: 'Google Classroom', title: 'Google Classroom', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/googleclassroom.png' },
        { label: 'Canvas', title: 'Canvas', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/canvas.png' },
        { label: 'Moodle', title: 'Moodle', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/moodle.png' },
        { label: 'Quizlet', title: 'Quizlet', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/quizlet.png' },
        { label: 'Trello', title: 'Trello', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/trello.png' },
        { label: 'Flipgrid', title: 'Flipgrid', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/flipgrid.png' },
        { label: 'Spotify', title: 'Spotify', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/spotify.png' },
        { label: 'Desmos', title: 'Desmos', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/desmos.png' },
        { label: 'Outlook', title: 'Outlook', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/outlook.png' },
        { label: 'Onenote', title: 'Onenote', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/onenote.png' },
        { label: 'SimpleMind', title: 'SimpleMind', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/simplemind.png' },
        { label: 'Wolfram', title: 'Wolfram', favicon: 'https://raw.githubusercontent.com/smoressy/tab-changer-9000/refs/heads/main/icons/wolfram.png' }
    ];
    buttonData.forEach(data => {
        const button = document.createElement('button');
        button.style.width = '100%';
        button.style.marginBottom = '10px';
        button.style.padding = '10px 14px';
        button.style.backgroundColor = '#2c2c2c';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = '500';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.transition = 'background-color 0.3s ease, transform 0.1s ease';
        button.style.fontSize = '14px';
        button.onmouseover = () => {
            button.style.backgroundColor = '#3a3a3a';
        };
        button.onmouseout = () => {
            button.style.backgroundColor = '#2c2c2c';
        };
        const icon = document.createElement('img');
        icon.src = data.favicon;
        icon.alt = `${data.label} icon`;
        Object.assign(icon.style, {
            width: '20px',
            height: '20px',
            marginRight: '12px',
        });

        button.appendChild(icon);
        button.appendChild(document.createTextNode(data.label));
        button.onclick = () => {
            document.title = data.title;
            let existingLink = document.querySelector("link[rel='icon']");
            if (existingLink) {
                existingLink.href = data.favicon;
            } else {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = data.favicon;
                document.head.appendChild(link);
            }
            button.style.transform = 'scale(0.98)';
            const originalText = button.innerText;
            button.innerText = 'Success';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.innerText = originalText;
                button.insertBefore(icon, button.firstChild);
            }, 300);
        };

        container.appendChild(button);
    });
    const style = document.createElement('style');
    style.innerHTML = `
        /* Scrollbar Styles */
        ${container.style.scrollbarWidth = 'thin'}
        ${container.style.scrollbarColor = '#555 #1e1e1e'}
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #1e1e1e;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 4px;
            border: 2px solid #1e1e1e;
        }
    `;
    document.head.appendChild(style);

    popup.appendChild(container);
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 0);
    let offsetX, offsetY, isDragging = false;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = popup.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        popup.style.transition = 'none';
        document.body.style.userSelect = 'none';

        const onMouseMove = (e) => {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;
                const maxX = window.innerWidth - popup.offsetWidth;
                const maxY = window.innerHeight - popup.offsetHeight;
                newX = Math.max(0, Math.min(newX, maxX));
                newY = Math.max(0, Math.min(newY, maxY));

                popup.style.left = `${newX}px`;
                popup.style.top = `${newY}px`;
            }
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                popup.style.transition = 'transform 0.3s ease, top 0.3s ease, left 0.3s ease';
                document.body.style.userSelect = 'auto';
                const rect = popup.getBoundingClientRect();
                localStorage.setItem('popupX', rect.left);
                localStorage.setItem('popupY', rect.top);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        e.preventDefault();
    });
    closeButton.focus();
}

createPopup();
