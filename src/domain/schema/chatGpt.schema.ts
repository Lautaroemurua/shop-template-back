export const chatGptSchema = {
  name: 'respuesta_chat',
  strict: true,
  schema: {
    type: 'object',
    properties: {
      respuesta: {
        type: 'string',
        description: 'Respuesta de texto del chat',
      },
      imagenes: {
        type: 'array',
        strict: true,
        description:
          'Máximo de 3 items por respuesta, incluir solo 1 items del tipo text y hasta 2 items del tipo link',
        items: {
          type: 'object',
          properties: {
            link: {
              type: 'string',
              description:
                'Incluir solo si NO exite text y existe ID de una imagen obtenida desde las tools',
            },
            caption: {
              type: 'string',
              description:
                'Incluir solo si existe link. Caption que acompaña al enlace',
            },
          },
          required: ['link', 'caption'],
          additionalProperties: false,
        },
      },
    },
    required: ['respuesta', 'imagenes'],
    additionalProperties: false,
  },
};

export const schemaChatGptPerfilado = {
  name: 'perfilado_chat',
  strict: false,
  schema: {
    type: 'object',
    properties: {
      nombre: {
        type: 'string',
        description: 'nombre del usuario',
      },
      apellido: {
        type: 'string',
        description: 'apelldio del usuario',
      },
      email: {
        type: 'string',
        description: 'email del usaurio',
      },
      telefono: {
        type: 'string',
        description: 'telefono del usaurio',
      },
      ubicacion: {
        type: 'string',
        description: 'ubicacion del usaurio',
      },
      redes: {
        type: 'string',
        description: 'redes del usaurio',
      },
      interes: {
        type: 'array',
        description: 'intereses del usuario',
        strict: true,
        items: {
          type: 'string',
        },
      },
      sugerencia: {
        type: 'string',
        description: 'acción comercial concreta en base a los datos',
      },
      resumen: {
        type: 'string',
        description:
          'resumen de la conversación con todos los datos importantes incluir informacion del usuario',
      },
    },
    required: ['sugerencia', 'resumen'],
    additionalProperties: false,
  },
};
