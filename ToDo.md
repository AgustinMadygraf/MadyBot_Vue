#### Tarea 4: Crear un módulo para la obtención del API endpoint
- **Subtarea 4.1:** Crear un archivo `ApiEndpointProvider.js` en `NetworkCheck`
- **Subtarea 4.2:** Mover la función `getApiEndpoint` a `ApiEndpointProvider.js`
- **Subtarea 4.3:** Actualizar las importaciones en `index.js` para usar `ApiEndpointProvider.js`

#### Tarea 5: Crear un módulo para la inicialización de la configuración del cliente HTTP
- **Subtarea 5.1:** Crear un archivo `HttpClientInitializer.js` en `NetworkCheck`
- **Subtarea 5.2:** Mover la función `initializeHttpClientConfig` a `HttpClientInitializer.js`
- **Subtarea 5.3:** Actualizar las importaciones en `index.js` para usar `HttpClientInitializer.js`

#### Tarea 6: Crear un módulo para la inicialización de la conexión
- **Subtarea 6.1:** Crear un archivo `ConnectionInitializer.js` en `NetworkCheck`
- **Subtarea 6.2:** Mover la función `initializeConnection` a `ConnectionInitializer.js`
- **Subtarea 6.3:** Actualizar las importaciones en `index.js` para usar `ConnectionInitializer.js`

#### Tarea 7: Refactorizar `NetworkService`  para usar los nuevos módulos
- **Subtarea 7.1:** Actualizar el constructor de `NetworkService` para usar `UrlConfig.js`
- **Subtarea 7.2:** Actualizar los métodos de `NetworkService` para usar los nuevos módulos (`ConnectionChecker.js`, `PhpHealthChecker.js`, `ApiEndpointProvider.js`, `HttpClientInitializer.js`, `ConnectionInitializer.js`)
