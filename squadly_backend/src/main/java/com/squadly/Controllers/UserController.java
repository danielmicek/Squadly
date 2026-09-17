package com.squadly.Controllers;

import com.squadly.Entities.User;
import com.squadly.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getUserById/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.getReferenceById(id);
    }
}
