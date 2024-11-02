// src/routes/_errors/bad_request.ts
var BadRequest = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
};

export {
  BadRequest
};
