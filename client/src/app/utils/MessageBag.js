class MessageBag {
  constructor() {
    this.errors = {};
  }

  add({ source, message }) {
    if(!this.errors[source]) this.errors[source] = [];
    this.errors[source].push(message);
  }

  get() {
    return this.errors;
  }

  count() {
    return this.errors.length;
  }
}

export default MessageBag;