document.getElementById("form-producto").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("/productos", {
        method: "POST",
        body: data
    });

    const result = await res.json();
    if (result.status === "ok") {
        const lista = document.getElementById("lista-productos");
        const li = document.createElement("li");
        li.textContent = `${result.producto.nombre} - $${result.producto.precio} - Stock: ${result.producto.stock}`;
        lista.appendChild(li);
        form.reset();
    } else {
        alert("Error al agregar producto");
    }
});
