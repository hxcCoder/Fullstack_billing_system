from model.usuario_m import Usuario
from typing import List, Optional

class UsuarioController:

    @staticmethod
    def get_usuario(id_usuario: int) -> Optional[Usuario]:
        return Usuario.get(id_usuario)

    @staticmethod
    def get_todos() -> List[Usuario]:
        return Usuario.all()

    @staticmethod
    def crear_usuario(nombre: str, email: str, password: str) -> bool:
        usuario = Usuario(nombre=nombre, email=email, password=password)
        return usuario.save()

    @staticmethod
    def actualizar_usuario(id_usuario: int, nombre: str, email: str, password: Optional[str] = None) -> bool:
        usuario = Usuario.get(id_usuario)
        if not usuario:
            return False
        usuario.nombre = nombre
        usuario.email = email
        if password:
            usuario.password = password  # Se hashéa automáticamente en save()
        return usuario.save()

    @staticmethod
    def eliminar_usuario(id_usuario: int) -> bool:
        return Usuario.delete_by_id(id_usuario)
