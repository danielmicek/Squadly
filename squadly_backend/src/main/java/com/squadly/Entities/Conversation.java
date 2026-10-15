package com.squadly.Entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
public class Conversation {

    @EmbeddedId
    @Setter(AccessLevel.NONE)
    private ConversationMessageId id;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    List<ChatMessage> messages = new ArrayList<>();

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    List<ConversationParticipant> conversationParticipants = new ArrayList<>();

    public Conversation(){}

    public Conversation(ConversationMessageId id, List<ChatMessage> messages) {
        this.id = id;
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return Objects.equals(id, that.id) && Objects.equals(messages, that.messages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, messages);
    }
}
