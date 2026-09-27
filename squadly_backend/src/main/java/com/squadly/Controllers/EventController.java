package com.squadly.Controllers;

import com.squadly.DataTransferObjects.EventDto;
import com.squadly.Entities.Event;
import com.squadly.Enums.Sport;
import com.squadly.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public List<Sport> getAllSports() {
        return Arrays.asList(Sport.values());
    }

    @PostMapping("/createEvent")
    @CrossOrigin(origins = {
            "http://localhost:8081",
            "exp://192.168.0.183:8081"
    })
    public ResponseEntity<String> createEvent(@RequestBody Event event) {
        eventRepository.saveAndFlush(event);
        return ResponseEntity.ok("POST request successful");
    }

    @PatchMapping("/editEvent/{id}")
    @CrossOrigin(origins = {
            "http://localhost:8081",
            "exp://192.168.0.183:8081"
    })
    public ResponseEntity<EventDto> editEvent(@RequestBody EventDto editedEvent, @PathVariable Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Event with ID " + id + " does not exist."
                ));

        if (editedEvent.type() != null) {
            event.setType(editedEvent.type());
        }
        if (editedEvent.sport() != null) {
            event.setSport(editedEvent.sport());
        }
        if (editedEvent.timestamp() != null) {
            event.setTimestamp(editedEvent.timestamp());
        }
        if (editedEvent.maxParticipants() != null) {
            event.setMaxParticipants(editedEvent.maxParticipants());
        }
        if (editedEvent.actualParticipants() != null) {
            event.setActualParticipants(editedEvent.actualParticipants());
        }
        if (editedEvent.title() != null) {
            event.setTitle(editedEvent.title());
        }

        eventRepository.saveAndFlush(event);
        return ResponseEntity.ok(EventDto.from(event));
    }
}
