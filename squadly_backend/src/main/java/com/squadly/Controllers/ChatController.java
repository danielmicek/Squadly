package com.squadly.Controllers;

import com.squadly.Entities.ChatMessage;
import com.squadly.Entities.User;
import com.squadly.Services.ConversationService;
import com.squadly.Services.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.NoSuchElementException;

@Controller
public class ChatController {

    private final UserService userService;
    private final ConversationService conversationService;

    private final SimpMessagingTemplate messagingTemplate; // sluzi na posielanie sprav z backendu konkretnemu userovi


    public ChatController(UserService userService, ConversationService conversationService, SimpMessagingTemplate messagingTemplate) {
        this.userService = userService;
        this.conversationService = conversationService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage") // sem posielame z FE, teda /app/sendMesasage
    public void sendMessage(ChatMessage message, Principal principal) {

        User sender;
        User receiver;

        try{
            sender = userService.getById(principal.getName());
            receiver = userService.getById(message.getReceiver().getId());
            message.setSender(sender);
        } catch(NoSuchElementException e){
            System.out.println("User not found.");
            return;
        }

        conversationService.createOrUpdateConversation(message, sender, receiver);

        // send message to sender
        messagingTemplate.convertAndSendToUser(
                sender.getId(),
                "/queue/position-updates",
                message
        );

        // send message to receiver
        messagingTemplate.convertAndSendToUser(
                receiver.getId(),
                "/queue/position-updates",
                message
        );
    }
}