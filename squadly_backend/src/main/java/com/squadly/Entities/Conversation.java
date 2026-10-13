package com.squadly.Entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    private User user1;
    private User user2;

    @OneToMany(mappedBy = "conversation")
    List<ChatMessage> messages;
}
