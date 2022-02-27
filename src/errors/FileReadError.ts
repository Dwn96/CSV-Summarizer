class FileReadError extends Error {
    constructor(msg: string) {
      super(msg);
    }
  }
  
  export default FileReadError