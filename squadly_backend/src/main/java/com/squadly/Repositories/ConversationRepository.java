package com.squadly.Repositories;

import com.squadly.Entities.Conversation;
import com.squadly.Entities.ConversationMessageId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, ConversationMessageId> {
}
