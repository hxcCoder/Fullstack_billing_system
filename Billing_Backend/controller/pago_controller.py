from Billing_Backend.model.pago_m import Pago
from typing import List, Optional

class PagoController:

    @staticmethod
    def get_pago(id_pago: int) -> Optional[Pago]:
        return Pago.get(id_pago)

    @staticmethod
    def get_todos() -> List[Pago]:
        return Pago.all()

    @staticmethod
    def crear_pago(id_factura: int, metodo_pago: str, monto: float) -> bool:
        pago = Pago(id_factura=id_factura, metodo_pago=metodo_pago, monto=monto)
        return pago.save()

    @staticmethod
    def actualizar_pago(id_pago: int, id_factura: int, metodo_pago: str, monto: float) -> bool:
        pago = Pago.get(id_pago)
        if not pago:
            return False
        pago.id_factura = id_factura
        pago.metodo_pago = metodo_pago
        pago.monto = monto
        return pago.save()

    @staticmethod
    def eliminar_pago(id_pago: int) -> bool:
        return Pago.delete_by_id(id_pago)
