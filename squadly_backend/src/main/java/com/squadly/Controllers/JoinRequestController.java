package com.squadly.Controllers;

import com.squadly.Entities.JoinRequest;
import com.squadly.Repositories.JoinRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/events")
public class JoinRequestController {

    @Autowired
    private JoinRequestRepository joinRequestRepository;

    @GetMapping("/getJoinRequestId/{id}")
    public JoinRequest getJoinRequestById(@PathVariable Long id) {
        return joinRequestRepository.getReferenceById(id);
    }
}
