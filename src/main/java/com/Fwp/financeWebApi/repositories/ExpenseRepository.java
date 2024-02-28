package com.Fwp.financeWebApi.repositories;

import com.Fwp.financeWebApi.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
