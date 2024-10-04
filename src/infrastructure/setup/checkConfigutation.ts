if (!process.env.CORS && !process.env.ALLOW_IP) {
  throw Error('Falta configurar CORS o ALLOW_IP')
}

if (!process.env.INFOAUTOS_URL) {
  throw Error('Falta configurar INFOAUTOS_URL de InfoAutos')
}

if (!process.env.INFOAUTOS_USER) {
  throw Error('Debe configurar INFOAUTOS_USER antes de iniciar el servicio')
}

if (!process.env.INFOAUTOS_PASS) {
  throw Error('Debe configurar INFOAUTOS_PASS antes de iniciar el servicio')
}
