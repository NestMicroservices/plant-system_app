
# Sistema de Gestión de Plantas

Esta es una aplicación para la gestión de plantas, operaciones y costos indirectos, desarrollada con React, TypeScript y Vite. La app ofrece una interfaz moderna tipo dashboard para la administración y visualización de datos.

## Características

- Visualiza y gestiona plantas y sus operaciones
- Agrega, edita y elimina operaciones
- Configura costos indirectos para cada operación y volumen
- Interfaz adaptable y responsiva
- Desarrollo rápido con Vite

## Tecnologías

- React
- TypeScript
- Vite
- Apollo Client (GraphQL)
- Material UI

## Primeros pasos

1. **Instala las dependencias:**
```bash
git clone https://github.com/NestMicroservices/plant-system_app.git
cd plant-system_app
```

2. **Variables de entorno:**

Copia el archivo `.env.template` como `.env`:

Edita `.env` según tu entorno y credenciales.tall

3. **Instala las dependencias:**

  ```bash
  npm install
  ```

4. **Inicia el servidor de desarrollo:**

  ```bash
  npm run dev
  ```

5. **Abre la aplicación:**

  Ingresa a [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

- `src/` — Código fuente principal
  - `dashboard/` — Vistas y componentes del dashboard
  - `services/` — Clientes API y mutaciones/consultas GraphQL
  - `hooks/` — Hooks personalizados de React
  - `utils/` — Funciones utilitarias

## Personalización

Puedes extender la aplicación agregando nuevas funcionalidades, personalizando la interfaz o integrando otras APIs. Para configuración avanzada, consulta la documentación de Vite y ESLint.

## Licencia

MIT

You can extend the app by adding new features, customizing the UI, or integrating with other APIs. For advanced configuration, see the Vite and ESLint documentation.

## License

MIT
