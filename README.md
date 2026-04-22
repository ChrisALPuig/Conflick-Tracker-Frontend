# Conflict Tracker - Fullstack Deployment

Aplicación fullstack para la gestión de conflictos, países, facciones y eventos desarrollada con:

- Backend: Spring Boot (Java 17)
- Frontend: Vue 3 + Vite
- Base de datos: Supabase (PostgreSQL)
- Deploy Backend: Render
- Deploy Frontend: Vercel

---

# URL del proyecto en producción

Frontend:
https://conflick-tracker-frontend-six.vercel.app

Backend API:
https://conflict-tracker-api-o7cu.onrender.com/api/v1

---

# Arquitectura del sistema


### Capas:

- **Frontend (Vercel)**  
  SPA en Vue 3 que consume la API REST.

- **Backend (Render)**  
  API REST en Spring Boot con arquitectura MVC.

- **Base de datos (Supabase)**  
  PostgreSQL en la nube con relaciones entre:
  - countries
  - conflicts
  - factions
  - events

---

# Variables de entorno

## Backend (Render)

Configurar en Render:

```
  DB_URL=jdbc:postgresql://aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require
  DB_USERNAME=postgres.ltgmwaluzmwgyjarndgt
  DB_PASSWORD=TU_PASSWORD_SUPABASE
  PORT=8080
```

---

## Frontend (Vercel)

Crear variable:

  VITE_API_URL=https://conflict-tracker-api-o7cu.onrender.com/api/v1


---

# 🔧 Configuración importante

## Backend (Spring Boot)

### application.properties

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.sql.init.mode=never

server.port=${PORT:8080}
```
--- 

CORS Configuration

  @Configuration
  public class CorsConfig {

      @Bean
      public WebMvcConfigurer corsConfigurer() {
          return registry -> registry.addMapping("/**")
                  .allowedOrigins(
                          "https://conflick-tracker-frontend-six.vercel.app"
                  )
                  .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                  .allowedHeaders("*")
                  .allowCredentials(true);
      }
  }

---

## Frontend API config

  const BASE_URL = import.meta.env.VITE_API_URL

  export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    })

    if (!response.ok) throw new Error("API Error")
    if (response.status === 204) return null
    return response.json()
  }

  ---

#  Problemas encontrados y soluciones
## 1. Error: JAVA_HOME not defined (Render)

Problema:
Render intentaba usar Node en vez de Java.

Solución:
Se configuró el servicio como Docker en lugar de Node.

## 2. Error: mvn not found

Problema:
El entorno no tenía Maven instalado.

Solución:
Uso de ./mvnw dentro de Docker.

## 3. Error: PostgreSQL driver not found

Problema:
Spring no encontraba org.postgresql.Driver.

Solución:
Añadida dependencia PostgreSQL en pom.xml:

  ```<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
  </dependency>
```

## 4. Error CORS (bloqueo frontend)

Problema:
El navegador bloqueaba peticiones.

Solución:
Configuración correcta de CORS en Spring Boot con dominio Vercel.

## 5. Countries no aparecían en frontend

Problema:
El frontend intentaba obtener countries desde conflicts.

Solución:
Se creó endpoint independiente:

```
  GET /countries
```

## 6. Error TypeScript Vue (deploy Vercel)

Problema:
Faltaban tipos para archivos .vue.

Solución:
Se añadió env.d.ts:
```
  declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
  }
```
