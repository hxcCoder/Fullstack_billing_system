Fullstack Billing System
-

Descripción
-

Fullstack Billing System es una plataforma de facturación profesional desarrollada con FastAPI en el backend y un frontend moderno en Next.js + Tailwind CSS. Está diseñada para la gestión de productos, clientes, facturas y usuarios, con un sistema de autenticación JWT seguro y control de accesos.

El proyecto sigue arquitectura MVC modular en Python y está pensado tanto para aprendizaje avanzado como para ser un proyecto de portfolio o base para SaaS de automatización.

Tecnologías utilizadas
-

Backend:
-

- Python 3.11+

- FastAPI – Framework web rápido y moderno

- Oracle Database – Base de datos relacional

- JWT – Autenticación y autorización

- bcrypt – Seguridad de contraseñas

Arquitectura MVC modular:
-

- model/ – Modelos ORM simplificados

- controller/ – Lógica de negocio

- routes/ – API REST y endpoints

- config/ – Configuración de base de datos

- templates/ – Formularios y panel de administración con Jinja2

- static/ – Archivos JS y CSS propios

Dependencias principales: fastapi, uvicorn, jinja2, bcrypt, python-jose o PyJWT

Frontend:
-

- Next.js 14+

- TypeScript

- Tailwind CSS

- Estructura modular de componentes, páginas y API routes

Integración con backend mediante REST API protegida con JWT

Instalación
-

Backend

Crear entorno virtual:

python -m venv venv
source venv/bin/activate # Linux/Mac
venv\Scripts\activate    # Windows


Instalar dependencias:

pip install -r requirements.txt


Configurar Oracle DB en Billing_Backend/config/db_config.py:
-

DB_USER = "usuario"
DB_PASSWORD = "contraseña"
DB_HOST = "localhost"
DB_PORT = "1521"
DB_NAME = "XE"


Crear tablas y datos iniciales:
-

sqlplus usuario/contraseña@localhost:1521/XE @Billing_Backend/sql/create_tables.sql
sqlplus usuario/contraseña@localhost:1521/XE @Billing_Backend/sql/insert_data.sql


Crear un admin inicial (opcional):
-

python Billing_Backend/create_admin.py


Ejecutar backend:
-

uvicorn main:app --reload

Frontend

Instalar dependencias:
-

cd Front-end
pnpm install   # o npm install


Configurar conexión al backend en lib/api.ts o config.ts.

Ejecutar servidor local:
-

pnpm dev       # o npm run dev

Uso

Panel administrativo: http://localhost:8000/
-

Requiere login JWT para acceder.

Formularios para agregar productos y clientes.

API REST:
-

Productos: /productos

Clientes: /clientes

Facturas: /facturas

Usuarios / Auth: /auth/register, /auth/login

Autenticación:
-
JWT con expiración configurable en main.py (JWT_EXPIRE_MINUTES)

Protege rutas del backend y formularios.

Licencia
-
MIT
