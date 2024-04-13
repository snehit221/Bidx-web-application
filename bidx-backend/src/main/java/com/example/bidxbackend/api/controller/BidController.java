// Shahroz Ahmad

package com.example.bidxbackend.api.controller;

import com.example.bidxbackend.api.model.Bid;
import com.example.bidxbackend.api.repository.IBidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    @Autowired
    private IBidRepository bidRepository;

    @PostMapping("/create")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        Bid savedBid = bidRepository.save(bid);
        return ResponseEntity.ok(savedBid);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Bid>> getBidsByProductId(@PathVariable String productId) {
        List<Bid> bids = bidRepository.findByProductId(productId);
        return ResponseEntity.ok(bids);
    }

    @PostMapping("/declareWinner/{productId}")
    public ResponseEntity<String> declareWinner(@PathVariable String productId) {
        List<Bid> bids = bidRepository.findByProductId(productId);
        if (bids.isEmpty()) {
            return ResponseEntity.ok("No bids found for product ID: " + productId);
        }

        Bid winningBid = null;
        double maxBidAmount = Double.MIN_VALUE;
        for (Bid bid : bids) {
            if (bid.getBidAmount() > maxBidAmount) {
                maxBidAmount = bid.getBidAmount();
                winningBid = bid;
            }
        }

        if (winningBid != null) {
            bids.forEach(bid -> bid.setWinningBid(false));
            winningBid.setWinningBid(true);
            bidRepository.saveAll(bids);
            return ResponseEntity.ok("Winning bid declared for product ID: " + productId);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error declaring winning bid for product ID: " + productId);
        }
    }

    @GetMapping("/status/{productId}/{userId}")
    public ResponseEntity<?> getBidStatus(@PathVariable String productId, @PathVariable String userId) {
        List<Bid> bids = bidRepository.findByProductId(productId);

        Bid userBid = bids.stream()
                .filter(bid -> bid.getUserId().equals(userId))
                .findFirst()
                .orElse(null);

        if (userBid == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userBid);
    }
}
