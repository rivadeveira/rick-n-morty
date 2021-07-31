# Rick and Morty App 

## Explicación de la solución
Tome la decisión de ir por el camino de HTML/CSS & JS puro, pero agregando como dependencias de desarrollo a webpack y una serie de plugins utiles para el desarrollo de la aplicación, básicamente es un serie de plugins para cargar html, css, en modulos de javascript, y compilar todo en un solo archivo minificado para producción. Pueden ver el resultado final en la siguiente dirección -> [https://rick-n-morty-theta.vercel.app/]

Para levantar el proyecto desde una maquina local debemos contar con node instalado, en este caso utilice la utima LTS al dia de hoy 31/07/2021 la v14.17.0.


- Ya clonado el repo en nuestra máquina instalaremos las dependencias de desarrollo desde la terminal en el root del proyecto 
```
npm install
```

En el archivo package.json podremos ver una serie de scripts:

- Para desarrollo nos ubicamos en el root y corremos este comando 

```
npm start 
```

- Para compilar el proyecto para produccion corremos
```
npm run build 
```


