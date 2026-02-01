import {pgTable, integer, varchar, timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

const timestamps = {
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().$onUpdate(() => new Date()).notNull()
}

export const departments = pgTable("departments", {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    code: varchar('code', {length: 50}).notNull().unique(),
    name: varchar('name', {length: 255}).notNull(),
    description: varchar('description', {length: 255}),
    ...timestamps
})

export const subjects = pgTable("subjects", {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    departmentId: integer('department_id').notNull().references(() => departments.id, { onDelete: "restrict" }),
    name: varchar('name', {length: 255}).notNull(),
    code: varchar('code', {length: 50}).notNull().unique(),
    description: varchar('description', {length: 255}),
    ...timestamps
})

export const departmentRelations = relations(departments, ({ many }) => ({
    subjects: many(subjects)
}))

export const subjectRelations = relations(subjects, ({ one,many }) => ({
    department: one(departments, {
        fields: [subjects.departmentId],
        references: [departments.id]
    })
}))

// $inferSelect generates a TypeScript type representing the shape of data when retrieved from the database (SELECT queries)
export type Department = typeof departments.$inferSelect;
// $inferInsert generates a TypeScript type representing the shape of data when inserting into the database (INSERT queries)
export type NewDepartment = typeof departments.$inferInsert;

export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;
