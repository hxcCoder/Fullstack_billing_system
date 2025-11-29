from Billing_Backend.model.usuario_m import Usuario

admin = Usuario(
    nombre="Admin",
    email="admin@admin.com",
    password="TuPasswordSeguro123",
    rol="admin"
)
admin.save()
print("Usuario admin creado")
