class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.stausCode = 404;
  }
}

module.exports = NotFoundError;
