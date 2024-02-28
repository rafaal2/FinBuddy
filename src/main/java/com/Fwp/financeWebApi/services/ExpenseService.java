package com.Fwp.financeWebApi.services;

import com.Fwp.financeWebApi.exception.ResourceNotFoundException;
import com.Fwp.financeWebApi.model.Expense;
import com.Fwp.financeWebApi.model.User;
import com.Fwp.financeWebApi.repositories.ExpenseRepository;
import com.Fwp.financeWebApi.repositories.UserRepostory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;

@Service
public class ExpenseService {
    private final AtomicLong counter = new AtomicLong();

    private Logger logger = Logger.getLogger(ExpenseService.class.getName());
    @Autowired
    ExpenseRepository expenseRepository;
    @Autowired
    UserRepostory userRepostory;

    public List<Expense> findAll(){
        logger.info("finding all");
        return expenseRepository.findAll();
    }
    public Expense Create (Expense expense){
        logger.info("creating one expense");
        return expenseRepository.save(expense);
    }
    public User add(Long id) {
        logger.info("adding expense");
        var expenseEntity  = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));
        var userEntity  = userRepostory.findById(expenseEntity.getUserId().getId()).orElseThrow(() -> new ResourceNotFoundException("not found"));

        userEntity.setName(userEntity.getName());
        userEntity.setBalance(userEntity.getBalance() - expenseEntity.getPrice());
        return userRepostory.save(userEntity);
    }

}
