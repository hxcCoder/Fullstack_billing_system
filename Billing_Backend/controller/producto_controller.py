# controller/producto_controller.py
from typing import List, Optional
from Billing_Backend.model.producto_m import Producto

class ProductoController:

    @staticmethod
    def crear_producto(
        nombre: Optional[str] = None,
        precio: Optional[float] = 0,
        stock: Optional[int] = 0
    ) -> Producto:
        """
        Crea un producto nuevo y lo guarda en la base de datos.
        """
        producto = Producto(
            nombre=nombre or "",
            precio=precio or 0,
            stock=stock or 0
        )
        producto.save()
        return producto

    @staticmethod
    def obtener_producto(id_producto: Optional[int]) -> Optional[Producto]:
        """
        Obtiene un producto por su ID.
        """
        if id_producto is None:
            return None
        return Producto.get(id_producto)

    @staticmethod
    def obtener_todos_productos() -> List[Producto]:
        """
        Retorna la lista de todos los productos.
        """
        return Producto.get_all()

    @staticmethod
    def actualizar_producto(
        id_producto: int,
        nombre: Optional[str] = None,
        precio: Optional[float] = None,
        stock: Optional[int] = None
    ) -> Optional[Producto]:
        """
        Actualiza los datos de un producto existente.
        """
        producto = Producto.get(id_producto)
        if not producto:
            return None

        if nombre is not None:
            producto.nombre = nombre
        if precio is not None:
            producto.precio = precio
        if stock is not None:
            producto.stock = stock

        producto.save()
        return producto

    @staticmethod
    def eliminar_producto(id_producto: int) -> bool:
        """
        Elimina un producto por su ID.
        """
        return Producto.delete(id_producto)
