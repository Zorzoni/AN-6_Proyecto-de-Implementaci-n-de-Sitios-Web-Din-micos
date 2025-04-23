function crearClave() {
    const largo = parseInt(document.getElementById("tam").value);
    const incluirMayus = document.getElementById("mayus").checked;
    const incluirNum = document.getElementById("num").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;
    let base = "abcdefghijklmnopqrstuvwxyz";
    if (incluirMayus) base += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirNum) base += "0123456789";
    if (incluirSimbolos) base += "!@#$%^&*()_+";
    let resultado = "";
    for (let i = 0; i < largo; i++) {
    resultado += base.charAt(Math.floor(Math.random() * base.length));
    } d
    ocument.getElementById("claveGenerada").value = resultado;
    } d
    ocument.getElementById("generar").addEventListener("click", crearClave);
    document.getElementById("copiar").addEventListener("click", () => {
    const campo = document.getElementById("claveGenerada");
    campo.select();
    document.execCommand("copy");
    alert("¡Clave copiada al portapapeles!");
    });
    document.getElementById("tam").addEventListener("input", (e) => {
    document.getElementById("tamValor").textContent = e.target.value;
    });