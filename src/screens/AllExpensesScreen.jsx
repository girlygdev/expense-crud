import React, { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpensesScreen = () => {
    const expenseContext = useContext(ExpensesContext)
    const expenses = expenseContext.expenses

    return (
        <ExpensesOutput expenses={expenses} periodName='Total' />
    );
};

export default AllExpensesScreen;
