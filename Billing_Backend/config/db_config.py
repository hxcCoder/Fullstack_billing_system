# config/db_config.py
import oracledb
from typing import Optional

class ConexionOracle:
    """
    Clase para manejar la conexión a Oracle DB.
    Uso Singleton: mantiene una sola conexión abierta.
    """

    def __init__(self, user: str = "TU_USUARIO", password: str = "TU_CONTRASEÑA", dsn: str = "localhost:1521/XEPDB1"):
        self.user = user
        self.password = password
        self.dsn = dsn
        self._connection: Optional[oracledb.Connection] = None

    def get_connection(self) -> oracledb.Connection:
        """
        Retorna una conexión activa a la base de datos.
        Si no existe, la crea.
        """
        if self._connection is None:
            try:
                self._connection = oracledb.connect(
                    user=self.user,
                    password=self.password,
                    dsn=self.dsn
                )
                print("[OK] Conexión Oracle establecida")
            except Exception as e:
                print(f"[ERROR] Conexión Oracle: {e}")
                raise
        return self._connection

    def close(self):
        """
        Cierra la conexión si existe.
        """
        if self._connection:
            self._connection.close()
            self._connection = None
            print("[OK] Conexión Oracle cerrada")
