-- ==============================
-- Usuario Administrador
-- ==============================
INSERT INTO usuario (nombre, email, password_hash, rol, activo)
VALUES ('Administrador', 'admin@sistema.com', 'admin123', 'ADMIN', 1);


-- ==============================
-- Clientes de ejemplo
-- ==============================
INSERT INTO cliente (nombre, email, telefono, direccion)
VALUES ('Juan Perez', 'juan@example.com', '912345678', 'Santiago, Chile');

INSERT INTO cliente (nombre, email, telefono, direccion)
VALUES ('Maria González', 'maria@example.com', '987654321', 'Concepción, Chile');


-- ==============================
-- Productos de ejemplo
-- ==============================
INSERT INTO producto (nombre, descripcion, precio, stock, activo)
VALUES ('Mouse Gamer RGB', 'Mouse de 7200 DPI con luces RGB', 15990, 50, 1);

INSERT INTO producto (nombre, descripcion, precio, stock, activo)
VALUES ('Teclado Mecánico Redragon', 'Teclado con switches blue', 34990, 30, 1);

INSERT INTO producto (nombre, descripcion, precio, stock, activo)
VALUES ('Monitor 24" 144Hz', 'Monitor FHD con 144Hz', 129990, 15, 1);


-- ==============================
-- Factura de prueba
-- ==============================
INSERT INTO factura (id_usuario, id_cliente, total)
VALUES (1, 1, 0);

-- Obtener ID autogenerado de la factura
-- Para Oracle: usar RETURNING INTO al usar en Python
-- Aqui estima que será ID 1.


-- ==============================
-- Detalle factura (Asumimos que la factura ID = 1)
-- ==============================
INSERT INTO detalle_factura (id_factura, id_producto, cantidad, precio_unitario, subtotal)
VALUES (1, 1, 2, 15990, 31980);

INSERT INTO detalle_factura (id_factura, id_producto, cantidad, precio_unitario, subtotal)
VALUES (1, 2, 1, 34990, 34990);

-- Actualizar total factura
UPDATE factura
SET total = (SELECT SUM(subtotal) FROM detalle_factura WHERE id_factura = 1)
WHERE id_factura = 1;


-- ==============================
-- Movimientos de stock
-- ==============================
INSERT INTO movimiento_stock (id_producto, cantidad, tipo, descripcion)
VALUES (1, 2, 'SALIDA', 'Venta en factura 1');

INSERT INTO movimiento_stock (id_producto, cantidad, tipo, descripcion)
VALUES (2, 1, 'SALIDA', 'Venta en factura 1');

COMMIT;
