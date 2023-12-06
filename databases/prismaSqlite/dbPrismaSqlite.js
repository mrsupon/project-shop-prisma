import { PrismaClient } from '@internal/prismaSqlite/client/index.js';

class DbPrismaSqlite {
  static _instance = null;
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
    if (!DbPrismaSqlite._instance) {
      DbPrismaSqlite._instance = this;
    }
    return DbPrismaSqlite._instance;
  }

  getInstance() {
    return this._instance;
  }

  getPrisma() {
    return this.#prisma;
  }
}

const prisma = new DbPrismaSqlite().getPrisma();
export default prisma;
