package com.Fwp.financeWebApi.services;

import com.Fwp.financeWebApi.model.User;
import com.Fwp.financeWebApi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.logging.Logger;
@Service
public class UserService {
    private final AtomicLong counter = new AtomicLong();

    private Logger logger = Logger.getLogger(UserService.class.getName());
    @Autowired
    UserRepository repository;
    public List<User> findAll(){
        logger.info("finding all");
        return repository.findAll();
    }
    public Optional<User> findByName(String name){
        logger.info("finding user");
        return repository.findByName(name);
    }
    public boolean exists(String name) {
    return repository.existsByName(name);
    }
    public User create (User user){
        logger.info("creating one product");
        return repository.save(user);
    }
}
