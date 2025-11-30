from typing import List, Optional, Tuple, Union
from Billing_Backend.model.producto_m import Producto


class ProductoController:

    # -------------------------
    #   CREAR
    # -------------------------
    @staticmethod
    def crear_producto(
        nombre: Optional[str],
        precio: Optional[float],
        stock: Optional[int]
    ) -> Tuple[bool, str, Optional[Producto]]:

        if not nombre:
            return False, "El nombre es obligatorio.", None

        producto = Producto(
            nombre=nombre,
            precio=precio or 0,
            stock=stock or 0
        )

        ok = producto.save()
        if not ok:
            return False, "Error al crear el producto.", None

        return True, "Producto creado correctamente.", producto

    # -------------------------
    #   OBTENER POR ID
    # -------------------------
    @staticmethod
    def obtener_producto(id_producto: int) -> Tuple[bool, str, Optional[Producto]]:
        producto = Producto.get(id_producto)

        if not producto:
            return False, "Producto no encontrado.", None

        return True, "Producto obtenido.", producto

    # -------------------------
    #   OBTENER TODOS
    # -------------------------
    @staticmethod
    def obtener_todos_productos() -> List[Producto]:
        return Producto.get_all()

    # -------------------------
    #   ACTUALIZAR
    # -------------------------
    @staticmethod
    def actualizar_producto(
        id_producto: int,
        nombre: Optional[str] = None,
        precio: Optional[float] = None,
        stock: Optional[int] = None
    ) -> Tuple[bool, str, Optional[Producto]]:

        producto = Producto.get(id_producto)
        if not producto:
            return False, "Producto no encontrado.", None

        if nombre is not None:
            producto.nombre = nombre

        if precio is not None:
            producto.precio = precio

        if stock is not None:
            producto.stock = stock

        ok = producto.save()
        if not ok:
            return False, "Error al actualizar producto.", None

        return True, "Producto actualizado correctamente.", producto

    # -------------------------
    #   ELIMINAR
    # -------------------------
    @staticmethod
    def eliminar_producto(id_producto: int) -> Tuple[bool, str]:
        ok = Producto.delete_by_id(id_producto)

        if not ok:
            return False, "Error al eliminar el producto."

        return True, "Producto eliminado correctamente."
