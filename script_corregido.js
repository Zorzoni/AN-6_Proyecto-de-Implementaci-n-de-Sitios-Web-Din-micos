// Array para almacenar historial de contraseñas
const historialClaves = [];
const MAX_HISTORIAL = 3;

// Función para evaluar la fortaleza de una contraseña
function evaluarFortaleza(clave) {
    let puntaje = 0;
    
    // Criterios de fortaleza
    if (clave.length >= 8) puntaje += 1;
    if (clave.length >= 12) puntaje += 1;
    if (/[A-Z]/.test(clave)) puntaje += 1;
    if (/[0-9]/.test(clave)) puntaje += 1;
    if (/[^A-Za-z0-9]/.test(clave)) puntaje += 1;
    
    // Determinar nivel de fortaleza
    if (puntaje <= 2) return { nivel: "Débil", clase: "medidor-debil" };
    if (puntaje <= 4) return { nivel: "Media", clase: "medidor-medio" };
    return { nivel: "Fuerte", clase: "medidor-fuerte" };
}

// Función para crear una contraseña aleatoria
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
    
    // Asegurar que se incluya al menos un carácter de cada tipo seleccionado
    if (incluirMayus || incluirNum || incluirSimbolos) {
        let caracteresRequeridos = [];
        
        if (incluirMayus) caracteresRequeridos.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26)));
        if (incluirNum) caracteresRequeridos.push("0123456789".charAt(Math.floor(Math.random() * 10)));
        if (incluirSimbolos) caracteresRequeridos.push("!@#$%^&*()_+".charAt(Math.floor(Math.random() * 12)));
        
        // Agregamos los caracteres requeridos
        for (let i = 0; i < caracteresRequeridos.length; i++) {
            resultado += caracteresRequeridos[i];
        }
        
        // Completamos el resto de la longitud con caracteres aleatorios
        for (let i = caracteresRequeridos.length; i < largo; i++) {
            resultado += base.charAt(Math.floor(Math.random() * base.length));
        }
        
        // Mezclamos el resultado para que los caracteres requeridos no queden siempre al principio
        resultado = mezclarCadena(resultado);
    } else {
        // Si no se seleccionó ninguna opción específica, usamos solo minúsculas
        for (let i = 0; i < largo; i++) {
            resultado += base.charAt(Math.floor(Math.random() * base.length));
        }
    }
    
    document.getElementById("claveGenerada").value = resultado;
    
    // Evaluar y mostrar fortaleza
    actualizarFortaleza(resultado);
    
    // Agregar al historial
    agregarAlHistorial(resultado);
}

// Función para mezclar una cadena
function mezclarCadena(texto) {
    let array = texto.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

// Función para actualizar el indicador de fortaleza
function actualizarFortaleza(clave) {
    const fortaleza = evaluarFortaleza(clave);
    const nivelElemento = document.getElementById("nivel-fortaleza");
    const medidor = document.getElementById("medidor-fortaleza");
    
    nivelElemento.textContent = fortaleza.nivel;
    
    // Eliminar todas las clases previas
    medidor.classList.remove("medidor-debil", "medidor-medio", "medidor-fuerte");
    medidor.classList.add(fortaleza.clase);
}

// Función para agregar contraseña al historial
function agregarAlHistorial(clave) {
    // Evitar duplicados
    if (historialClaves.includes(clave)) return;
    
    // Agregar al array
    historialClaves.unshift(clave);
    
    // Limitar tamaño del historial
    while (historialClaves.length > MAX_HISTORIAL) {
        historialClaves.pop();
    }
    
    // Actualizar la interfaz
    actualizarHistorialUI();
}

// Función para actualizar la interfaz del historial
function actualizarHistorialUI() {
    const lista = document.getElementById("historial-claves");
    lista.innerHTML = '';
    
    historialClaves.forEach(clave => {
        const item = document.createElement("li");
        item.textContent = clave;
        item.addEventListener("click", () => {
            document.getElementById("claveGenerada").value = clave;
            actualizarFortaleza(clave);
        });
        lista.appendChild(item);
    });
}

// Función para actualizar el valor mostrado del tamaño
function actualizarIndicadorTam() {
    document.getElementById("tamValor").textContent = document.getElementById("tam").value;
}

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    crearClave();
    actualizarIndicadorTam();
});

// Evento para generar clave
document.getElementById("generar").addEventListener("click", crearClave);

// Evento para copiar la contraseña
document.getElementById("copiar").addEventListener("click", () => {
    const campo = document.getElementById("claveGenerada");
    campo.select();
    
    navigator.clipboard.writeText(campo.value).then(() => {
        // Mostrar mensaje de confirmación
        const mensaje = document.getElementById("mensaje-copiado");
        mensaje.classList.remove("mensaje-oculto");
        mensaje.classList.add("mensaje-visible");
        
        setTimeout(() => {
            mensaje.classList.remove("mensaje-visible");
            mensaje.classList.add("mensaje-oculto");
        }, 2000);
    });
});

// Evento para actualizar el indicador de tamaño
document.getElementById("tam").addEventListener("input", (e) => {
    actualizarIndicadorTam();
    crearClave(); // Regenerar la clave cuando se cambia el tamaño
});

// Eventos para opciones de configuración
document.getElementById("mayus").addEventListener("change", crearClave);
document.getElementById("num").addEventListener("change", crearClave);
document.getElementById("simbolos").addEventListener("change", crearClave);