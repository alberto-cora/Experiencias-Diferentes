Tabla usuarios
-id
-email
-nombre
-biografia
-avatar

Tabla actividades
-id
-Título actividad
-descripción
-foto
-fecha_inicio
-fecha_fin
-id_usuario

Tabla reservas
-id
-fecha_reserva
-id_usuario
-id_actividad

Tabla valoraciones
-id
-valoración
-id_usuario
-id_actividad

---

## API usuarios:

-registrarse(crear usuario)
-ver información mi usuario
-editar datos usuario
-hacer login
-recuperar contraseña
-borrar usuario

---

Registrarse(crear usuario):
-Metodo:POST
-URL: /api/users
-Token: No
-Body:
-Nombre
-email
-password
-repeated password

VER INFO USUARIO:
-Metodo: GET
-URL: /api/users/:id
-Token:Si
-Devuelve:
-id
-email
-nombre
-Bio
-avatar

EDITAR DATOS USUARIO
-Metodo: PUT/PATCH
-URL:/api/users/:id
-Token: Si(el del usuario)
-Body:
-email
-password
-nombre
-bio
-avatar

LOGIN:
-Metodo:POST
-URL:/api/users/login
-Token:no
-body:
-email
-password
-Devuelve: Token

RECUPERAR CONTRASEÑA
-Metodo:POST
-URL: /api/users/recover-password
-Token:No
-body:
-email

BORRAR USUARIO
-Metodo:DELETE
-URL:/api/users/:id
-Token: Si
-Devuelve: Id usuario

---

## API actividades

-Listar actividades
-Ver datos actividad
-Crear actividad
-Editar datos actividad

## API reservas

-Reservar actividad
-Cancelar reserva

## API valoraciones

-Hacer valoración
