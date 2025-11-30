from Billing_Backend.model.cliente_m import Cliente
from typing import List, Optional


class ClienteController:

    @staticmethod
    def get_cliente(id_cliente: int) -> Optional[Cliente]:
        """
        Retorna un cliente por su ID.
        """
        return Cliente.get(id_cliente)

    @staticmethod
    def get_todos() -> List[Cliente]:
        """
        Retorna todos los clientes.
        """
        return Cliente.all()

    @staticmethod
    def crear_cliente(nombre: str, email: str) -> bool:
        """
        Crea un nuevo cliente.
        """
        cliente = Cliente(nombre=nombre, email=email)
        return cliente.save()

    @staticmethod
    def actualizar_cliente(id_cliente: int, nombre: str, email: str) -> bool:
        """
        Actualiza los datos de un cliente existente.
        """
        cliente = Cliente.get(id_cliente)
        if not cliente:
            return False

        cliente.nombre = nombre
        cliente.email = email

        return cliente.save()

    @staticmethod
    def eliminar_cliente(id_cliente: int) -> bool:
        """
        Elimina un cliente por ID.
        """
        return Cliente.delete_by_id(id_cliente)
