class InvalidDataEncounteredError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default InvalidDataEncounteredError