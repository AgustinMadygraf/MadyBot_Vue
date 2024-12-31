## 3. Delegar la referencia de elementos al componente Vue
**Archivo principal:** `src/components/ChatBot.vue`

3.1 **Pasar menos referencias al script de lógica**  
   - Evitar o reducir el uso de `this.$refs` en `ChatBotLogic.js`.  
   - Manejar las referencias de `ref="messageContainer"` directamente en `ChatBot.vue` y, si es necesario, propagar un evento hacia la lógica para indicar que el contenedor está listo o se ha desplazado.

3.2 **Utilizar props o data en el componente**  
   - Cuando la lógica de negocio cambie `messages`, el componente Vue debe actualizar la vista automáticamente.  
   - Mantener la lógica de re-render en la capa de la vista (o en watchers específicos, si se necesitan).

---

## 4. Implementar un patrón de notificación o eventos
**Archivos involucrados:**  
- `ChatBot.vue` (interfaz)  
- `ChatBotLogic.js` (lógica de negocio)

4.1 **Comunicar cambios de estado o errores mediante eventos**  
   - En lugar de que `ChatBotLogic.js` modifique directamente el DOM, puede lanzar eventos como `messageSent`, `messageReceived` o `errorOccurred`.  
   - `ChatBot.vue` escucha esos eventos y ejecuta la actualización de la interfaz (scroll, mensajes de error en pantalla, etc.).

4.2 **Evitar acoplamientos fuertes**  
   - De este modo, la lógica no depende de la ubicación del elemento ni de la clase CSS.  
   - El componente Vue sí “sabe” cómo presentar o desplazar la ventana de chat, pero no necesita la lógica de negocio incrustada.

---

## 5. Verificar la mantenibilidad de la nueva estructura
**Archivos a revisar después de la refactorización:**  
- `ChatBot.vue`  
- `ChatBotLogic.js`  
- `ChatService.js`

5.1 **Probar que la funcionalidad se conserva**  
   - Asegurarse de que, tras la extracción de la lógica de scroll, siga funcionando el envío y recepción de mensajes.  
   - Verificar que la responsabilidad de actualizar la interfaz realmente quedó aislada en `ChatBot.vue`.

5.2 **Establecer pautas de evolución del proyecto**  
   - Si en el futuro se añaden nuevas funciones relacionadas con la interfaz (por ejemplo, animaciones, ventanas modales, etc.), estas deben ir en la capa de vista.  
   - Si se agregan nuevos procesos de negocio (validaciones, integración con otros servicios), irán en `ChatBotLogic.js` o en otro servicio de negocio.
