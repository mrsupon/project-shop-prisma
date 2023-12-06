import { PrismaClient } from '@prisma/client';

class DbPrismaMysql {
  static _instance = null;
  #prisma;
  constructor() {
    this.#prisma = new PrismaClient();
    if (!DbPrismaMysql._instance) {
      DbPrismaMysql._instance = this;
    }
    return DbPrismaMysql._instance;
  }

  getInstance() {
    return this._instance;
  }

  getPrisma() {
    return this.#prisma;
  }
}

const prisma = new DbPrismaMysql().getPrisma();
export default prisma;
