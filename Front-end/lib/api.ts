const res = await fetch(`${API_URL}/productos`, {
    headers: {
    Authorization: `Bearer ${cookie.get("token")}`
    }
});
