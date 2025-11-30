-- ----------------------------------------
-- TABLA USUARIO
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'user'
);

-- Insertar usuario admin (contraseña: admin123)
-- Nota: contraseña ya hasheada con bcrypt en Python
INSERT INTO usuario (nombre, email, password, rol)
VALUES (
    'Admin',
    'admin@admin.com',
    '$2b$12$w3kLJqFhUqQH/3JcL1Xc9u4pSphOZ1VvK5eUybQeP2rSxK9hzpHDi', -- admin123
    'admin'
)
ON CONFLICT (email) DO NOTHING;


-- ----------------------------------------
-- TABLA PRODUCTO
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL
);

-- Datos iniciales de prueba
INSERT INTO producto (nombre, precio, stock)
VALUES
('Producto 1', 10.50, 20),
('Producto 2', 25.00, 15),
('Producto 3', 5.75, 50)
ON CONFLICT DO NOTHING;


-- ----------------------------------------
-- TABLA CLIENTE
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

-- Datos iniciales de prueba
INSERT INTO cliente (nombre, email)
VALUES
('Cliente Uno', 'cliente1@email.com'),
('Cliente Dos', 'cliente2@email.com')
ON CONFLICT DO NOTHING;


-- ----------------------------------------
-- TABLA FACTURA
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS factura (
    id_factura SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES cliente(id_cliente),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL
);

-- ----------------------------------------
-- TABLA DETALLE_FACTURA
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS detalle_factura (
    id_detalle SERIAL PRIMARY KEY,
    id_factura INTEGER REFERENCES factura(id_factura) ON DELETE CASCADE,
    id_producto INTEGER REFERENCES producto(id_producto),
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL
);
