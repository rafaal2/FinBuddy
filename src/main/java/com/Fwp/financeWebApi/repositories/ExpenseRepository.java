package com.Fwp.financeWebApi.repositories;

import com.Fwp.financeWebApi.model.Expense;
import com.Fwp.financeWebApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT e FROM Expense e WHERE e.userId.id = :id")
    List<Expense> findByPerson(Long id);

    @Query("SELECT e FROM Expense e WHERE e.name = :name")
    Optional<Expense> findByName(String name);

}