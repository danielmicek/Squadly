package com.squadly.Services;

import com.squadly.Entities.User;
import com.squadly.Repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getById(String id) {
        return userRepository.findById(id)
                .orElseThrow();
    }
}
