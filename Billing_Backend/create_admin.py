# Billing_Backend/create_admin.py

from Billing_Backend.model.usuario_m import Usuario
import getpass

def create_admin():
    email = input("Ingrese email del admin: ").strip()
    
    # Verifica si ya existe
    if any(u.email == email for u in Usuario.all()):
        print(f"El usuario con email '{email}' ya existe.")
        return
    
    nombre = input("Ingrese nombre del admin: ").strip()
    password = getpass.getpass("Ingrese contraseña segura: ").strip()
    
    admin_user = Usuario(
        nombre=nombre,
        email=email,
        password=password,
        rol="admin"
    )
    
    admin_user.save()
    print(f"Admin '{nombre}' creado correctamente.")

if __name__ == "__main__":
    create_admin()
