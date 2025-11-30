from Billing_Backend.model.usuario_m import Usuario
from typing import List, Optional, Tuple


class UsuarioController:

    # -------------------------
    #   GET / Obtener usuario
    # -------------------------
    @staticmethod
    def get_usuario(id_usuario: int) -> Optional[Usuario]:
        return Usuario.get(id_usuario)

    # -------------------------
    #   GET / Obtener todos
    # -------------------------
    @staticmethod
    def get_todos() -> List[Usuario]:
        return Usuario.all()

    # -------------------------
    #   POST / Crear usuario
    # -------------------------
    @staticmethod
    def crear_usuario(nombre: str, email: str, password: str, rol: str = "user") -> Tuple[bool, str]:
        # Validar email duplicado
        usuarios = Usuario.all()
        for u in usuarios:
            if u.email == email:
                return False, "El email ya está registrado."

        usuario = Usuario(
            nombre=nombre,
            email=email,
            password=password,
            rol=rol
        )

        ok = usuario.save()
        if not ok:
            return False, "Error al crear el usuario."

        return True, "Usuario creado correctamente."

    # -------------------------
    #   PUT / Actualizar usuario
    # -------------------------
    @staticmethod
    def actualizar_usuario(
        id_usuario: int,
        nombre: str,
        email: str,
        password: Optional[str] = None,
        rol: Optional[str] = None
    ) -> Tuple[bool, str]:

        usuario = Usuario.get(id_usuario)
        if not usuario:
            return False, "Usuario no encontrado."

        # Validar email duplicado al actualizar
        usuarios = Usuario.all()
        for u in usuarios:
            if u.email == email and u.id_usuario != id_usuario:
                return False, "Ese email ya pertenece a otro usuario."

        usuario.nombre = nombre
        usuario.email = email

        if password:
            usuario.password = password  # Se hashea automáticamente

        if rol:
            usuario.rol = rol

        ok = usuario.save()
        if not ok:
            return False, "Error al actualizar usuario."

        return True, "Usuario actualizado correctamente."

    # -------------------------
    #   DELETE / Eliminar usuario
    # -------------------------
    @staticmethod
    def eliminar_usuario(id_usuario: int) -> Tuple[bool, str]:
        ok = Usuario.delete_by_id(id_usuario)
        if not ok:
            return False, "Error al eliminar usuario."

        return True, "Usuario eliminado."
