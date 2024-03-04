package com.Fwp.financeWebApi.repositories;

import com.Fwp.financeWebApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.name = :name")
    Optional<User> findByName(String name);
    default boolean existsByName(String name) {
        return findByName(name).isPresent();
    }

}

