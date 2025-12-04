import { serial, text, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Define the user table schema
export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Define the courses table schema
export const courses = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const userCourses = pgTable("user_courses", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  course_id: text("course_id")
    .notNull()
    .references(() => courses.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
