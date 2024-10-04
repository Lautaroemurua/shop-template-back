import { FunctionTool } from "./chatgpt.service";

// Datos Mockeados para modelos, versiones y concesionarios
const mockModelos = [
  {
    nombre: "Modelo 208",
    descripcion: "Un auto compacto con gran diseño y tecnología.",
    precio: 15000,
    accesorios: ["Aire acondicionado", "Frenos ABS"],
    foto_interior: ["foto_interior_208_1.jpg", "foto_interior_208_2.jpg"],
    foto_exterior: ["foto_exterior_208_1.jpg", "foto_exterior_208_2.jpg"],
  },
  {
    nombre: "Modelo 308",
    descripcion: "Un coche familiar con estilo y seguridad.",
    precio: 20000,
    accesorios: ["Aire acondicionado", "Frenos ABS", "Sistema multimedia"],
    foto_interior: ["foto_interior_308_1.jpg", "foto_interior_308_2.jpg"],
    foto_exterior: ["foto_exterior_308_1.jpg", "foto_exterior_308_2.jpg"],
  }
];

const mockVersiones = [
  {
    nombre: "Versión Sport",
    descripcion: "Versión deportiva con llantas y detalles exclusivos.",
    precio: 18000,
    colores: ["Rojo", "Negro", "Blanco"],
    equipamiento: ["Llantas de aleación", "Asientos de cuero"],
  },
  {
    nombre: "Versión Classic",
    descripcion: "Versión básica pero con el confort necesario.",
    precio: 16000,
    colores: ["Gris", "Azul", "Blanco"],
    equipamiento: ["Asientos de tela", "Radio FM/AM"],
  }
];

const mockConcesionarios = [
  { nombre: "Concesionario Jujuy Autos", provincia: "Jujuy", ciudad: "San Salvador" },
  { nombre: "Concesionario Norte Autos", provincia: "Jujuy", ciudad: "Palpalá" },
];

// Función para obtener los modelos de autos disponibles
const informacionModelos: FunctionTool = {
  type: "function",
  function: {
    name: "informacionModelos",
    description: "modelos disponibles",
    parameters: {
      type: "object",
      properties: {
        modelo: { type: "string", description: "La modelo, ej: 208" },
        conDescripcion: { type: "boolean" },
        conPrecio: { type: "boolean" },
        conFotos: { type: "boolean" },
        conOpcionales: { type: "boolean" },
      },
    },
  },
  execute: async ({ modelo, conPrecio, conFotos, conOpcionales, conDescripcion }) => {
    let modelosFiltrados = mockModelos;

    if (modelo) {
      modelosFiltrados = modelosFiltrados.filter(m => m.nombre.includes(modelo));
    }

    const modelosConDatos = modelosFiltrados.map((modelo) => {
      const resultado: any = { nombre: modelo.nombre };
      if (conDescripcion) resultado.descripcion = modelo.descripcion;
      if (conPrecio) resultado.precio = modelo.precio;
      if (conOpcionales) resultado.accesorios = modelo.accesorios;
      if (conFotos) {
        resultado.foto_interior = modelo.foto_interior;
        resultado.foto_exterior = modelo.foto_exterior;
      }
      return resultado;
    });

    return JSON.stringify(modelosConDatos);
  }
};

// Función para obtener las versiones de los modelos
const versionesDisponibles: FunctionTool = {
  type: "function",
  function: {
    name: "versionesDisponibles",
    description:
      "Devuelve informacion sobre las versiones existentes de un modelo particular",
    parameters: {
      type: "object",
      properties: {
        modelo: {
          type: "string",
          description: "El nombre del modelo, ej: 208",
        },
        version: {
          type: "string",
        },
        conPrecio: {
          type: "boolean",
          description: "Indica si se debe incluir el precio",
        },
        conColores: {
          type: "boolean",
          description: "Indica si se deben incluir los colores disponibles",
        },
        conEquipamiento: {
          type: "boolean",
          description: "Indica si se debe incluir el equipamiento",
        },
        conFotos: {
          type: "boolean",
          description: "Indica si se deben incluir fotos del modelo",
        },
      },
      required: ["modelo"],
    },
  },
  // Ajusta la función para usar los datos mockeados
  execute: async (params: {
    modelo: string;
    version?: string;
    conPrecio?: boolean;
    conColores?: boolean;
    conEquipamiento?: boolean;
    conFotos?: boolean;
  }) => {
    const { modelo, version, conPrecio, conColores, conEquipamiento, conFotos } = params;

    // Filtrar las versiones según el modelo
    let versionesFiltradas = mockVersiones.filter(v => v.nombre.toLowerCase().includes(modelo.toLowerCase()));

    // Filtrar por la versión si se proporciona
    if (version) {
      versionesFiltradas = versionesFiltradas.filter(v => v.nombre.toLowerCase().includes(version.toLowerCase()));
    }

    // Mapear las versiones a los campos que se solicitan
    const versionesConDatos = versionesFiltradas.map((version) => {
      const resultado: any = { nombre: version.nombre, descripcion: version.descripcion };

      if (conPrecio) resultado.precio = version.precio;
      if (conColores) resultado.colores = version.colores;
      if (conEquipamiento) resultado.equipamiento = version.equipamiento;
      // Simular fotos (ya que en versiones mock no se incluyen fotos)
      if (conFotos) {
        resultado.fotos = {
          interior: ["foto_interior_default.jpg"],
          exterior: ["foto_exterior_default.jpg"],
        };
      }

      return resultado;
    });

    return JSON.stringify(versionesConDatos);
  }
}


// Función para obtener los concesionarios disponibles
const concesionarios: FunctionTool = {
  type: "function",
  function: {
    name: "concesionarios",
    description: "Busca entre los concesionarios más cercanos",
    parameters: {
      type: "object",
      properties: {
        provincia: { type: "string", description: "Provincia, ej: Jujuy" },
        ciudad: { type: "string", description: "Ciudad, ej: San Salvador" },
      },
      required: ["provincia", "ciudad"],
    },
  },
  execute: async ({ provincia, ciudad }) => {
    const concesionariosFiltrados = mockConcesionarios.filter(c =>
      c.provincia.includes(provincia) && c.ciudad.includes(ciudad)
    );
    return JSON.stringify(concesionariosFiltrados);
  }
};

// Función mockeada para traer personalidad
export const traerPersonalidad = async () => {
  const data = {
    personalidad: "Amigable y servicial",
    formato_respuesta: "Responde de manera breve y concisa",
  };
  const personalidad = `${data.personalidad} | Formato para todas las respuestas: ${data.formato_respuesta}`;
  return personalidad;
};

// Exportar herramientas (tools) para usar en la aplicación
export const tools: FunctionTool[] = [
  informacionModelos,
  versionesDisponibles,
  concesionarios,
];
