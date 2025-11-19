PuntoRed – Frontend de Recargas

Aplicación web desarrollada en React + TypeScript + Vite, que permite consultar proveedores, realizar recargas y visualizar histórico de transacciones para la prueba tecnica frontend.
Incluye autenticación, validaciones, manejo de reglas de negocio y persistencia local.

Como ejecutarlo?
Para clonar repositorio: 
git clone https://github.com/tu-repo/puntored-frontend.git
cd puntored-frontend

Instalar dependencias:
npm install

Ejecutar en local:
npm run dev
Ir en el navegador a: http://localhost:5173

Arquitectura General
src/
 ├─ api/                  # Llamadas a los endpoints (auth, recargas, proveedores)
 ├─ components/           # Componentes reutilizables (Escalable, pero no lo utilice)
 ├─ contexts/             # AuthContext + almacenamiento de token
 ├─ pages/                # Pantallas: Login, Proveedores, Recargas, Histórico
 ├─ routes/               # Sistema de rutas protegidas y públicas
 ├─ utils/                # Helpers: almacenamiento local, formateos
 ├─ layouts/              # Sistema de LayoutPrivado para despues del login
 ├─ validators/           # Reglas de negocio y validación
 ├─ styles/               # Tailwind + estilos base
 └─ main.tsx              # Entry point

 Librerias: 

| Librería                 | Uso                                      |
| ------------------------ | ---------------------------------------- |
| **React 19**             | Base del frontend                        |
| **React Router DOM**     | Manejo de rutas públicas / privadas      |
| **TypeScript**           | Tipado estático y mayor robustez         |
| **TailwindCSS**          | Estilos rápidos y consistente con diseño |
| **@tailwindcss/postcss** | Integración con Vite                     |
| **Vite**                 | Bundler rápido y moderno                 |
| **Vercel**               | Despliegue gratuito jeje                 |
| **Axios**                | Cliente HTTP para consumir endpoints del backend |

En un futuro se puede ampliar a: 
| Librería                  | Uso                  |
| ------------------------- | -------------------- |
| **Vitest**                | Tests unitarios      |
| **React Testing Library** | Tests de componentes |
(No llegue a usarlos debido al tiempo pero si conozco del tema vitest para hacer test)

Decisiones Técnicas y Justificación:
1. AuthContext para login y persistencia
Se usó Context API para manejar el token globalmente y proteger rutas.
Esto evita prop drilling y mantiene el estado de autenticación centralizado.

2. Validaciones externas (validators/)
Separar las validaciones del formulario evita duplicación y mejora mantenibilidad.
Aquí se implementan reglas de negocio como:

-Teléfono debe iniciar en "3" y tener 10 dígitos
-Monto mínimo/máximo
-Clave transaccional de 6 dígitos
-Producto obligatorio

3. Persistencia en localStorage
Permite:
Mantener sesión iniciada
Mantener proveedor seleccionado
Guardar histórico de recargas
Esto mejora UX sin depender del backend.

4. TailwindCSS
Elección por:
Velocidad de desarrollo
Menos archivos CSS adicionales
Failita componentes responsivos
Muy buen performance en producción

5. React + Vite
Vite se selecciona por:
Compilación muy rápida
Hot Reload instantáneo
Mejor rendimiento que CRA
Soporte excelente para TS

6. Arquitectura modular
El código está dividido por feature, no por tipo de archivo, lo que facilita:
Escalabilidad
Reutilización
Lectura limpia del proyecto

Autor

Santiago Usaquén
Desarrollador Frontend / Backend / Cloud
💬 Disponible para mejoras o ampliaciones del proyecto.

