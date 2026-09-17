package com.squadly.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    private String name;

    @OneToMany(mappedBy = "participant")
    List<JoinRequest> participantJoinRequests;

    @OneToMany(mappedBy = "owner")
    List<JoinRequest> ownedJoinRequests;

    protected User() {
        this.ownedJoinRequests = new ArrayList<>();
        this.participantJoinRequests = new ArrayList<>();
    }

    public User(String name) {
        this.name = name;
        this.ownedJoinRequests = new ArrayList<>();
        this.participantJoinRequests = new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(participantJoinRequests, user.participantJoinRequests) && Objects.equals(ownedJoinRequests, user.ownedJoinRequests);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, participantJoinRequests, ownedJoinRequests);
    }
}
