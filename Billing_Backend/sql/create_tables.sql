
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);
    
-- ============================================
--  HABITACIONES
-- ============================================
CREATE TABLE IF NOT EXISTS habitaciones (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL,
    precio_diario NUMERIC(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE
);

-- ============================================
--  RECEPCIONISTAS
-- ============================================
CREATE TABLE IF NOT EXISTS recepcionistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    fecha_contratacion DATE
);

-- ============================================
--  INVENTARIO
-- ============================================
CREATE TABLE IF NOT EXISTS inventario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INTEGER NOT NULL DEFAULT 0,
    precio_unitario NUMERIC(10,2) NOT NULL DEFAULT 0,
    fecha_ingreso TIMESTAMP DEFAULT NOW()
);

-- ============================================
--  BOLETAS
-- ============================================
CREATE TABLE IF NOT EXISTS boletas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    recepcionista_id INTEGER NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    total NUMERIC(10,2) NOT NULL,
    
    -- Relaciones
    CONSTRAINT fk_boleta_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_boleta_recepcionista
        FOREIGN KEY (recepcionista_id) REFERENCES recepcionistas(id)
        ON DELETE SET NULL
);

