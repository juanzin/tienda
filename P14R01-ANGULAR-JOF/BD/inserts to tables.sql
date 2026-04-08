USE TiendaDB;


INSERT INTO Categorias(Nombre, Descripcion) VALUES ('Electronica', 'dispositivos electronicos'),
('Cosmeticos', 'productos'),
('Ropa', 'todo tipo de ropa'),
('Herramientas', 'productos relacionados al trabajo de jardineria, carpinteria y albañileria')

INSERT INTO Productos(Nombre, Precio, Stock, CategoriasId)
VALUES ('Telefono', 2000, 1, 1),
('Maquillaje', 345.2, 45, 2),
('Chamarra', 500.0, 10, 3),
('Martillo', 120, 100, 4)

