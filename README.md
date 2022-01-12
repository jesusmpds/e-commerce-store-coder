# Tienda E-commerce - Taberna de un Videojuego

Este es un servidor web creado utilizando NodeJS como requisito de proyecto final para el curso de Backend de CoderHouse.

Te permite crear una cuenta en la Taberna y añadir artículos al carrito para generar ordenes de compra.

## Tecnologías usadas

Es una aplicación en **NodeJS** utilizando el framework **Express** y como base de datos **MongoDB**, utilizando **Mongoose** como ODM.

Para producción se utilza **pm2** para manejar los procesos de Node, de manera que los procesos hijos de la aplicación pueden compartir todos los núcleos disponibles.

Para la autenticación y la autorización utilicé la libreria **Passport** con su estrategia **Passport-Local** para autenticación con usuario y contraseña. La encriptación de las contraseñas se hace con la libreria **bcrypt**.

Las notificaciones al correo electrónico para usuarios recien creados y ordenes realizadas se manejan con **Nodemailer**.

El chat está implementado en base a la tecnología Websocket utilizando la libreria **socket.io.**

Para las vistas se utilizó como motor de plantillas **Handlebars**.

### Otras dependencias utlizadas en la aplicación

- express-sessions
- express-handlebars
- compression
- connect-mongo
- cookie-parser
- cors
- multer
- sweetalert2
- winston

#### Dependencias de desarrollo

- dotenv
- nodemon

## Estructura de la aplicación 📁

```sh
.
├───logs
└───src
    ├───auth
    │   └───strategies
    ├───config
    ├───controllers
    │   └───modules
    ├───dal
    │   ├───memory
    │   │   └───dao
    │   │       └───modules
    │   └───mongoDB
    │       ├───dao
    │       │   └───modules
    │       ├───dto
    │       └───models
    │           └───modules
    ├───middleware
    ├───public
    │   ├───css
    │   ├───images
    │   │   └───products
    │   └───js
    │       └───modules
    ├───routes
    │   └───modules
    ├───server
    ├───services
    │   └───modules
    ├───utils
    └───views
        ├───layouts
        ├───pages
        └───partials
```

En este repositorio se encuentra una **arquitectura de software por capas**.

Una arquitectura por capas describe un sistema de (normalmente) 3-4 capas que son responsables de tareas separadas. Cada capa puede utilizar la capa directamente inferior, pero no a la inversa. Esta aplicación posee las siguientes capas:

- Capa del servidor (Configuración, cargado de dependencias y puesta en marcha del servidor.)
- Capa de presentación (Vistas)
- Capa de rutas (Definicion de rutas y endpoints )
- Capa de controladores (Funciones que manejan)
- Capa de servicios (Lógica de negócio)
- Capa de acceso a los datos (Manejo de peticiones y transformación de los datos)

Cada capa posee un archivo **index** donde se reunen y exportan los **modulos** de cada capa, y ademas es en donde se realiza la inyección de dependencias de las capas inferiores (Modulos de la capa inferior necesarios para su funcionamiento).

Esto lo realicé utilizando principalmente el paradigma de objetos para asi solo instanciar cada modulo una sola vez y utilizar esas instancias en la capa superior.

De todas maneras en algunos casos se utilizó un paradigma más funcional para realizar esto mismo, utilizando closures y manejando el scope.

Ademas de estas capas tambien existen carpetas para:

- Auth (Configuración de estrategias de autenticación y autorización)
- Middlewares (Funciones de validación pre-controlador)
- Utils (Funciones y servicios auxiliares)
- Config (Acceso a variables de entorno)

### Capa de acceso a datos ( DAL)

Dentro de esta capa podemos encontrar un index que posee una clase con un patrón de diseño Factory que permite instanciar, de acuerdo a la persistencia utilizada por el entorno, la clase correspondiente. Esto permite agregar nuevos tipos de persistencias para intercambiar sin necesidad de modificar las capas superiores

## App en Produccion

App deployada en:

```
https://taberna-tienda.herokuapp.com/

```

## Instalación

`git clone https://github.com/jesusmpds/e-commerce-store-coder.git `

`cd e-commerce-store-coder`

`npm install `

## MONGO Database

Para correr la aplicación en local necesitarás un **servidor de mongodb** corriendo en tu maquina, o un cluster en la nube en **MongoAtlas**. Para añadir el string de tu base de datos puedes modificar la variable de entorno llamada MONGO_URI. Más sobre las variables de entorno a continuación.

No hace falta que creees la base de datos o las colecciones. Ya que estas se crean de manera automatica gracias a Moongose ODM al inciarse la conexión con la base de datos.

### Configuración de entorno

1.  Encontrarás un archivo llamado `.env.example` en el directorio raíz del proyecto.
2.  Crea un nuevo archivo copiando y pegando el archivo y renombrándolo como `.env`.
    ```bash
    cp .env.ejemplo .env
    ```
3.  El archivo `.env` ya se ignora por defecto, por lo que nunca se comprometen las credenciales que utilizas.
4.  Cambia los valores del archivo para tu entorno. He añadido comentarios útiles en el archivo `.env.example` para entender las constantes.

### Cómo ejecutar el servidor en NodeJS

- Modo producción: `npm start`

- Modo Desarrollo usando Nodemon: `npm run watch`

- Modo de debugging: ` npm run debug`
