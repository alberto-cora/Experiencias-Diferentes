CREATE DATABASE IF NOT EXISTS experiencias_diferentes;

USE experiencias_diferentes;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) DEFAULT 'user',
  `validado` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `activities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titulo` varchar(255) NOT NULL,
    `type` varchar(55) NOT NULL,
    `descripcion` varchar(255),
    `fecha_inicio` DATETIME,
    `fecha_fin` DATETIME,
    `plazas_totales` INT NOT NULL,
    `price` INT NOT NULL,
    `location` varchar(55) NOT NULL,
    PRIMARY KEY (`id`)
    
);


CREATE TABLE `rating` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user_id` INT NOT NULL,
   `activity_id` INT NOT NULL,
   `rating` INT NOT NULL,
   PRIMARY KEY (`id`),
   FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY (activity_id)
    REFERENCES activities(id)
    ON DELETE CASCADE
);

CREATE TABLE `bookings`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `activity_id` INT NOT NULL,
   PRIMARY KEY ('id'),
   'reservado' BOOLEAN NOT NULL DEFAULT 0,
   FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    FOREIGN KEY (activity_id)
    REFERENCES activities(id)
    ON DELETE CASCADE


)

/* INSERT INTO activities (titulo, type, fecha_inicio, fecha_fin,plazas_totales, price, location) VALUES 
  ('Inicio','surf', 20210510, 20210514, 10, 300, 'A Coruña'),
  ('Pro','buceo', 20210513, 20210515, 10, 250, 'Ourense'); */



/*  UPDATE users SET role = 'admin' WHERE email = 'cora@gmail.com' 
 */ 