class FileWriteError extends Error {
    constructor(msg: string) {
      super(msg);
    }
  }
  
  export default FileWriteError