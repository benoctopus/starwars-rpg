# Star Wars RPG

A simple strategy game playable with the click of a mouse

## instructions

The game is played by either clicking on the protraits of the involved characters, or clicking on a button labeled attack.
The game is based upon mechanics revolving around the characters' attack defense, counter-attack, and health stats. Every time the player attacks the enemy, their attack power is increased by the value of their base attack. This is not true for opponents, who have a fixed counter-attack stat. Characters with lower health tend to have greater offensive capabilities The goal of the game is to defeat all three other characters in the battle phase without the player's own health reaching zero.
The player must choose their opponents carefully depending on the character they chose to play, as the only way to win is to exploit the weaknesses of your opponents' attributes. 

- Player attack: f(n) = b + bn, where b = base attack and n = number of consecutive attacks.
- Player attack resets on loss or completion of the game.
- NPC counter attacks are a fixed value.  
- The game ends after the player's health stat is reduced to zero, or all opponent's health stats are reduced to zero. At this point either the win or loss counter is incremented.

## Dependencies

This game used the Javascript library jquery(CDN) and Bootstrap(CDN) extensively.

## Known Issues

This game is meant to be run in a browser window with a width of over 1000px. The text inside the Character elements may become unreadable if the viewport shrinks below this limit.