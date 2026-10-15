package com.squadly.Controllers;

import com.squadly.Entities.Conversation;
import com.squadly.Entities.ConversationMessageId;
import com.squadly.Services.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/conversations")
@CrossOrigin(origins = {
        "http://localhost:8081",
        "exp://192.168.0.183:8081"
})
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping("/getConversationById/{senderId}/{receiverId}")
    public Conversation getConversationById(
            @PathVariable String senderId,
            @PathVariable String receiverId
    ) {
        return conversationService.getById(
                new ConversationMessageId(senderId, receiverId)
        );
    }

    @PostMapping("/createConversation")
    public ResponseEntity<String> createConversation(@RequestBody Conversation conversation) {
        conversationService.save(conversation);
        return ResponseEntity.ok("New conversation created successfully.");
    }
}
