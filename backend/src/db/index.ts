import { PgTable } from "drizzle-orm/pg-core";
import * as schema from "./schema"
import { ENV } from "../config/env";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not in the env file!")
}

// pool initialize the connection with database

const pool = new Pool({connectionString : ENV.DATABASE_URL});

// log whe connected
pool.on("connect" , () => {
    console.log("connected to database successfully")
})

// error
pool.on("error" , (err) => {
    console.log("error in database connection" , err)
})

// here we export the drizzle instance 
// this instance is used to perform database operations
// client -> this is the connection pool 
// schema -> this is the schema of the database (all the tables)
export const db = drizzle({client : pool,schema})

// what is connection pool? 
// connection pool is a cache of database connections that are kept open and reused.

// why use it ? 
// instead of creating a new connection every time we need to perform a database operation, we can use a connection from the pool.
// this is much faster than creating a new connection every time.

// database limit concurrent connection -> 100
// if we have more than 100 connections, we need to wait for a connection to be released.