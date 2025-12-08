(function() {
  // Configuration
  const SCRIPT_TAG = document.currentScript;
  const scriptSrc = SCRIPT_TAG ? SCRIPT_TAG.src : '';
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/')) || '.';
  
  // Allow overriding APP_URL via data attribute, otherwise assume index.html in same dir
  const APP_URL = SCRIPT_TAG && SCRIPT_TAG.getAttribute('data-app-url') 
    ? SCRIPT_TAG.getAttribute('data-app-url') 
    : `${baseUrl}/index.html`;

  // Create Container
  const container = document.createElement('div');
  container.id = 'kisan-plant-doctor-widget';
  document.body.appendChild(container);

  // Styles
  const style = document.createElement('style');
  style.innerHTML = `
    #kisan-plant-doctor-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483647; /* Max z-index */
      font-family: sans-serif;
    }
    
    #kisan-widget-launcher {
      width: 60px;
      height: 60px;
      background-color: #15803d; /* green-700 */
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      border: none;
      outline: none;
    }
    
    #kisan-widget-launcher:hover {
      transform: scale(1.05);
      background-color: #166534;
    }
    
    #kisan-widget-frame-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 40px);
      max-height: calc(100vh - 110px);
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      overflow: hidden;
      display: none; /* Hidden by default */
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s, transform 0.3s;
      z-index: 2147483647;
    }
    
    #kisan-widget-frame-container.open {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    
    #kisan-widget-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #f8fafc;
    }
  `;
  document.head.appendChild(style);

  // Launcher Button
  const launcher = document.createElement('button');
  launcher.id = 'kisan-widget-launcher';
  launcher.setAttribute('aria-label', 'Open Kisan Plant Doctor');
  launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  `;
  container.appendChild(launcher);

  // Iframe Container
  const frameContainer = document.createElement('div');
  frameContainer.id = 'kisan-widget-frame-container';
  container.appendChild(frameContainer);

  // Iframe logic
  let iframeCreated = false;

  function toggleWidget() {
    const isOpen = frameContainer.classList.contains('open');
    if (isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  function openWidget() {
    if (!iframeCreated) {
      const iframe = document.createElement('iframe');
      iframe.id = 'kisan-widget-iframe';
      // Append mode=widget parameter
      const separator = APP_URL.includes('?') ? '&' : '?';
      iframe.src = `${APP_URL}${separator}mode=widget`;
      iframe.title = "Kisan Plant Doctor";
      frameContainer.appendChild(iframe);
      iframeCreated = true;
    }
    frameContainer.classList.add('open');
  }

  function closeWidget() {
    frameContainer.classList.remove('open');
  }

  launcher.addEventListener('click', toggleWidget);

  // Listen for close message from React App
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'KISAN_WIDGET_CLOSE') {
      closeWidget();
    }
  });

})();