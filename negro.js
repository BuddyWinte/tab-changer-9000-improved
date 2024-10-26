        function createElement(tag, attributes = {}, ...children) {
            const element = document.createElement(tag);
            for (const key in attributes) {
                if (key.startsWith('on') && typeof attributes[key] === 'function') {
                    element.addEventListener(key.substring(2), attributes[key]);
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            }
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.innerHTML += child;
                } else {
                    element.appendChild(child);
                }
            });
            return element;
        }

        function setupOverlay() {
            if (window.self === window.top) {
                const style = createElement('style', {}, `
                    body { font-family: 'Poppins', sans-serif; }
                    .overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
                        display: flex; flex-direction: column; justify-content: center; align-items: center;
                        color: white; opacity: 0; transition: opacity 0.5s ease; z-index: 9999;
                    }
                    .overlay.show { opacity: 1; }
                    .fa-triangle-exclamation { font-size: 50px; margin-bottom: 10px; }
                    .bold { font-weight: 600; font-size: 24px; margin: 10px 0; }
                    .normal { font-size: 16px; text-align: center; }
                `);
                document.head.appendChild(style);

                const overlay = createElement('div', { class: 'overlay' },
                    createElement('div', { class: 'bold' }, 'Insecure Connection'),
                    createElement('div', { class: 'normal' }, "You can't use SkipSchool in this way. Please load our services at smoresxo.shop")
                );
                document.body.appendChild(overlay);
                requestAnimationFrame(() => overlay.classList.add('show'));

                const linkFA = createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' });
                document.head.appendChild(linkFA);

                const linkFonts = createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap' });
                document.head.appendChild(linkFonts);
            }
        }
            setupOverlay();
