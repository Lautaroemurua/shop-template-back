export const chatGptSchemaProfiling = {
  name: "perfilado_chat",
  strict: false,
  schema: {
    type: "object",
    properties: {
      nombre: {
        type: "string",
        description: "nombre del usuario"
      },
      apellido: {
        type: "string",
        description: "apelldio del usuario"
      },
      email: {
        type: "string",
        description: "email del usaurio"
      },
      telefono: {
        type: "string",
        description: "telefono del usaurio"
      },
      ubicacion: {
        type: "string",
        description: "ubicacion del usaurio"
      },
      redes: {
        type: "string",
        description: "redes del usaurio"
      },
      interes: {
        type: "array",
        description: "intereses del usuario",
        strict: true,
        items: {
          type: "string",
        }
      },
      sugerencia: {
        type: "string",
        description: "acción comercial concreta en base a los datos"
      },
      resumen: {
        type: "string",
        description: "resumen de la conversación con todos los datos importantes incluir informacion del usuario"
      },
    },
    required: [
      "sugerencia",
      "resumen",
    ],
    additionalProperties: false
  },
}