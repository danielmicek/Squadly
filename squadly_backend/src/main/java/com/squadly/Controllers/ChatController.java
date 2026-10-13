package com.squadly.Controllers;

import com.squadly.Entities.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate; // sluzi na posielanie sprav z backendu konkretnemu userovi

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage") // sem posielame z FE, teda /app/sendMesasage
    public void sendMessage(ChatMessage message) {

        // send message to sender
        messagingTemplate.convertAndSendToUser(
                message.getFromUser().getId().toString(),
                "/queue/position-updates",
                message
        );

        // send message to receiver
        messagingTemplate.convertAndSendToUser(
                message.getToUser().getId().toString(),
                "/queue/position-updates",
                message
        );
    }
}
