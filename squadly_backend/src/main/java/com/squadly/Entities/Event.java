package com.squadly.Entities;

import com.squadly.Enums.Sport;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Enumerated()
    private Sport sport;
    private LocalDateTime timestamp;
    private int maxParticipants;

    @OneToMany(mappedBy = "event")
    List<JoinRequest> joinRequests;

    public Event(){
        this.joinRequests = new ArrayList<>();
    }

    public Event(Sport sport, LocalDateTime timestamp, int maxParticipants){
        this.joinRequests = new ArrayList<>();
        this.sport = sport;
        this.timestamp = timestamp;
        this.maxParticipants = maxParticipants;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return maxParticipants == event.maxParticipants && Objects.equals(id, event.id) && sport == event.sport && Objects.equals(timestamp, event.timestamp) && Objects.equals(joinRequests, event.joinRequests);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sport, timestamp, maxParticipants, joinRequests);
    }
}
