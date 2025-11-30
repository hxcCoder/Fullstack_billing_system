from Billing_Backend.model.detalle_factura_m import DetalleFactura
from typing import List, Optional


class DetalleFacturaController:

    @staticmethod
    def get_detalle(id_detalle: int) -> Optional[DetalleFactura]:
        """
        Retorna un detalle por ID.
        """
        return DetalleFactura.get(id_detalle)

    @staticmethod
    def get_todos() -> List[DetalleFactura]:
        """
        Retorna todos los detalles de factura.
        """
        return DetalleFactura.all()

    @staticmethod
    def crear_detalle(
        id_factura: int,
        id_producto: int,
        cantidad: int,
        precio_unitario: float
    ) -> bool:
        """
        Crea un detalle de factura asociado a una factura ya existente.
        """
        detalle = DetalleFactura(
            id_factura=id_factura,
            id_producto=id_producto,
            cantidad=cantidad,
            precio_unitario=precio_unitario
        )

        return detalle.save()

    @staticmethod
    def actualizar_detalle(
        id_detalle: int,
        id_factura: int,
        id_producto: int,
        cantidad: int,
        precio_unitario: float
    ) -> bool:
        """
        Actualiza un detalle existente.
        """
        detalle = DetalleFactura.get(id_detalle)
        if not detalle:
            return False

        detalle.id_factura = id_factura
        detalle.id_producto = id_producto
        detalle.cantidad = cantidad
        detalle.precio_unitario = precio_unitario

        return detalle.save()

    @staticmethod
    def eliminar_detalle(id_detalle: int) -> bool:
        """
        Elimina un detalle por ID.
        """
        return DetalleFactura.delete_by_id(id_detalle)
