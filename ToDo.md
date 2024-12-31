## 1. Extraer el manejo del scroll y la actualización de la interfaz
**Archivo principal:** `src/JS/ChatBot/ChatBotLogic.js`

1.1 **Crear un método o hook de Vue específico para el scroll**  
   - Identifica la parte del método `sendChatMessage` que gestiona el `scrollTop = messageContainer.scrollHeight`.  
   - Crea en el componente Vue (`ChatBot.vue`) un método como `handleScroll()` o un “hook” que se ejecute tras cada actualización de mensajes.  
   - Haz que `ChatBotLogic.js` invoque este método para notificar a la vista que debe desplazarse.

1.2 **Separar la responsabilidad del DOM**  
   - El código que localiza `this.$refs.messageContainer` no debería residir en la lógica de negocio.  
   - En lugar de ello, el componente Vue puede encargarse de obtener la referencia y manejar el desplazamiento.

---

## 2. Asegurar que `sendChatMessage` se enfoque en la interacción con `ChatService`
**Archivo principal:** `src/JS/ChatBot/ChatBotLogic.js`

2.1 **Reducir la dependencia de la vista**  
   - `sendChatMessage` debe ejecutar la lógica de envío (agregar el mensaje a la lista, invocar a `ChatService`, capturar errores) sin encargarse de tareas visuales.  
   - Después de que `sendChatMessage` termine, emitir un evento o actualizar un estado que el componente Vue observe para refrescar la interfaz (y así llamar el método de scroll, por ejemplo).

2.2 **Respetar la responsabilidad única**  
   - La lógica de negocio: almacenar el mensaje, obtener la respuesta del bot, manejar errores.  
   - La lógica de presentación: actualizar el DOM, hacer scroll, habilitar o deshabilitar botones, etc.

---

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
