// Interfaz para una versión de un modelo
interface Version {
  nombre: string;
  descripcion: string;
  equipamiento: string;
  colores: string;
  precio: string;
}

// Interfaz para las fotos de un modelo
interface Fotos {
  interior: string[];
  exterior: string[];
}

// Interfaz para un modelo de auto
interface Auto {
  descripcion: string;
  precio: string;
  fotos: Fotos;
  versiones: Version[];
}

// Interfaz para el stock completo
interface Stock {
  [key: string]: Auto;
}

// Objeto stock con tipado de la interfaz Stock
const stock: Stock = {
  "Peugeot 208": {
    descripcion:
      "El nuevo Peugeot 208 se reinventa con un frente modernizado, una firma lumínica renovada, nuevos faros traseros LED y un motor turbo.",
    precio: "$21.662.200 a $29.078.500 según la versión",
    fotos: {
      interior: ["interior1.jpg", "interior2.jpg", "interior3.jpg"],
      exterior: ["exterior1.jpg", "exterior2.jpg", "exterior3.jpg", "exterior4.jpg"],
    },
    versiones: [
      {
        nombre: "ACTIVE",
        descripcion: "La versión más accesible de la familia 208, destaca por su rendimiento y eficiencia.",
        equipamiento: "Llantas de 15\", Motor 1.6L de 115cv, Radio con Bluetooth, Airbags frontales y laterales, Frenos ABS, Ayuda de arranque en pendiente",
        colores: "Negro, Blanco, Gris",
        precio: "$21.662.200",
      },
      {
        nombre: "ALLURE",
        descripcion: "Versión con gran nivel de equipamiento, muy completa.",
        equipamiento: "Llantas de 16\", Motor 1.6L de 115cv, Pantalla multimedia 10\", Airbags frontales y laterales, Frenos ABS, Cámara trasera",
        colores: "Negro, Azul, Blanco, Gris",
        precio: "$24.137.800",
      },
    ],
  },
  "Peugeot 2008": {
    descripcion:
      "El nuevo SUV compacto Peugeot 2008 llega para reinventar los códigos de los SUV.",
    precio: "$31.200.000 a $35.900.000 según la versión",
    fotos: {
      interior: ["interior1.jpg", "interior2.jpg"],
      exterior: ["exterior1.jpg", "exterior2.jpg"],
    },
    versiones: [
      {
        nombre: "ACTIVE",
        descripcion: "La versión más accesible de la familia 2008, destaca por su eficiencia.",
        equipamiento: "Transmisión CVT 7 marchas, Llantas de 17\", Cámara trasera, Sensores de estacionamiento, Pantalla táctil de 10\", Climatizador automático",
        colores: "Negro, Blanco, Gris",
        precio: "$31.200.000",
      },
      {
        nombre: "GT",
        descripcion: "La máxima expresión de lujo y confort.",
        equipamiento: "Llantas de 17\", Cargador inalámbrico, Techo panorámico, Tapizado de cuero, Luces Full LED",
        colores: "Negro, Blanco",
        precio: "$35.900.000",
      },
    ],
  },
};
