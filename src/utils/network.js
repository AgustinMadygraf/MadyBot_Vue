// src/utils/network.js

export async function checkBackendConnection() {
    console.log('Iniciando verificación de conexión con el backend...');
    try {
      const url = process.env.VUE_APP_URL_BACK + '/receive-data';
      console.log('URL del backend:', url);
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt_user: "Hello, MadyBotPy!",
            user_data: {
              id: "12345",
              browserData: {
                userAgent: navigator.userAgent,
                screenResolution: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                platform: navigator.platform
              }
            },
            stream: false
          })
      });
      console.log('Respuesta recibida del backend:', response);
      return response.ok;
    } catch (error) {
      console.error('Error durante la verificación de conexión:', error);
      return false;
    }
  }