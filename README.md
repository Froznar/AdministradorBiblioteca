# AdministradorBiblioteca

## Frontend (app)

* cd  app/applybrary/ && npm install
* colocar la url del backend en App.js y services/BooksService.js
* npm start

## Backend (server)
crear el virtualenv, activarlo e instalar las dependencias
* django
* djangorestframework
* django-cors-headers
* djangorestframework-jwt
 
ambiente de prueba
* python manage.py makemigrations
* python manage.py migrate
* createsuperuser
* python manage.py loaddata books
* python manage.py runserver


## Notas
funcionalidades:
* Login / Logout (Barra de navegación)
* Ver / editar / crear / eliminar libros
* Filtrado simple por texto


# ToDo
* Completar filtrado por texto
* Validar campos en el formulario de edición/creación de libros
* feedback a las acciones del administrador
* apariencia y estilos del login
* landing page
* hacer un date picker para evitar errores en el campo de "año de publicación"

