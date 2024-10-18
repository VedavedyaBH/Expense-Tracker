import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function getBalance(req: any, res: Response) {
    try {
        const balance = 500;
        res.status(200).send({ message: "success", balance });
    } catch (error) {
        res.status(400).send({ message: "Something went wrong" });
    }
}

export async function addExpense(req: Request, res: Response) {
    try {
        const { description, amount, category, userId } = req.body;
        console.log(description, amount, category, userId);
        const newExpense = await prisma.expense.create({
            data: {
                description: description,
                amount: amount,
                category: category,
                userId,
            },
        });

        console.log("Expense added:", newExpense);
    } catch (error) {
        console.error("Error adding expense:", error);
    } finally {
        await prisma.$disconnect();
    }
}
