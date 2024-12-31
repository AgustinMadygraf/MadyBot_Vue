# TODO

## 1. Configuración de BASE_URL para desarrollo y producción
1.1. **Agregar las dos propiedades** en `config.json`:
   - `BASE_URL_DEV`
   - `BASE_URL_PROD`
   
   ```jsonc
   // Ejemplo de config.json
   {
     "API_ENDPOINT_DEV": "http://localhost:3000",
     "API_ENDPOINT_PROD": "http://192.168.0.118:5000",
     "BASE_URL_DEV": "/",
     "BASE_URL_PROD": "/MadyBot_Vue/dist/",
     "STREAM_ENABLED": false
   }
   ```

1.2. **Crear/actualizar el wrapper** en `src/config/index.js` para exportar una configuración final (`API_ENDPOINT` y `BASE_URL`) acorde al entorno:
   ```js
   import config from './config.json';

   const isProd = process.env.NODE_ENV === 'production';

   const finalConfig = {
     ...config,
     API_ENDPOINT: isProd ? config.API_ENDPOINT_PROD : config.API_ENDPOINT_DEV,
     BASE_URL: isProd ? config.BASE_URL_PROD : config.BASE_URL_DEV,
   };

   export default finalConfig;
   ```

1.3. **Modificar `vue.config.js`** para que el `publicPath` use `finalConfig.BASE_URL`. Se debe importar el wrapper, pero hay que tener en cuenta el modo en que se exporta/usa la configuración en Node al momento de hacer `npm run build`.

   ```js
   // vue.config.js
   const { defineConfig } = require('@vue/cli-service');
// ⚠️ OJO: Importar usando require porque vue.config.js se ejecuta en Node
   const finalConfig = require('./src/config/configWrapperNode'); 
   // Podrías necesitar un archivo especial que haga un require de config.json 
   // y aplique la lógica de isProd (según process.env.NODE_ENV), 
   // ya que ESM "import" a veces da problemas en vue.config.js.

   module.exports = defineConfig({
     publicPath: finalConfig.BASE_URL,
     // ... resto de la configuración ...
   });
   ```

1.4. **Verificar** que todos los componentes y servicios que usaban `process.env.VUE_APP_URL_BACK` o `process.env.VUE_APP_BASE_URL` apunten ahora a la propiedad `AppConfig.API_ENDPOINT` o `AppConfig.BASE_URL`.

## 2. Unificar el uso de `API_ENDPOINT` en la aplicación
2.1. Reemplazar en `ApiService.js`:
   ```diff
   // Eliminamos el uso de process.env.VUE_APP_URL_BACK
   constructor(baseUrl) {
   -  this.baseUrl = baseUrl || process.env.VUE_APP_URL_BACK;
   +  this.baseUrl = baseUrl || AppConfig.API_ENDPOINT;
     // ...
   }
   ```
   Donde `AppConfig` es el import desde `../../config/index.js`.

2.2. En el export por defecto de `ApiService`, usar:
   ```diff
   // Exporta una instancia preconfigurada de ApiService
   - const apiServiceInstance = new ApiService(process.env.VUE_APP_URL_BACK);
   + import AppConfig from '../../config';
   + const apiServiceInstance = new ApiService(AppConfig.API_ENDPOINT);
   export default apiServiceInstance;
   ```

2.3. **Probar** que, al hacer `npm run serve`, la aplicación se conecte a `API_ENDPOINT_DEV`.  
   Luego, **probar** que al hacer `npm run build` e iniciar la app en producción, se conecte a `API_ENDPOINT_PROD`.

## 3. Migrar todos los lugares donde se usa `process.env`
3.1. Verificar si hay referencias a `process.env.*` en:
   - `.env.development`, `.env.production`
   - Componentes Vue (`.vue`)
   - Otros servicios o archivos de la carpeta `JS/NetworkCheck`
   - Cualquier script de configuración adicional

3.2. **Eliminar** o limpiar el contenido de `.env.production` y `.env.development` si ya no es necesario.  
   - Asegurarse de no eliminar variables que se requieran en otras partes del proyecto.

## 4. Estrategia de fallback
4.1. Si no se ha definido un endpoint o bandera en `config.json`, decidir cómo manejarlo. Podríamos:
   - Lanzar un error controlado,
   - Asignar un valor por defecto,
   - O simplemente retornar `undefined`.

4.2. Implementar la estrategia elegida en el wrapper `src/config/index.js`. Por ejemplo:
   ```js
   if (!config.API_ENDPOINT_DEV || !config.API_ENDPOINT_PROD) {
     throw new Error('Endpoints de desarrollo/producción no definidos en config.json');
   }
   ```

## 5. Validación final
5.1. Revisar en la consola si se muestran mensajes de éxito o error y asegurarse de no romper la aplicación.  
5.2. Asegurarse de que la **interfaz** del chatbot y la lógica de envío de mensajes funcionen correctamente en ambos entornos (dev y prod).

---

## **Notas finales**
- Si se requiere **cargar** el `config.json` dinámicamente (por ejemplo, sin recompilar la app), se necesitaría una estrategia adicional (p.e., fetch al iniciar).  
- El uso de `process.env.NODE_ENV` es la forma más simple de distinguir **development** de **production** en apps Vue CLI.  
- Si más adelante decides usar Docker, o un pipeline de CI/CD, se podría inyectar el contenido de `config.json` en tiempo de despliegue.
