package com.squadly.DataTransferObjects;

import com.squadly.Entities.Event;
import com.squadly.Enums.Sport;
import com.squadly.Enums.TypeName;

import java.time.LocalDateTime;

public record EventDto(
        Long id,
        TypeName type,
        Sport sport,
        LocalDateTime timestamp,
        Integer maxParticipants,
        Integer actualParticipants,
        String title
) {

    // Creates a new EventDto entity from Event entity
    public static EventDto from(Event event) {
        return new EventDto(
                event.getId(),
                event.getType(),
                event.getSport(),
                event.getTimestamp(),
                event.getMaxParticipants(),
                event.getActualParticipants(),
                event.getTitle()
        );
    }
}
