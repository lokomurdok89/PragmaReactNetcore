---------------ELEMENTOS NECESARIOS ------------------------
Instalar VSC
Instalar Git
Instalar Nodejs

Extensiones VSC

C#
C# Extension
MaterialIcon
Nuget Gallery
SQLite

Extensiones Chrome

React Developer Tools

-------------------------------------------
--------EJECUTAR CREATE-PROJECT-WIN.PS1-

Ejecutar Nuget() instalar entityFrameworkcore.desing(API)
Ejecutar Nuget() instalar Swashbucle.AspNetCore(API)
Ejecutar Nuget() instalar Microsoft.EntityFrameworkCore.Sqlite(PERSISTENCE)
Ejecutar Nuget() instalar AutoMapper.Extensions.Microsoft.DependencyInjection (Application)
Ejecutar Nuget() instalar MediatR.Extensions.Microsoft.DependencyInjection (Application)

------- Ejecutar DontNet run--------------------

volver capeta raiz  y ejecutar -- genera migración y para generar el seed desde el principio se debe generar en la carpeta program para cuando se inicie.

dotnet ef migrations add InitialCreate -s API -p Persistence
------------------------------------------
