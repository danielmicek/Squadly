package com.squadly.Entities;

import com.squadly.Enums.Sport;
import com.squadly.Enums.TypeName;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
public class Event implements java.io.Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TypeName type;

    @Enumerated(EnumType.STRING)
    private Sport sport;

    @OneToMany(mappedBy = "event")
    List<JoinRequest> joinRequests;

    private LocalDateTime timestamp;
    private int maxParticipants;
    private int actualParticipants;
    private String title;

    @JdbcTypeCode(SqlTypes.JSON)
    private EventLocation location;

    public Event(){
        this.joinRequests = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return maxParticipants == event.maxParticipants && actualParticipants == event.actualParticipants && Objects.equals(id, event.id) && type == event.type && sport == event.sport && Objects.equals(joinRequests, event.joinRequests) && Objects.equals(timestamp, event.timestamp) && Objects.equals(title, event.title) && Objects.equals(location, event.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, sport, joinRequests, timestamp, maxParticipants, actualParticipants, title, location);
    }

    public Event(Sport sport, LocalDateTime timestamp, int maxParticipants, int actualParticipants){
        this.joinRequests = new ArrayList<>();
        this.sport = sport;
        this.timestamp = timestamp;
        this.maxParticipants = maxParticipants;
        this.actualParticipants = actualParticipants;
    }

}
