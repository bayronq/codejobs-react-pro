- [Codejobs ReactJS Profesional App](#codejobs-reactjs-profesional-app)
  - [Notas de lo aprendido en el curso](#notas-de-lo-aprendido-en-el-curso)
  - [Puesta en Producción con Digital Ocean o Vultr](#puesta-en-producci%C3%B3n-con-digital-ocean-o-vultr)
    - [Refactorizando para Acceder a la app sin el puerto 3000 (Bindeando el puerto 80 a Node)](#refactorizando-para-acceder-a-la-app-sin-el-puerto-3000-bindeando-el-puerto-80-a-node)

# Codejobs ReactJS Profesional App

Este es un proyecto de _React Profesional_, seguido del curso de __Codejobs__ en [Youtube](https://www.youtube.com/watch?v=Qlx-CqZtXz8&list=PLeWI3XlFEVOWvEmuwUZCYhEP6NLIqT2Lp)

## Notas de lo aprendido en el curso

+ Se instaló el paquete adicional de `babel-stage-3` según la guía de [babel-preset-stage-3](https://babeljs.io/docs/en/babel-preset-stage-3).
+ En el `package.json`, en la parte de los scripts, se agregan scripts que vamos a correr, para ello, es importante mencionar que a veces se usa una `&` (ejecuta las tareas en __paralelo__) o a veces dos `&&` (correr los scripts de manera __secuencial__).
+ Se enseñó acerca de un modo interesante de hacer cambio a __Server Side Rendering__ cuando sea necesario (buscada la app desde un motor de búsqueda o por curl), o mostrar la app por __Client Side Rendering__. Para ello, un modo de hacer pruebas es descargando una extensión de Chrome [User-Agent Switch](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg?hl=es-419).
  + Para agregar el bot de Google, podemos acceder al link [Rastreadores de Google](https://support.google.com/webmasters/answer/1061943?hl=es) que nos permite hacer una prueba de un _bot_ para ver si realmente la app se muestra desde con Server Side Rendering.

## Puesta en Producción con Digital Ocean o Vultr

+ Se crea el _Droplet_ de __Ubuntu__ (o en el caso que haya más experiencia con otros OS, adelante)
+ Hay que acceder desde la __Terminal__
+ Se instala __Node__ con los siguientes comandos:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

+ Ahora es necesario clonar el repositorio que se creó del [Proyecto React Profesional by CodeJobs](https://github.com/jesuskata/codejobs-react-pro). Para ello será necesario conectar una llave __SSH__ con la que tu _Droplet_ se comuniqué con tu cuenta de _Github_:

```
ssh-keygen -b 1024 -t rsa -f id_rsa -P ""
```

+ Hay que copiar la llave pública (contenido que aparecerá después de ejecutar lo siguiente) a tus Settings -> SSH en _Github_. Con el comando `cat` y la dirección de la llave pública, normalmente está en:

```
cat /root/.ssh/id_rsa.pub
```

+ Se clona el repositorio de la aplicación:

```
git clone git@github.com:jesuskata/codejobs-react-pro.git
```

+ Se corre la aplicación:

```
npm run start-production
```

+ Hay que acceder a la app con la IP que te haya asignado el Droplet, agregando el puerto que se estableció en el server:

```
xxx.xxx.xxx.xxx:3000
```

### Refactorizando para Acceder a la app sin el puerto 3000 (Bindeando el puerto 80 a Node)

+ Instalar _libcab2-bin_:

```
sudo apt-get install libcab2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

+ Ahora solo falta cambiar el puerto de la app, accediendo al index del server:

```
nano /var/www/carpeta-del-proyecto/src/server/index.js
```

+ Se cambia la línea de código:

```
const port = process.env.NODE_PORT || 3000;
```
por:
```
const port = process.env.NODE_PORT || 80;
```

+ Se corre de nuevo la app:

```
npm run start-production
```

__Listo!__

+ En el browser (Chrome, Firefox, o el que uses) acceder a la app por la IP asignada por el Droplet:

```
xxx.xxx.xxx.xxx
```