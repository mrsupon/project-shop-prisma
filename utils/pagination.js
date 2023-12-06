import prisma from '../databases/prisma/dbPrismaMysql.js';

class Pagination {
  constructor(itemsPerPage = 3, totalItems = 0, currentPage = 1) {
    this.data = {
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: totalItems,
      firstPage: 1,
      lastPage: Math.ceil(totalItems / itemsPerPage),
      hasPrevious: currentPage > 1,
      hasNext: itemsPerPage * currentPage < totalItems,
      previousPage: currentPage - 1,
      nextPage: currentPage + 1,
    };
  }

  getResultSet(model, itemPerPage, currentPage) {
    const customPromise = new Promise((resolve, reject) => {
      // model.find()
      // .countDocuments()
      prisma[model]
        .count()
        .then((amount) => {
          this.set(itemPerPage, amount, currentPage);
          return prisma[model].findMany({ skip: (currentPage - 1) * itemPerPage, take: itemPerPage });
          // .skip((currentPage-1)*itemPerPage)
          // .limit(itemPerPage);
        })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
    return customPromise;
  }

  set(itemsPerPage = 3, totalItems = 0, currentPage = 1) {
    this.data = {
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: totalItems,
      firstPage: 1,
      lastPage: Math.ceil(totalItems / itemsPerPage),
      hasPrevious: currentPage > 1,
      hasNext: itemsPerPage * currentPage < totalItems,
      previousPage: currentPage - 1,
      nextPage: currentPage + 1,
    };
  }
  get() {
    return this.data;
  }
}

export default Pagination;
