#### **5. Abstraer el Servicio de Configuración**

**5.1. Crear una interfaz para la configuración de la aplicación**

- **Subtarea 5.1.1: Crear archivo de interfaz `IAppConfig.js`**
  - **Archivo a crear**: `src/config/interfaces/IAppConfig.js`
  - **Acción**: Definir una interfaz `IAppConfig` que describa la estructura esperada de la configuración de la aplicación.

- **Subtarea 5.1.2: Verificar la creación de `IAppConfig.js`**
  - **Verificación**: Comprobar que `IAppConfig.js` exporta correctamente la interfaz con las propiedades necesarias.

**5.2. Modificar `config/index.js` para adherirse a `IAppConfig`**

- **Subtarea 5.2.1: Ajustar `config/index.js` para cumplir con `IAppConfig`**
  - **Archivo a modificar**: `src/config/index.js`
  - **Acción**: Asegurar que `finalConfig` implementa todas las propiedades definidas en `IAppConfig` y valida la configuración.

- **Subtarea 5.2.2: Verificar la modificación de `config/index.js`**
  - **Verificación**: Comprobar que `finalConfig` cumple con la interfaz `IAppConfig` y que no faltan propiedades esenciales.

---

#### **6. Reducir el Acoplamiento en `HttpClientConfig`**

**6.1. Modificar `HttpClientConfig` para depender de `ILogger`**

- **Subtarea 6.1.1: Ajustar `HttpClientConfig.js` para usar `ILogger`**
  - **Archivo a modificar**: `src/config/HttpClientConfig.js`
  - **Acción**: Cambiar las dependencias para que `HttpClientConfig` reciba una instancia que implemente `ILogger` en lugar de depender directamente de `LogService`.

- **Subtarea 6.1.2: Verificar la modificación de `HttpClientConfig.js`**
  - **Verificación**: Asegurarse de que `HttpClientConfig` ahora utiliza una instancia de `ILogger` y que no importa directamente `LogService`.

---

#### **7. Implementar la Inyección de Dependencias en `NetworkService`**

**7.1. Modificar el constructor de `NetworkService` para aceptar dependencias**

- **Subtarea 7.1.1: Modificar el constructor de `NetworkService.js`**
  - **Archivo a modificar**: `src/JS/NetworkCheck/NetworkService.js`
  - **Acción**: Ajustar el constructor para recibir instancias de `MessageService`, `AppConfig` y `ILogger` a través de parámetros en lugar de importarlos directamente.

- **Subtarea 7.1.2: Verificar la modificación del constructor en `NetworkService.js`**
  - **Verificación**: Comprobar que `NetworkService` ya no importa directamente `MessageService`, `AppConfig` y `logger`, y que los recibe como dependencias.

**7.2. Crear un contenedor de dependencias**

- **Subtarea 7.2.1: Crear archivo `DependencyContainer.js`**
  - **Archivo a crear**: `src/JS/NetworkCheck/DependencyContainer.js`
  - **Acción**: Implementar un contenedor que gestione la creación e inyección de dependencias para las clases `ApiService`, `HttpClientConfig`, y `NetworkService`.

- **Subtarea 7.2.2: Verificar la creación de `DependencyContainer.js`**
  - **Verificación**: Asegurarse de que `DependencyContainer.js` exporta correctamente las instancias configuradas de las clases con sus dependencias inyectadas.

---

#### **8. Separar la Lógica de Verificación de Endpoints**

**8.1. Crear un módulo para la verificación de endpoints**

- **Subtarea 8.1.1: Crear archivo `EndpointChecker.js`**
  - **Archivo a crear**: `src/JS/NetworkCheck/EndpointChecker.js`
  - **Acción**: Implementar una clase o conjunto de funciones que se encarguen exclusivamente de verificar la salud de los endpoints.

- **Subtarea 8.1.2: Verificar la creación de `EndpointChecker.js`**
  - **Verificación**: Comprobar que `EndpointChecker.js` exporta correctamente las funciones o clases para la verificación de endpoints.

**8.2. Modificar `HttpClientConfig` para utilizar `EndpointChecker`**

- **Subtarea 8.2.1: Inyectar `EndpointChecker` en `HttpClientConfig.js`**
  - **Archivo a modificar**: `src/config/HttpClientConfig.js`
  - **Acción**: Ajustar `HttpClientConfig` para utilizar `EndpointChecker` en lugar de manejar la verificación internamente.

- **Subtarea 8.2.2: Verificar la modificación de `HttpClientConfig.js`**
  - **Verificación**: Asegurarse de que `HttpClientConfig` utiliza `EndpointChecker` correctamente para la verificación de endpoints.

---

#### **9. Refactorizar `NetworkService` para Mayor Cohesión**

**9.1. Crear una clase `PayloadGenerator`**

- **Subtarea 9.1.1: Crear archivo `PayloadGenerator.js`**
  - **Archivo a crear**: `src/JS/NetworkCheck/PayloadGenerator.js`
  - **Acción**: Implementar una clase o función que se encargue exclusivamente de generar el payload para las solicitudes.

- **Subtarea 9.1.2: Verificar la creación de `PayloadGenerator.js`**
  - **Verificación**: Comprobar que `PayloadGenerator.js` exporta correctamente la clase o función para la generación de payload.

**9.2. Modificar `NetworkService` para utilizar `PayloadGenerator`**

- **Subtarea 9.2.1: Inyectar `PayloadGenerator` en `NetworkService.js`**
  - **Archivo a modificar**: `src/JS/NetworkCheck/NetworkService.js`
  - **Acción**: Ajustar `NetworkService` para utilizar `PayloadGenerator` en lugar de generar el payload internamente.

- **Subtarea 9.2.2: Verificar la modificación de `NetworkService.js`**
  - **Verificación**: Asegurarse de que `NetworkService` utiliza `PayloadGenerator` correctamente para la generación de payload y que ya no contiene el método `_getRequestPayload`.

---

#### **10. Mejorar el Logging a través de Abstracciones**

**10.1. Modificar `ApiService` para usar `ILogger`**

- **Subtarea 10.1.1: Actualizar `ApiService.js` para recibir `ILogger`**
  - **Archivo a modificar**: `src/JS/NetworkCheck/ApiService.js`
  - **Acción**: Ajustar `ApiService` para recibir una instancia de `ILogger` en lugar de importar directamente `LogService`.

- **Subtarea 10.1.2: Verificar la modificación en `ApiService.js`**
  - **Verificación**: Asegurarse de que `ApiService` ahora utiliza una instancia de `ILogger` correctamente.

**10.2. Modificar `HttpClientConfig` para usar `ILogger`**

- **Subtarea 10.2.1: Actualizar `HttpClientConfig.js` para recibir `ILogger`**
  - **Archivo a modificar**: `src/config/HttpClientConfig.js`
  - **Acción**: Ajustar `HttpClientConfig` para recibir una instancia de `ILogger` en lugar de importar directamente `LogService`.

- **Subtarea 10.2.2: Verificar la modificación en `HttpClientConfig.js`**
  - **Verificación**: Comprobar que `HttpClientConfig` utiliza una instancia de `ILogger` correctamente.

**10.3. Modificar `NetworkService` para usar `ILogger`**

- **Subtarea 10.3.1: Actualizar `NetworkService.js` para recibir `ILogger`**
  - **Archivo a modificar**: `src/JS/NetworkCheck/NetworkService.js`
  - **Acción**: Ajustar `NetworkService` para recibir una instancia de `ILogger` en lugar de importar directamente `logger`.

- **Subtarea 10.3.2: Verificar la modificación en `NetworkService.js`**
  - **Verificación**: Asegurarse de que `NetworkService` utiliza una instancia de `ILogger` correctamente.

---

#### **11. Aumentar la Extensibilidad de `ApiService`**

**11.1. Crear una clase abstracta `AbstractApiService`**

- **Subtarea 11.1.1: Crear archivo `AbstractApiService.js`**
  - **Archivo a crear**: `src/JS/NetworkCheck/AbstractApiService.js`
  - **Acción**: Crear una clase base abstracta que define la interfaz de `ApiService` y permite su extensión.

- **Subtarea 11.1.2: Verificar la creación de `AbstractApiService.js`**
  - **Verificación**: Comprobar que `AbstractApiService.js` define correctamente la clase abstracta con los métodos necesarios.

**11.2. Crear una implementación concreta de `ApiService`**

- **Subtarea 11.2.1: Crear archivo `ConcreteApiService.js`**
  - **Archivo a crear**: `src/JS/NetworkCheck/ConcreteApiService.js`
  - **Acción**: Implementar una clase que extienda `AbstractApiService` y proporcione las implementaciones específicas.

- **Subtarea 11.2.2: Verificar la creación de `ConcreteApiService.js`**
  - **Verificación**: Asegurarse de que `ConcreteApiService.js` exporta la clase que extiende `AbstractApiService` y que implementa todos los métodos requeridos.

---

#### **12. Refactorizar Configuraciones para Mayor Flexibilidad**

**12.1. Asegurar que `HttpClientConfig` cumple con `IAppConfig`**

- **Subtarea 12.1.1: Revisar y ajustar `HttpClientConfig.js`**
  - **Archivo a modificar**: `src/config/HttpClientConfig.js`
  - **Acción**: Asegurar que las configuraciones manejadas en `HttpClientConfig` están alineadas con la interfaz `IAppConfig`.

- **Subtarea 12.1.2: Verificar la adherencia de `HttpClientConfig.js` a `IAppConfig`**
  - **Verificación**: Comprobar que todas las propiedades necesarias según `IAppConfig` están correctamente implementadas en `HttpClientConfig.js`.

---

#### **13. Asegurar la Testabilidad mediante Mocking de Dependencias**

**13.1. Configurar el entorno de pruebas para soportar inyección de dependencias**

- **Subtarea 13.1.1: Crear archivo de configuración para pruebas `setupTests.js`**
  - **Archivo a crear**: `tests/setupTests.js`
  - **Acción**: Configurar un entorno de pruebas que permita inyectar mocks para las interfaces `IHttpClient`, `ILogger`, etc.

- **Subtarea 13.1.2: Verificar la configuración de `setupTests.js`**
  - **Verificación**: Asegurarse de que el entorno de pruebas puede inyectar y utilizar mocks para las dependencias.

**13.2. Escribir pruebas unitarias para `ApiService` utilizando mocks**

- **Subtarea 13.2.1: Crear archivo de pruebas `ApiService.test.js`**
  - **Archivo a crear**: `tests/ApiService.test.js`
  - **Acción**: Implementar pruebas unitarias para `ApiService` utilizando mocks para `IHttpClient` y `ILogger`.

- **Subtarea 13.2.2: Verificar las pruebas unitarias de `ApiService.test.js`**
  - **Verificación**: Ejecutar las pruebas para asegurarse de que pasan correctamente y que las dependencias están siendo mockeadas adecuadamente.
