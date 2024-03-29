package com.Fwp.financeWebApi.Controllers;

import com.Fwp.financeWebApi.model.Expense;
import com.Fwp.financeWebApi.model.User;
import com.Fwp.financeWebApi.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @CrossOrigin
    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Expense> findAll() {
        return expenseService.findAll();
    }
    @CrossOrigin
    @PostMapping(value = "/add/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> CreateExpense(@PathVariable(value = "id") Long id) {
        User updatedUser = expenseService.add(id);
        return ResponseEntity.ok(updatedUser);
    }
    @CrossOrigin
    @GetMapping(value = "/find/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findByName(@PathVariable(value = "id") Long id) {
        List<Expense> User = expenseService.findByPerson(id);
        return ResponseEntity.ok(User);
    }

    @PostMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> create(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.Create(expense);
        User updatedUser = expenseService.add(savedExpense.getId());
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping(value = "/delete/{name}")
    public ResponseEntity<?> deleteByName(@PathVariable(value = "name") String name) {
        Optional<Expense> expense = expenseService.findByName(name);
        if (expense.isPresent()) {
            expenseService.delete(expense.get().getId());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
