package com.squadly.Entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Message")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    private User fromUser;
    private User toUser;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

}
