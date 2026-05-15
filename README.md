# Conecta+ · Cotizador
## Take-Home Task: Founding Engineer

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
- Se utilizó NEXTjs para poder tener una interfaz grafica y visualizar mejor el task y tambien la presentación

- El proyecto esta deployado en https://conecta-cotiza.vercel.app/ , no hay necesidad de instalar localmente.

- 

## Algoritmo del Cálculo 

- Hay muchas variables para hacer este tipo de cálculo , por ahora se toman en consideracion solo las variables de entrada que se mostraron en las indicaciones del ejercicio: 
    - Nicho de contenido,  
    - Plataformas donde se crea (Instagarm, Tiktok , youtube, x , linkedin)
    - Tamaño de audiencia y tasa de engagement por plataforma, 
    - Tiempo activo como UGC (User - Generated Content). 

- Entonces Seria:
    - Multiplicador de Usuario
    | País | Años de Experiencia | Nicho | Redes |

    - Multiplicador de Redes, se multiplican por cada plataforma
    |Red | Seguidores | Tasa de Engagement | Multiplicador de Red |
    |Instagram | 100K | 7% | 0.0003 |


- Variables que no estan en consideracion en el algoritmo y deberian: 
    - Complejidad del contendio , video editado, tiempo de video , efectos , etc
    - Ciudad, para hacerlo simple se considera pais, pero es una variable la ciudad, incluso distrito. 



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



