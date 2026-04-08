USE TiendaDB;

SELECT * FROM Productos;
SELECT * FROM Categorias;


INSERT INTO Productos (Nombre, Precio, Stock, CategoriasId) VALUES ('cereal', 30.6, 16, 1),
 ('Tomate', 44.9, 20, 2),
 ('Galletas', 25.6, 10, 1);


INSERT INTO Categorias (Nombre, Descripcion) VALUES ('Cereales', ' todo lo relacionado a cereales'),
('verduras', 'verduras para todo tipo de cocina');;