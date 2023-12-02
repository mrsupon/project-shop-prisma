//import { PrismaClient } from '@prisma/client';
//import { Prisma, PrismaClient } from '@internal/prismaSqlite/client/index.js';
import prismaSqlite from './database/prisma/dbPrismaSqlite.js';
import Utility from './utils/utility.js';
import msg from './utils/message.js';

//const prisma = new PrismaSqliteClient();
async function main() {
  // const s = await prisma.session.create({
  //   data: {
  //     id: 'asdfasdf',
  //     sid: 'aaaaaaaaaaaaaaaaaaaa',
  //     data: 'bbbbbbbbbbbbbbb',
  //     expiresAt: new Date().toISOString(),
  //   },
  // });
  // console.log(s);
  /////////////////////////////////////////////////////
  const session = await prismaSqlite.session.findMany();
  console.log(session);

  // ... you will write your Prisma Client queries here
  ///////////////////////////////////////////////////////
  //   const user = await prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //     },
  //   });
  //   console.log(user);
  ///////////////////////////////////////////////////////
  // const products = await prisma.products.findMany();
  // console.log(products);
  ///////////////////////////////////////////////////////
  //   const user = await prisma.user.create({
  //     data: {
  //       name: 'Bob',
  //       email: 'bob@prisma.io',
  //       posts: {
  //         create: {
  //           title: 'Hello World',
  //         },
  //       },
  //     },
  //   });
  //   console.log(user);
  ///////////////////////////////////////////////////////
  // const usersWithPosts = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.dir(usersWithPosts, { depth: null });
  ///////////////////////////////////////////////////////
  //   const post = await prisma.post.update({
  //     where: { id: 1 },
  //     data: { published: true },
  //   });
  //   console.log(post);
  ///////////////////////////////////////////////////////
  // const p = await prisma.products.create({
  //   data: {
  //     title: 'Book1',
  //     imageUrl: 'book1.jpg',
  //     description: 'book1 book1 book1 book1 book1 ',
  //     price: 11.11,
  //     userId: 3,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   },
  // });
  //console.log();
}
// msg.set('error', ['email invalid', 'pw invalid']);
// msg.set('error', 'user invalid');
// msg.set('success', 'user success');
// msg.set('success', 'login success');
// console.log('result');
// console.log(msg.get('error'));
// console.log(msg.get('error'));
// console.log(msg.get(1234));
// console.log(msg.get());
// console.log(msg.isEmpty());
// console.log(msg.data['error']);
main()
  .then(async () => {
    await prismaSqlite.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaSqlite.$disconnect();
    process.exit(1);
  });
