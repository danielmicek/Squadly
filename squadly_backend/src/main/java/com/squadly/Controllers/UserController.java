package com.squadly.Controllers;

import com.squadly.Entities.User;
import com.squadly.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getUserById/{id}")
    @CrossOrigin(origins = {
            "http://localhost:8081",
            "exp://192.168.0.183:8081"
    })
    public User getUserById(@PathVariable Long id) {
        return userRepository.getReferenceById(id);
    }
}
