package com.Fwp.financeWebApi.repositories;

import com.Fwp.financeWebApi.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT e FROM Expense e WHERE e.userId.id = :id")
    List<Expense> findByPerson(Long id);
}