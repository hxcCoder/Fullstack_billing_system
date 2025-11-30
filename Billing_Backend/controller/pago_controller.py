from typing import List, Optional, Tuple
from Billing_Backend.model.pago_m import Pago


class PagoController:

    # -------------------------
    #   OBTENER POR ID
    # -------------------------
    @staticmethod
    def get_pago(id_pago: int) -> Tuple[bool, str, Optional[Pago]]:
        pago = Pago.get(id_pago)

        if not pago:
            return False, "Pago no encontrado.", None

        return True, "Pago obtenido correctamente.", pago

    # -------------------------
    #   OBTENER TODOS
    # -------------------------
    @staticmethod
    def get_todos() -> List[Pago]:
        return Pago.get_all()

    # -------------------------
    #   CREAR
    # -------------------------
    @staticmethod
    def crear_pago(
        id_factura: Optional[int],
        metodo_pago: Optional[str],
        monto: Optional[float]
    ) -> Tuple[bool, str, Optional[Pago]]:

        if id_factura is None:
            return False, "El id_factura es obligatorio.", None

        if not metodo_pago:
            return False, "El método de pago es obligatorio.", None

        if monto is None:
            return False, "El monto es obligatorio.", None

        pago = Pago(
            id_factura=id_factura,
            metodo_pago=metodo_pago,
            monto=monto
        )

        ok = pago.save()
        if not ok:
            return False, "Error al crear el pago.", None

        return True, "Pago creado correctamente.", pago

    # -------------------------
    #   ACTUALIZAR
    # -------------------------
    @staticmethod
    def actualizar_pago(
        id_pago: int,
        id_factura: Optional[int] = None,
        metodo_pago: Optional[str] = None,
        monto: Optional[float] = None
    ) -> Tuple[bool, str, Optional[Pago]]:

        pago = Pago.get(id_pago)
        if not pago:
            return False, "Pago no encontrado.", None

        if id_factura is not None:
            pago.id_factura = id_factura

        if metodo_pago is not None:
            pago.metodo_pago = metodo_pago

        if monto is not None:
            pago.monto = monto

        ok = pago.save()
        if not ok:
            return False, "Error al actualizar pago.", None

        return True, "Pago actualizado correctamente.", pago

    # -------------------------
    #   ELIMINAR
    # -------------------------
    @staticmethod
    def eliminar_pago(id_pago: int) -> Tuple[bool, str]:
        ok = Pago.delete_by_id(id_pago)

        if not ok:
            return False, "Error al eliminar el pago."

        return True, "Pago eliminado correctamente."
