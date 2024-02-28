package com.Fwp.financeWebApi.repositories;

import com.Fwp.financeWebApi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepostory extends JpaRepository<User, Long> {
}
