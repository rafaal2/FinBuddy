package com.Fwp.financeWebApi.services;

import com.Fwp.financeWebApi.model.Expense;
import com.Fwp.financeWebApi.model.User;
import com.Fwp.financeWebApi.repositories.ExpenseRepository;
import com.Fwp.financeWebApi.repositories.UserRepostory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;
@Service
public class UserService {
    private final AtomicLong counter = new AtomicLong();

    private Logger logger = Logger.getLogger(UserService.class.getName());
    @Autowired
    UserRepostory repository;
    public List<User> findAll(){
        logger.info("finding all");
        return repository.findAll();
    }
}
