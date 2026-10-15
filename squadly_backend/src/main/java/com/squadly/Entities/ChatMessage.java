package com.squadly.Entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "message")
public class ChatMessage {

    @EmbeddedId
    @Setter(AccessLevel.NONE)
    private ConversationMessageId id;

    @MapsId("senderId")
    @ManyToOne   // jednosmerny vztah
    @JoinColumn(name = "sender_id")
    private User sender;

    @MapsId("receiverId")
    @ManyToOne   // jednosmerny vztah
    @JoinColumn(name = "receiver_id")
    private User receiver;

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

    private String body;


}
