import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, NewUser, NewProduct, products, comments, NewComment } from "./schema";

export const createUser = async (data: NewUser) => {
  // why do i have to [user] = and returning() ?
  // well , when i run the query , it returns the data
  // when i dont include returning() , it returns the data in the form of query result
  // when i include returning() , it returns the data in the form of array
  // when i use [user] = it means that i am extracting the first element of the array

  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

// upsert mean = create if not exists , update if exists
export const upsertUser = async (data: NewUser) => {
  const exisingUser = await getUserById(data.id);

  if (exisingUser) return updateUser(data.id, data);

  return createUser(data);
};

// product queries

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  // with mean => joining the tables
  // it means we are joining products table with users table
  // and we are selecting the user from the products table
  //
  return await db.query.products.findMany({
    with: {
      user: true,
    },
    // this means => orderBy products (column) => desc (descending) => (column name)
    // example - > 10,9,8,7,6,5,4,3,2,1
    // last inserted product will be first
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    // the squre brackets needed because => drizzle orm orderby expects an array, even for single column
  });
};

// in the detail page, i see products info , and seller and comments
// Get post + post owner + comments + comment authors.
// It means: “When I fetch this record, also include its related user, and include its related comments.
// For each comment, also include the comment’s user. Sort comments by newest first.”

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: {
          user: true,
        },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

export const getProductsByUserId = async (userId: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, userId),
    with: {
      user: true,
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};

export const deleteProduct = async (id: string) => {
  // why do i have to return product ?
  // to check if the product is deleted successfully
  // and return the deleted product
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return product;
};

// comment queries

export const createComment = async (data : NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
}

export const deleteComment = async (id: string) => {
    const [comment] = await db.delete(comments).where(eq(comments.id , id)).returning();
    return comment;

}

export const getCommentById = async (id : string) => {
    return db.query.comments.findFirst({
        where : eq(comments.id , id),
        with : {
            user : true,
        }
    })
}
