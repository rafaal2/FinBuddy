package com.Fwp.financeWebApi.Controllers;

import com.Fwp.financeWebApi.model.Expense;
import com.Fwp.financeWebApi.model.User;
import com.Fwp.financeWebApi.services.ExpenseService;
import com.Fwp.financeWebApi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;
    @CrossOrigin
    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<User> findAll() {
        return service.findAll();
    }

    @CrossOrigin
    @GetMapping(value = "/{name}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findByName(@PathVariable(value = "name") String name) {
        List<User> User = service.findByName(name);
        return ResponseEntity.ok(User);
    }
}
