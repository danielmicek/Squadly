package com.squadly.Entities;

import com.squadly.Enums.SkillLevel;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="join_request")
public class JoinRequest  implements java.io.Serializable {
    @Id
    private long id;
    private LocalDateTime timestamp;

    @Enumerated
    private SkillLevel skillLevel;

    @ManyToOne()
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private User participant;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    public JoinRequest() {
    }

    public JoinRequest(User owner) {
        this.owner = owner;
    }

    public JoinRequest(long id, User owner) {
       this.id = id;
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        JoinRequest that = (JoinRequest) o;
        return id == that.id && Objects.equals(timestamp, that.timestamp) && skillLevel == that.skillLevel && Objects.equals(event, that.event) && Objects.equals(participant, that.participant) && Objects.equals(owner, that.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, timestamp, skillLevel, event, participant, owner);
    }
}


