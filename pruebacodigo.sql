sequelize model:create --name Login --attributes nombre:string,apellido:string,nombre_usuario:string,contrasena:string,edad:date,genero:char,numero:integer,correo:string,redes1:string,redes2:string,redes3:string,coleccion:string,imagen_perfil:string
                                                                                                                                                                     
Terminal output:
New model was created at /Volumes/projects/workspace/todo-app/models/login.js .
New migration was created at /Volumes/projects/workspace/todo-app/migrations/20180928035740-Login.js .
npm install joi --save

sequelize model:create --name Login --attributes title:string,description:string

Terminal output:
New model was created at /Volumes/projects/workspace/todo-app/models/todo.js .
New migration was created at /Volumes/projects/workspace/todo-app/migrations/20180928035740-Todo.js .



npx sequelize-cli db:migrate

sequelize model:create --name Qualification --attributes skill:integer,coordination:decimal,scenography:decimal,choreography:decimal,creativity:decimal,id_group:integer,id_judge:integer

Terminal output:
New model was created at /Volumes/projects/workspace/todo-app/models/qualification.js .
New migration was created at /Volumes/projects/workspace/todo-app/migrations/20180928035740-Qualification.js .



