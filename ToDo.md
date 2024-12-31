# 1. Investigar la posibilidad de añadir parámetros de configuración (por ejemplo, un archivo de configuración) para inyectar diferentes endpoints o comportamientos sin tocar el código original

## 1.1 Análisis y definición de la estrategia de configuración

1.1.1 **Revisión de la estructura del proyecto**  
- Analizar la estructura de carpetas y archivos para determinar dónde ubicar un nuevo archivo de configuración (e.g., `config.js` o `config.json`) que permita inyectar endpoints o comportamientos.  
- Verificar si se usará un archivo único (por ejemplo `config.js`) o varios archivos según el entorno (`config.development.js`, `config.production.js`, etc.).

1.1.2 **Selección del formato de configuración**  
- Decidir si se utilizará un formato JSON, JavaScript, YAML, etc.  
- Asegurarse de que el formato sea compatible con las herramientas de build y con el proceso de despliegue (por ejemplo, Vue CLI).

1.1.3 **Revisión de los mecanismos actuales de configuración**  
- Revisar las variables de entorno existentes (`.env.production`, `.env.development`) y determinar si estas se van a combinar con el nuevo archivo de configuración o si se mantendrán en paralelo.  
- Verificar la compatibilidad con `process.env` dentro de la aplicación (por ejemplo, `process.env.VUE_APP_*`).

---

## 1.2 Implementación de la lectura de la configuración

1.2.1 **Creación de un módulo de configuración**  
- Crear un archivo (por ejemplo, `src/config/index.js`) que exporte un objeto con los parámetros de configuración.  
- Incluir las rutas (endpoints), flags de comportamiento (e.g. `useStreaming`, `useSocket`, etc.) y otras opciones necesarias.

1.2.2 **Integración de la configuración en los servicios**  
- Inyectar la nueva configuración en los servicios que la requieran (por ejemplo, `MessageService`, `ChatService`, etc.).  
- Evitar modificar directamente el código de los servicios; en lugar de ello, pasar la configuración como dependencia (inyección de dependencias).  
  - *Ejemplo de inyección conceptual:* en el constructor de `MessageService` o en su instancia, aceptar un objeto `config` que contenga la información de endpoints, streaming, etc.

1.2.3 **Validación de la configuración**  
- Implementar validaciones mínimas (por ejemplo, si existe la URL del endpoint o si los tipos de dato son correctos).  
- En caso de que falte algún parámetro esencial, se podría lanzar una advertencia o un error para facilitar el debugging.

1.2.4 **Adaptación de la lógica para usar los nuevos parámetros**  
- Donde actualmente se hace referencia a `process.env.VUE_APP_URL_BACK` (u otras variables de entorno), sustituir ese acceso directo por la nueva configuración.  
- Asegurarse de que, en entornos de producción, la configuración final coincida con la esperada y no genere conflictos con otras variables de entorno.

1.2.5 **Documentación de la configuración**  
- Agregar un README o comentario explicando cómo añadir nuevos parámetros o modificar los existentes.  
- Incluir ejemplos de cómo inyectar comportamientos adicionales (por ejemplo, `useExperimentalEndpoint: true`).

---

## 1.3 Pruebas y validación final

1.3.1 **Testing local con diferentes configuraciones**  
- Probar el proyecto localmente con diferentes valores de configuración para asegurar que los endpoints y flags funcionen correctamente sin modificar el código fuente.  

1.3.2 **Testing de integración**  
- Realizar pruebas sobre los servicios que consumen la configuración, para verificar que la inyección de dependencias funciona y no se rompen las interacciones de la aplicación (por ejemplo, `MessageService`, `ChatService`).  

1.3.3 **Despliegue en un entorno de prueba**  
- Subir la aplicación a un entorno de staging o QA con una configuración distinta y verificar que se lee correctamente y no hay errores en consola.  

1.3.4 **Revisión y retroalimentación**  
- Recoger feedback de los involucrados (desarrolladores, QA) sobre la facilidad para cambiar parámetros sin tocar el core de la aplicación.  
- Ajustar la documentación o la estructura de la configuración en caso necesario.

---

# 2. Revisar la forma de extender `ApiService` si se necesitan más endpoints (por ejemplo, un `ApiServiceFactory`)

## 2.1 Análisis de la estructura y responsabilidades de `ApiService`

2.1.1 **Revisar la implementación actual de `ApiService`**  
- Ver cómo `ApiService` envía los mensajes (`sendApiMessage`) y qué tipo de endpoints maneja.  
- Analizar dónde se inyectan o configuran los endpoints dentro de `ApiService` actualmente.

2.1.2 **Identificar los puntos de extensión requeridos**  
- Determinar si la extensión requerirá nuevos métodos (por ejemplo, `sendApiFile`, `sendApiAuth`, etc.) o nuevos endpoints que respondan a distintos patrones (REST, GraphQL, WebSockets).  
- Definir si cada endpoint adicional tendrá lógica diferente o si solo se necesita cambiar la URL.

2.1.3 **Definir si se necesita un `ApiServiceFactory`**  
- Evaluar la conveniencia de un patrón *Factory* o *Abstract Factory* para instanciar diferentes variantes de `ApiService` (e.g., `ApiServiceREST`, `ApiServiceGraphQL`).  
- Definir la interfaz común que todas las variantes de `ApiService` deben implementar (por ejemplo, un método `sendRequest`, `sendApiMessage`, etc.).

---

## 2.2 Planificación de la refactorización o extensión de `ApiService`

2.2.1 **Creación de una interfaz o clase base**  
- Crear un contrato (por ejemplo, `IApiService`) que describa los métodos esenciales (e.g., `sendApiMessage(payload, userId, stream, datetime)`).  
- Definir qué métodos deben ser obligatorios y cuáles opcionales.  

2.2.2 **Implementación de distintas clases concretas (si aplica)**  
- Definir clases concretas (por ejemplo, `ApiServiceREST`) que implementen la interfaz base.  
- En caso de varios endpoints, diseñar métodos específicos: `sendToEndpointA`, `sendToEndpointB`, etc., en la misma clase o en clases separadas según el diseño.

2.2.3 **Creación de un `ApiServiceFactory`**  
- Diseñar la clase *Factory* con un método (por ejemplo, `createApiService(type, config)`) que retorne la instancia adecuada en función de ciertos criterios (`type = 'REST'`, `'GraphQL'`, etc.).  
- En este método, usar la configuración previamente diseñada (ver sección 1) para inyectar los endpoints, timeouts, headers, etc.

2.2.4 **Refactorización de `MessageService` para usar la fábrica**  
- Reemplazar la referencia directa a `ApiService` en `MessageService` por una llamada al `ApiServiceFactory`.  
- Permitir que `MessageService` reciba la instancia de `ApiService` como dependencia, en lugar de importarla directamente (inyección de dependencias).

---

## 2.3 Ajuste de dependencias y configuración

2.3.1 **Revisión de los lugares donde se instancia o usa `ApiService`**  
- Asegurar que en toda la aplicación se use la nueva `Factory` o la interfaz en lugar de usar directamente la clase concreta `ApiService`.  
- Mantener compatibilidad retroactiva, si es necesario, creando un “adaptador” o un “alias” temporal para no romper funciones ya existentes.

2.3.2 **Integración con los parámetros de configuración**  
- En la lógica de la *Factory*, leer la información de endpoints desde el módulo de configuración desarrollado en la sección 1.  
- Asociar cada endpoint a su tipo de servicio o clase concreta de `ApiService`.

2.3.3 **Documentación de cómo agregar nuevos endpoints**  
- Incluir en la documentación del proyecto ejemplos de cómo crear un nuevo endpoint (ej. `ApiServiceX`) y registrarlo en la *Factory*.  
- Explicar cómo se pueden usar los parámetros del archivo de configuración para personalizar estos endpoints.

---

## 2.4 Pruebas y validación de la nueva arquitectura de `ApiService`

2.4.1 **Pruebas unitarias de cada clase de `ApiService`**  
- Crear tests para `ApiServiceREST`, `ApiServiceGraphQL` o la que se implemente, verificando que cumplan con el contrato de interfaz (`IApiService`).  
- Probar llamadas exitosas y manejo de errores.

2.4.2 **Pruebas unitarias e integración del `ApiServiceFactory`**  
- Verificar que la *Factory* retorne la instancia correcta según los parámetros de configuración o tipo solicitado.  
- Probar comportamientos cuando faltan configuraciones (por ejemplo, endpoint no definido).

2.4.3 **Pruebas end-to-end con la aplicación**  
- Ejecutar la aplicación con distintos “tipos” de `ApiService` (si es que se implementa la lógica para varios).  
- Verificar que `MessageService` sigue funcionando sin necesidad de cambiar su lógica interna, solo recibiendo distintas implementaciones de `ApiService`.

2.4.4 **Revisión final**  
- Revisar la facilidad de extensión y la adherencia al Principio Abierto/Cerrado: no modificar código existente, sino solo añadir nuevo código para soportar nuevos endpoints o comportamientos.  
- Ajustar la documentación según el feedback obtenido durante las pruebas.

---

## 2.5 Despliegue y monitoreo

2.5.1 **Despliegue con la nueva configuración y servicios**  
- Actualizar los entornos (staging, producción) para incluir el nuevo archivo de configuración o parámetros.  
- Monitorear la aplicación en ejecución para validar que los endpoints y servicios nuevos trabajen conforme a lo esperado.

2.5.2 **Monitoreo continuo**  
- Configurar logs o métricas (si se requiere) para evaluar el desempeño de los nuevos endpoints y la respuesta de la *Factory*.  
- Documentar posibles mejoras e incluirlas en el backlog.
