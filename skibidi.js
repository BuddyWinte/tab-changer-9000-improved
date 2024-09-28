function createPopup() {
    const popup = document.createElement('div');
    popup.style.width = '400px';
    popup.style.backgroundColor = '#1e1e1e';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    popup.style.overflow = 'hidden';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
    popup.style.transition = 'transform 0.3s ease';
    document.body.appendChild(popup);

    const titleBar = document.createElement('div');
    titleBar.style.display = 'flex';
    titleBar.style.justifyContent = 'space-between';
    titleBar.style.alignItems = 'center';
    titleBar.style.backgroundColor = '#333';
    titleBar.style.color = 'white';
    titleBar.style.padding = '10px';
    titleBar.style.cursor = 'default';
    
    const title = document.createElement('span');
    title.innerText = 'Change Page Title';
    titleBar.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.innerText = '✖';
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.onclick = function () {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    };
    titleBar.appendChild(closeButton);
    popup.appendChild(titleBar);

    const container = document.createElement('div');
    container.style.height = '200px';
    container.style.overflowY = 'auto';
    container.style.padding = '10px';
    
    const buttonData = [
        { label: 'Set Title to "Example 1"', title: 'Example 1', favicon: 'https://example.com/favicon1.ico' },
        { label: 'Set Title to "Example 2"', title: 'Example 2', favicon: 'https://example.com/favicon2.ico' },
    ];

    buttonData.forEach(data => {
        const button = document.createElement('button');
        button.innerText = data.label;
        button.style.width = '100%';
        button.style.marginBottom = '5px';
        button.onclick = function () {
            document.title = data.title;
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = data.favicon;
            document.head.appendChild(link);
        };
        container.appendChild(button);
    });

    popup.appendChild(container);
    document.body.appendChild(popup);
    popup.style.display = 'block';
}

createPopup();
