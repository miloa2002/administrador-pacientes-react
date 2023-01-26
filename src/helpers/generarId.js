function generarId() {
  const a = new Date().getTime();
  const b = Math.floor(a / 10);
  return b;
}

export default generarId;
