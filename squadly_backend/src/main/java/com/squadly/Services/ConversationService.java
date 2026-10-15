package com.squadly.Services;

import com.squadly.Entities.*;
import com.squadly.Repositories.ConversationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    /**
     Get conversation by ID.
     */
    public Conversation getById(ConversationMessageId id) {
        return conversationRepository.findById(id)
                .orElseThrow();
    }

    /**
     Save conversation to DB.
     */
    public Conversation save(Conversation conversation) {
        return conversationRepository.saveAndFlush(conversation);
    }

    /**
    Get existing conversation from DB.
    Creates a new conversation if it does not exist and save to DB.
     */
    public void createOrUpdateConversation(ChatMessage message, User sender, User receiver){
        Conversation conversation;

        try{
            conversation = this.getById(message.getId());

            List<ChatMessage> allMessages = conversation.getMessages();
            allMessages.add(message);
            conversation.setMessages(allMessages);

        } catch (NoSuchElementException e){
            System.out.println("Conversation does not exist. Creating new one...");

            conversation = new Conversation(message.getId(), List.of(message));

            // creation of conversation participants
            ConversationParticipant participant1 = new ConversationParticipant(sender, conversation);
            ConversationParticipant participant2 = new ConversationParticipant(receiver, conversation);

            // add participants to conversation
            conversation.setConversationParticipants(List.of(participant1, participant2));
        }

        this.save(conversation);
    }
}
