# Judgement — How to Play

 ## Overview

 **Judgement** is a trick-taking card game where players must predict how many tricks they will win before playing their cards.

 The game starts with **1 card per player** and increases by one card each round:

 > `1 → 2 → 3 → 4 → ... → 8`

 The challenge is to win **exactly the number of tricks you predicted**.

 A key rule is that the **total of all players' bids cannot equal the number of tricks available in the round**.

---

 ## 1\. Objective

 The objective is to accumulate the most points by accurately predicting the number of tricks you will win.

 Each round:

 1. Players receive a number of cards equal to the current round number.
2. Players inspect their cards.
3. Players bid how many tricks they expect to win.
4. The total of all bids **must not equal the round number**.
5. Players play their cards.
6. The number of tricks won by each player is counted.
7. Points are awarded based on the player's bid and actual number of tricks won.

 At the end of the game, the player with the **highest total score wins**.

---

 # 2\. Players and Deck

 - Use a standard **52-card deck**.
- Jokers are not used.
- The game supports multiple players.
- Each round, every player receives the same number of cards.

 ### Card Ranking

 From highest to lowest:

 **A → K → Q → J → 10 → 9 → 8 → 7 → 6 → 5 → 4 → 3 → 2**

---

 # 3\. Rounds

 The number of cards dealt to each player increases each round.

For example:

 - Round 1 → everyone gets 1 card.
- Round 4 → everyone gets 4 cards.
- Round 8 → everyone gets 8 cards.


---

 # 4\. Dealing

 At the beginning of each round:

 1. Shuffle the deck.
2. Deal the required number of cards to every player.
3. The next card from the deck determines the **trump suit**.
4. Players look at their cards.
5. Players make their bids.

 The trump suit remains the trump suit for the entire round.

---

 # 5\. Trump Suit

 The **trump suit** is the suit that beats all other suits.

 For example, if the trump card is:

 **♥ 7**

 then **Hearts are trump**.

 A trump card beats any card from a non-trump suit.

 ### Example

 Trump = ♥️

 Cards played:

 - ♠ A
- ♠ K
- ♥ 2
- ♠ 10

 The **♥ 2 wins**, because Hearts are trump.

 Even though the Ace of Spades is the highest-ranked card, a trump card beats it.

---

 # 6\. Bidding

 Before the first trick of each round, every player must announce how many tricks they expect to win.

 A player can bid any number from:

```
0 → number of cards in the round
```

 For example, in Round 5, a player can bid:

 - 0
- 1
- 2
- 3
- 4
- 5

---

 ## Important: Total Bids Cannot Equal the Round Number

 The sum of all players' bids **must not equal the number of tricks available in the round**.

 ### Example — Round 3

 There are 3 tricks available.

 Suppose the bids are:

```
Alice = 1
Bob   = 1
Sarah = 1
```

 Total:

```
1 + 1 + 1 = 3
```

 This is **not allowed**, because the total bid equals the round number.

 A valid set of bids could be:

```
Alice = 2
Bob   = 1
Sarah = 0
```

 Total:

```
2 + 1 + 0 = 3
```

 That is also **not allowed**.

 The bids must be changed until their total is **not 3**.

 For example:

```
Alice = 2
Bob   = 0
Sarah = 0
```

 Total:

```
2 + 0 + 0 = 2
```

 This is valid.

 ### Why this rule exists

 The rule prevents everyone from collectively predicting exactly how many tricks will be won.

 It forces at least one player to make a prediction that differs from the total number of available tricks.

---

 # 7\. Playing a Trick

 After all bids have been made, players play their cards.

 The first player leads a card.

 Players then play one card each in turn.

 ## Follow Suit

 Players **must follow the suit that was led if they have a card of that suit**.

 For example:

 The first player plays:

 **♠ 10**

 If you have a Spade, you must play a Spade.

 If your hand is:

```
♠ K
♥ 5
♦ A
```

 you must play:

 **♠ K**

 You cannot play the ♥5 or ♦A.

---

 ## If You Cannot Follow Suit

 If you do not have a card matching the suit that was led, you may play **any card**.

 You may:

 - Play a trump card.
- Play another non-trump card.
- Attempt to win the trick.
- Throw away a card you don't want to keep.

---

 # 8\. Determining the Winner

 The winner of a trick is determined in this order:

 ### 1\. Trump cards

 If one or more trump cards were played, the **highest trump card wins**.

 ### 2\. No trump cards

 If nobody played trump, the **highest card of the suit that was originally led wins**.

---

 ## Example 1 — No Trump

 Trump = ♥️

 The lead is ♠️.

 Players play:

```
♠ 7
♠ K
♠ 3
♠ A
```

 The **♠ A** wins.

---

 ## Example 2 — Trump Wins

 Trump = ♥️

 The lead is ♠️.

 Players play:

```
♠ A
♠ 10
♥ 2
♠ K
```

 The **♥ 2** wins because Hearts are trump.

---

 ## Example 3 — Multiple Trump Cards

 Trump = ♥️

 Players play:

```
♥ 4
♥ Q
♥ 7
```

 The **♥ Q** wins.

---

 # 9\. Leading the Next Trick

 The player who wins a trick becomes the leader of the next trick.

 For example:

```
Player A leads
       ↓
Player B wins
       ↓
Player B leads next trick
       ↓
Player C wins
       ↓
Player C leads next trick
```

 This continues until all cards in the players' hands have been played.

---

 # 10\. Counting Tricks

 Each completed trick counts as **one trick won** for the player who won it.

 At the end of the round, every player will have a number of tricks won.

 The total number of tricks won by all players will always equal the number of cards dealt to each player.

 ### Example

 Round 4:

```
Alice = 2 tricks
Bob   = 1 trick
Sarah = 0 tricks
Tom   = 1 trick
```

 Total:

```
2 + 1 + 0 + 1 = 4
```

 There were 4 tricks available, so the total is correct.

---

 # 11\. Scoring

 Scoring is based on the player's **bid** and the number of tricks they actually won.

 There are exactly three scoring scenarios.

---

 ## Scenario 1 — Perfect Zero Bid

 If:

```
bid === 0
AND
wins === 0
```

 the player receives points equal to the current round number.

```
delta = round
```

 ### Examples

 | Round | Bid | Wins | Points |
| --- | --- | --- | --- |
| 1 | 0 | 0 | +1 |
| 2 | 0 | 0 | +2 |
| 3 | 0 | 0 | +3 |
| 5 | 0 | 0 | +5 |
| 8 | 0 | 0 | +8 |

A successful zero bid becomes more valuable in later rounds.

---

 ## Scenario 2 — Perfect Non-Zero Bid

 If:

```
bid > 0
AND
bid === wins
```

 the player receives:

```
delta = 2 × bid
```

 ### Examples

 | Bid | Wins | Points |
| --- | --- | --- |
| 1 | 1 | +2 |
| 2 | 2 | +4 |
| 3 | 3 | +6 |
| 4 | 4 | +8 |
| 5 | 5 | +10 |

The larger the successful bid, the more points the player receives.

---

 ## Scenario 3 — Missed Bid

 If the player's bid does not match the number of tricks won, they lose points based on the difference.

```
delta = -|bid - wins|
```

 In other words:

 > Lose 1 point for every trick you were away from your bid.

 ### Examples

 | Bid | Wins | Difference | Points |
| --- | --- | --- | --- |
| 2 | 1 | 1 | -1 |
| 2 | 0 | 2 | -2 |
| 1 | 3 | 2 | -2 |
| 4 | 2 | 2 | -2 |
| 0 | 2 | 2 | -2 |

---

 # 12\. Scoring Formula

 The complete scoring logic is:

```
if (bid === 0 && wins === 0) {
  delta = round;
} else if (bid > 0 && bid === wins) {
  delta = 2 * bid;
} else {
  delta = -Math.abs(bid - wins);
}
```

 This produces the following behavior:

 | Condition | Score |
| --- | --- |
| Bid 0, Win 0 | `+round` |
| Bid \> 0, Bid = Wins | `+2 × bid` |
| Bid ≠ Wins | \`- |

---

 # 13\. Complete Scoring Example

 Suppose it is **Round 3**.

 There are 4 players.

 ### Bids

```
Alice = 2
Bob   = 1
Sarah = 0
Tom   = 0
```

 ### Actual Tricks

```
Alice = 2
Bob   = 1
Sarah = 0
Tom   = 0
```

 Now calculate the scores.

 ### Alice

```
Bid  = 2
Wins = 2

2 × 2 = +4
```

 Alice gets **+4**.

 ### Bob

```
Bid  = 1
Wins = 1

2 × 1 = +2
```

 Bob gets **+2**.

 ### Sarah

```
Bid  = 0
Wins = 0

round = 3

+3
```

 Sarah gets **+3**.

 ### Tom

```
Bid  = 0
Wins = 0

round = 3

+3
```

 Tom gets **+3**.

 ### Round Results

 | Player | Bid | Wins | Round Score |
| --- | --- | --- | --- |
| Alice | 2 | 2 | **+4** |
| Bob | 1 | 1 | **+2** |
| Sarah | 0 | 0 | **+3** |
| Tom | 0 | 0 | **+3** |

---

 # 14\. Example of a Missed Bid

 Suppose it is Round 5.

 A player bids:

```
3
```

 but wins:

```
1
```

 The bid was missed by:

```
|3 - 1| = 2
```

 Therefore:

```
Score = -2
```

 Another player bids:

```
0
```

 but wins:

```
2
```

 Their score is:

```
-|0 - 2| = -2
```

---

 # 15\. Round Flow

 Every round follows the same sequence:

```
┌─────────────────────────┐
│ 1. Shuffle the deck     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 2. Deal N cards         │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 3. Determine trump suit │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 4. Players make bids    │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 5. Check total bids     │
│    ≠ round number       │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 6. Play all tricks      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 7. Count tricks won     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 8. Calculate scores     │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 9. Add to total score   │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 10. Start next round    │
└─────────────────────────┘
```

---

 # 16\. Example Full Round

 Let's play through Round 3.

 There are four players:

 - Alice
- Bob
- Sarah
- Tom

 Each player receives 3 cards.

 Trump is **♥️**.

 ### Bids

```
Alice = 2
Bob   = 1
Sarah = 0
Tom   = 0
```

 Total bid:

```
2 + 1 + 0 + 0 = 3
```

 Because this equals the round number, the bids are **invalid**.

 The players must adjust their bids.

 Suppose they change to:

```
Alice = 2
Bob   = 1
Sarah = 0
Tom   = 1
```

 Total:

```
2 + 1 + 0 + 1 = 4
```

 Since:

```
4 ≠ 3
```

 the bids are valid.

 The players now play the three tricks.

 ### Final trick results

```
Alice = 2
Bob   = 1
Sarah = 0
Tom   = 0
```

 ### Scoring

 Alice:

```
Bid = 2
Wins = 2

+4
```

 Bob:

```
Bid = 1
Wins = 1

+2
```

 Sarah:

```
Bid = 0
Wins = 0

+3
```

 Tom:

```
Bid = 1
Wins = 0

-|1 - 0| = -1
```

 Round scores:

 | Player | Bid | Wins | Score |
| --- | --- | --- | --- |
| Alice | 2 | 2 | +4 |
| Bob | 1 | 1 | +2 |
| Sarah | 0 | 0 | +3 |
| Tom | 1 | 0 | -1 |

These points are added to each player's running total.

---

 # 17\. Winning the Game

 After the final round:

 1. Add up every player's round scores.
2. Compare their total scores.
3. The player with the **highest total score wins**.

 ### Example

 | Player | Total Score |
| --- | --- |
| Alice | 47 |
| Bob | 39 |
| Sarah | 52 |
| Tom | 31 |

Sarah has the highest score and therefore wins the game.

---

 # 18\. Quick Rules Reference

 ### Before the round

 - Deal `round number` cards to each player.
- Reveal the trump suit.
- Players make their bids.
- The total bids **cannot equal the round number**.

 ### During a trick

 - The first player leads any card.
- Players must follow the led suit if possible.
- If unable to follow suit, any card may be played.
- Highest trump wins.
- If no trump is played, highest card of the led suit wins.
- Winner leads the next trick.

 ### After the round

 Calculate each player's score:

```
if (bid === 0 && wins === 0) {
  delta = round;
} else if (bid > 0 && bid === wins) {
  delta = 2 * bid;
} else {
  delta = -Math.abs(bid - wins);
}
```

 Then add `delta` to the player's total score.

---

 # 19\. Scoring Cheat Sheet

 | Your Bid | Tricks Won | Result |
| --- | --- | --- |
| 0 | 0 | **+round** |
| 0 | \> 0 | **-wins** |
| \> 0 | Exactly bid | **+2 × bid** |
| \> 0 | Less than bid | **-(bid - wins)** |
| \> 0 | More than bid | **-(wins - bid)** |

---

 # 20\. The Core Strategy

 The game is about **prediction, not simply winning as many tricks as possible**.

 A player who wins 5 tricks after bidding 2 has not succeeded. They receive a penalty.

 A player who wins 0 tricks after bidding 0 can score valuable points, especially in later rounds.

 Therefore, every card should be considered in terms of:

 - How likely it is to win a trick.
- Whether winning that trick helps or hurts your bid.
- The trump suit.
- Cards already played.
- Other players' bids.
- How many tricks you still need to win.

 The best outcome is not necessarily to win the most tricks.

 It is to **win exactly the number of tricks you predicted**.

---

 # 21\. Summary

 Judgement can be summarized as:

 > **Bid carefully. Follow suit. Use trump wisely. Win exactly what you predicted.**

 The game rewards players who can accurately judge the strength of their hand and control how many tricks they take.

 **Round → Deal → Trump → Bid → Play → Count → Score → Repeat.**

 This is ready to save directly as **`HowToPlay.md`** in your repository.
