# Conecta+ · Cotizador
## Take-Home Task: Founding Engineer

### Autor
**Daniel Lanao**
- [daniellanao.com](https://daniellanao.com)
- [linkedin.com/in/daniel-lanao](https://www.linkedin.com/in/daniel-lanao/)




Herramienta para **creadores de contenido**: explorar perfiles de referencia y registrar nuevos creadores (demo con API y almacén en memoria).

---

## Instalación

```bash
npm install
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000).
**Requisitos:** Node.js acorde a Next 16 (recomendado LTS actual).

## Desarrollo
- Se utilizó Next.js para tener interfaz gráfica y visualizar mejor el task y la presentación.
- El proyecto está desplegado en [https://conecta-cotiza.vercel.app/](https://conecta-cotiza.vercel.app/); no hace falta instalar localmente para probarlo.
- Se expusieron **endpoints REST** para consumir la app desde otro cliente (web, móvil, script, etc.).

### API REST

Base URL en producción: `https://conecta-cotiza.vercel.app`  
En local: `http://localhost:3000`

| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/api/creators` | `GET`, `POST` | **GET:** lista todas las creadoras (`{ "creators": [...] }`). **POST:** registra una nueva creadora con JSON de perfil y redes; responde `{ "creator": {...} }` (**201**). El `id` en el body es opcional. |
| `/api/creators/{id}` | `GET` | Devuelve el perfil de una creadora por `id`. Si no existe: **404** con `{ "error": "Creadora no encontrada" }`. |
| `/api/creators/{id}/content` | `GET` | Cotiza todos los formatos de contenido para esa creadora según el modelo de precio. Responde `{ "creatorId", "contents": [{ "id", "name", "price" }, ...] }`. |

**Ejemplos**

```bash
# Listar creadoras
curl https://conecta-cotiza.vercel.app/api/creators

# Detalle de la creadora con id "1"
curl https://conecta-cotiza.vercel.app/api/creators/1

# Precios por tipo de contenido para la creadora "1"
curl https://conecta-cotiza.vercel.app/api/creators/1/content
```

El `POST` a `/api/creators` espera, entre otros: `name`, `age`, `country`, `city`, `niche`, `yearsExperience` (0–10) y `platforms` con al menos una red (`instagram`, `tiktok`, `youtube`, `x`, `linkedin`), cada una con `followers` y `engagementRate` (0–100).

---

## Algoritmo del Cálculo 

- Hay muchas variables para hacer este tipo de cálculo , por ahora se toman en consideracion solo las variables de entrada que se mostraron en las indicaciones del ejercicio: 
    - Pais
    - Tiempo activo como UGC (User - Generated Content). 
    - Nicho de contenido,  
    - Plataformas donde se crea (Instagarm, Tiktok , youtube, x , linkedin)
    - Tamaño de audiencia y tasa de engagement por plataforma, 

- Fórmula (EUR):

  `precio = base × país × experiencia × nicho × ∏(por cada red: seguidores × engagement/100 × peso_red)`

  El resultado se redondea **hacia arriba** al siguiente múltiplo de 10 (ej.: 187 → 190). Si el creador no tiene redes cargadas, el producto de redes vale **1**.

- **Precio base del contenido** (`data/contents.seed.ts`)

  | Formato | Base (EUR) |
  |---------|------------|
  | Post en Feed | 30 |
  | Reel | 45 |
  | Story (pack) | 30 |
  | UGC para marca | 60 |
  | Video largo +60s | 80 |

- **Multiplicador de país** (`data/countries.seed.ts`) — rango 1.0–1.39

  | País | Multiplicador |
  |------|---------------|
  | España | 1.39 |
  | Brasil | 1.37 |
  | México | 1.35 |
  | Colombia | 1.24 |
  | Argentina | 1.20 |
  | Chile | 1.16 |
  | Uruguay | 1.14 |
  | Perú | 1.12 |
  | Costa Rica | 1.10 |
  | Ecuador | 1.08 |
  | República Dominicana | 1.00 |

  Si el país no coincide con el catálogo, se usa **1**.

- **Multiplicador de experiencia** (`data/experience-years.seed.ts`) — años UGC (0–10)

  Fórmula: `1 + (años / 10) × 0.2` → rango **1.0 – 1.2**

  | Años | Multiplicador | Años | Multiplicador |
  |------|---------------|------|---------------|
  | 0 | 1.00 | 6 | 1.12 |
  | 1 | 1.02 | 7 | 1.14 |
  | 2 | 1.04 | 8 | 1.16 |
  | 3 | 1.06 | 9 | 1.18 |
  | 4 | 1.08 | 10 | 1.20 |
  | 5 | 1.10 | | |

- **Multiplicador de nicho** (`data/niches.seed.ts`) — rango 1.0–1.30

  | Nicho | Multiplicador |
  |-------|---------------|
  | Software, SaaS & B2B | 1.30 |
  | Finanzas personales & Tecnología | 1.28 |
  | Emprendimiento & Negocios | 1.26 |
  | Gaming & Tecnología | 1.24 |
  | Belleza & Skincare | 1.22 |
  | Wellness & Mental Health | 1.20 |
  | Moda & Lifestyle | 1.18 |
  | Fitness & Deporte | 1.16 |
  | Educación & Cursos online | 1.14 |
  | Viajes & Turismo | 1.10 |
  | Familia & Crianza | 1.08 |
  | Food & Recipes | 1.00 |

  Si el nicho no coincide con el catálogo, se usa **1**.

- **Multiplicador de redes** (`models/platform.ts` + `services/calculate_price.service.ts`)

  Por cada plataforma registrada:

  `factor_red = seguidores × (tasa_engagement / 100) × peso_plataforma`

  Los factores de todas las redes se **multiplican** entre sí.

  **Peso por plataforma** (coeficiente de catálogo):

  | Plataforma | Peso |
  |------------|------|
  | Instagram | 0.00032 |
  | TikTok | 0.00042 |
  | YouTube | 0.00038 |
  | X | 0.00030 |
  | LinkedIn | 0.00050 |

  **Ejemplo** — Instagram con 100 000 seguidores y 7 % de engagement:

  `100 000 × 0.07 × 0.00032 = 2.24`

  Con dos redes, el bloque “producto de redes” sería `factor_instagram × factor_tiktok × …`.

- Variables que no estan en consideracion en el algoritmo pero que deberían considerarse: 
    - Complejidad del contendio: video editado, tiempo de video , efectos , etc
    - Ciudad donde esta el creador de contendio.

> **Nota importante:** Faltaría hacer un análisis más exhaustivo de cada multiplicador, pero la ventaja es que si la data está en base de datos se puede ir puliendo poco a poco hasta tener un modelo más exacto.


---

## Stack

| Capa        | Tecnología                          |
| ----------- | ----------------------------------- |
| Framework   | **Next.js** 16 (App Router)         |
| UI          | **React** 19, **Tailwind CSS** v4   |
| Lenguaje    | **TypeScript**                      |
| Iconos      | **Font Awesome** (React + SVG)     |
| Datos (demo)| Memoria compartida (`globalThis`) + seed |

---


## Próximos pasos

Orden sugerido para pasar de demo a producto usable:

### 1. Base de datos, Ej Supabase
- Sustituir el uso de memoria local , por una base de datos en la nube (ej Supabase) que seria en PostgreSQL. (Tambien se pueden tener otros proveedores como Prisma o MySQL)
- Subir en la base deatos las tablas de creadores, plataformas por creador, países, nichos, tipos de contenido y pesos por red.

### 2. Calibrar el modelo de precio
- Analizar profundamente los multiplicadores y hacer varios test internos hasta tener los numeros correctos
- Incorporar nuevas variables: complejidad del contenido (duración, edición, derechos de uso) y ubicación más fina que país (ciudad/región).
- Conectar precios reales cerrados (histórico de campañas) para contrastar el modelo y recalibrar coeficientes.

### 3. Mejorar Feedback al usuario
- Con modelo mas fino , se pueden mejorar el feedback o devolver un detallado donde se recomiende al usuario que factor le conviene mejorar para incrementar su precio. Quickwins. 

### 4. Migrar el proyecto a Node.js y Express
- Para utilizar que otro proyecto ya mas aterrizado pueda usar este feature, el proyecto deberia tener los endpoints solo en Node.js listo para hacer deployment y que pueda ser utilizado sin la parte grafica que se desarrollo ahora. 

