import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// we are using drizzle orm to interact with database
// we are using postgresql as our database
// we are using neon as our database provider

// text() means that the column will store text data
// .primaryKey() means that the column will be the primary key
// .notNull() means that the column will not be null
// .unique() means that the column will be unique
//

export const users = pgTable("users", {
  // here we are using id from clerk as primary key
  // because clerk user id is stable and won't change

  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// relations mean how table connect to each other, this enables drizzle to join tables easily using {relationName : true}

// users can have many products , use many()
// products can have many comments , and one user (seller)
// comments can have only one user and only one product , use one()
//

// drizzle uses this relations to perform joins in queries
// if we write {products : true}
// then drizzle will join products table with users table
// this will give us all the products of the user
// this will give us all the comments of the user
// in short , this will give us all the products and comments of the user
//

export const userRelations = relations(users, ({ many }) => ({
  products: many(products), //one user -> many products
  comments: many(comments), //one user -> many comments
}));

// now we can access the products and comments of the user using user.products and user.comments
//

// products relations
// product belong to one user and can have many comments

export const productsRelations = relations(products, ({ many, one }) => ({
  // here it means fileds mean the column in products table
  // and references mean the column in users table
  // so it means products.userId is referenced to users.id
  // fields is forgein key in this table
  // references is primary key in other table
  users: one(users, { fields: [products.userId], references: [users.id] }),
  comments: many(comments),
}));

// comments relations
// a commnet belong to one user and one product

export const commentsRelations = relations(comments, ({ one }) => ({
  users: one(users, { fields: [comments.userId], references: [users.id] }),
  products: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
}));



// type inference
// this does not includes relations
// this declares the type of the table when selected 
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// products 

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// comments 

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;