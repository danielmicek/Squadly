package com.squadly.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class ConversationMessageId implements Serializable {

    @Column(name = "sender_id", nullable = false, length = 255)
    private String senderId;

    @Column(name = "receiver_id", nullable = false, length = 255)
    private String receiverId;

    protected ConversationMessageId() {
    }

    public ConversationMessageId(String senderId, String receiverId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConversationMessageId that)) return false;
        return Objects.equals(senderId, that.senderId)
                && Objects.equals(receiverId, that.receiverId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(senderId, receiverId);
    }
}
