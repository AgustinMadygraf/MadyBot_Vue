# Tareas para implementar la mejora de HttpClientConfig

1. Crear variable global y lógica de actualización (Responsabilidad Única - SRP)
   1.1. [src/config/HttpClientConfig.js](src/config/HttpClientConfig.js): Agregar la variable `globalEndpoint` y un método `setGlobalEndpoint`.
   1.2. Comprobar que se exporte correctamente ejecutando el proyecto y revisando logs sin errores.

2. Inyectar variable en NetworkService (Abierto/Cerrado - OCP)
   2.1. [src/JS/NetworkCheck/index.js](src/JS/NetworkCheck/index.js): Refactorizar el constructor de [`NetworkService`](src/JS/NetworkCheck/index.js) para usar `globalEndpoint` en lugar de `AppConfig.API_ENDPOINT`.
   2.2. Comprobar que `checkBackendConnection()` funcione: revisar logs de conexión exitosa.

3. Ajustar responsabilidad de asignación tras validación (Inversión de Dependencias - DIP)
   3.1. [src/JS/NetworkCheck/index.js](src/JS/NetworkCheck/index.js): Cuando la conexión sea exitosa, llamar a `setGlobalEndpoint` para definir la nueva URL.
   3.2. Verificar la respuesta: el nuevo endpoint debe reflejarse en el debugger o logs.

4. Revisar y probar integración general
   4.1. Asegurarse de que se mantiene la lógica previa (Liskov - LSP).
   4.2. Ejecutar pruebas unitarias y verificar que no haya regresiones, especialmente en `checkBackendConnection()` y otros métodos que usen la conexión.