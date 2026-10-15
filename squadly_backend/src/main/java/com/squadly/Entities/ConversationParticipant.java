package com.squadly.Entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "conversation_participant")
public class ConversationParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant", nullable = false)
    private User conversationParticipant;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(
                    name = "conversation_sender_id",
                    referencedColumnName = "sender_id"
            ),
            @JoinColumn(
                    name = "conversation_receiver_id",
                    referencedColumnName = "receiver_id"
            )
    })
    private Conversation conversation;

    public ConversationParticipant(){}

    public ConversationParticipant(User conversationParticipant, Conversation conversation) {
        this.conversationParticipant = conversationParticipant;
        this.conversation = conversation;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ConversationParticipant that = (ConversationParticipant) o;
        return Objects.equals(id, that.id) && Objects.equals(conversationParticipant, that.conversationParticipant) && Objects.equals(conversation, that.conversation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, conversationParticipant, conversation);
    }
}
