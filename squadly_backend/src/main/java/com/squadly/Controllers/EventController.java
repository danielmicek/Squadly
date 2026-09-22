package com.squadly.Controllers;

import com.squadly.Entities.Event;
import com.squadly.Enums.SportName;
import com.squadly.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/getEventId/{id}")
    @CrossOrigin(origins = {
            "http://localhost:8081",
            "exp://192.168.0.183:8081"
    })
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.getReferenceById(id);
    }

    @GetMapping("/getAllSports")
    @CrossOrigin(origins = {
            "http://localhost:8081",
            "exp://192.168.0.183:8081"
    })
    public List<SportName> getAllSports() {
        System.out.println(Arrays.asList(SportName.values()));
        return Arrays.asList(SportName.values());
    }
}
