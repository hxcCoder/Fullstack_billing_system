from Billing_Backend.model.factura_m import Factura
from typing import List, Optional
from datetime import datetime

class FacturaController:

    @staticmethod
    def get_factura(id_factura: int) -> Optional[Factura]:
        """
        Retorna una factura por ID.
        """
        return Factura.get(id_factura)

    @staticmethod
    def get_todas() -> List[Factura]:
        """
        Retorna todas las facturas.
        """
        return Factura.all()

    @staticmethod
    def crear_factura(id_cliente: int, fecha: Optional[str | datetime], total: float) -> bool:
        """
        Crea una nueva factura.
        PostgreSQL generará id_factura automáticamente.
        """
        factura = Factura(
            id_cliente=id_cliente,
            fecha=fecha,
            total=total
        )
        return factura.save()

    @staticmethod
    def actualizar_factura(id_factura: int, id_cliente: int, fecha: Optional[str | datetime], total: float) -> bool:
        """
        Actualiza una factura ya existente.
        """
        factura = Factura.get(id_factura)
        if not factura:
            return False

        factura.id_cliente = id_cliente
        factura.fecha = fecha
        factura.total = total

        return factura.save()

    @staticmethod
    def eliminar_factura(id_factura: int) -> bool:
        """
        Elimina la factura por ID.
        """
        return Factura.delete_by_id(id_factura)
