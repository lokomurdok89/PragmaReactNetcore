# :first_quarter_moon: Visual Studio Code con distintos lenguajes y extensiones NET 7 y REACT

## :octocat: Explicación de intención del proyecto

[Lokomurdok89 en Github](https://github.com/okomurdok89)

Este proyecto es una aplicación web que muestra una funcionalidad básica de una aplicación CRUD (Create, Read, Update, Delete). El objetivo principal de la aplicación es permitir a los usuarios crear, leer, actualizar y eliminar elementos de una lista.

La interfaz de usuario es sencilla y fácil de usar, lo que permite a los usuarios interactuar con la aplicación de manera intuitiva. La lista se muestra en una tabla, donde cada elemento tiene su propio conjunto de botones de acción para editar o eliminar.

La aplicación está construida con tecnologías web modernas, incluyendo React, CSS, HTML, CSS y JavaScript en el frontend, y un servidor backend programado en un lenguaje de programación en este caso NET 7. El servidor utiliza una base de datos local para almacenar los elementos de la lista y para el manejo de estas utiliza EntityFramework.

El proyecto es útil como ejemplo básico de una aplicación CRUD, y puede ser utilizado como punto de partida para desarrollar aplicaciones más complejas en el futuro. Además, el código fuente está disponible para su descarga y modificación, lo que permite a los desarrolladores personalizar la aplicación para sus propias necesidades.

## :metal: Características principales Front

Permite crear, leer, actualizar y eliminar elementos de una lista
Permite Exportar todo a Excel.
Desarrollado EN REACT y Semantic-ui

### :rocket: Características principales Back End

Permite Guardar todas las transacciones realizadas en la API
Permite Manejar todo tipo de Excepciones
Arquitectura CQRS
Bases de datos local expandible a cualquier otra BD

## :sparkles: Programas Necesarios
Visual Studio Code.
NET 7
Node.Js

## :+1:  Librerias BACK 

* [X] Karambolo.Extensions.Logging.File  
* [X] Karambolo.Extensions.Logging.File.Json  
* [X] Microsoft.AspNetCore.OpenApi  
* [X] Microsoft.EntityFrameworkCore.Design
* [X] Microsoft.Extensions.FileProviders.Physical
* [X] Microsoft.Extensions.Logging
* [X] Microsoft.Extensions.Logging.Configuration
* [X] Microsoft.Extensions.Options.ConfigurationExtensions
* [X] Newtonsoft.Json
* [X] Serilog.AspNetCore
* [X] Swashbuckle.AspNetCore
* [X] AutoMapper.Extensions.Microsoft.DependencyInjection
* [X] MediatR.Extensions.Microsoft.DependencyInjection
* [X] Microsoft.EntityFrameworkCore.Sqlite
## :+1:  Librerias Front

* [X] axios
* [X] file-saver
* [X] semantic-ui
* [X] uuid
* [X] xlsx-styl


### :rocket: Para Levantar y Ejecutar la aplicación.



Back | Front
-------|------
Proyecto API | proyeco client-app
dotnet run |  npm start
