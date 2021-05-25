INSERT MANDATORY GIF

# Project Title

Text about the project and which JavaScript library you're using. This would also be a great place to link the game on Netlify.

# Installation

Add the installation instructions.

# Changelog

- [#1 - Add a link to each pull request with a descriptive line.](#1)

# Code Review

By: [Aseel Mohamad](https://github.com/Aseel88) & [Dante Mogrim](https://github.com/dantemogrim):

1. `object.js` - Could have a more precise name or a comment that explains the content within 'object'.
2. `GameScene.js` - The ball gets stuck sometimes in the upper left corner.
3. `/dist` - Parcel loads in after 30 seconds. Some alterations or maybe a switch to another bundler could ease things up.
4. `tailwind.css` - 3,6 MB in size. Site performance could be improved if you used something like NPM/Yarn to handle Tailwind instead.
5. `GameScene.js:327` - This file could probably be shortened somehow. For example the content in preload and create could be buffered within another file perhaps. More classes could be another solution.
6. `GameScene.js:156-157` - The 'score' and 'balls left' texts are a bit small on the eyes. Could be a bit bigger or maybe in CAPS? :wink:
7. `launcher.js` Some clarifications could improve readability here. From the outside looking in, it can be a bit hard to grasp what certain things represent without doing detective work.
8. Audio could be set the other way around - so off per default and if player in fact does want sound, then they can toggle it by pressing <kbd>P</kbd>.
9. `greenDot.png` is weighing in on 1,2 MB. Compressing it would be good.
10. `star.png` is also currently 1,2 MB in size. Could be reduced a bit.

> "Amazing work, you two! We were very impressed with what you've accomplished together. You should be proud! :star2: Nice touch with using JSON to render your sprites. Highly nostalgic! :heart_eyes_cat: " / Aseel & Dante

# Testers

Tested by the following people:

1. Jane Doe
2. John Doe
3. Jane Doe
4. John Doe

Tested by the following muggles (non-coders):

1. Jane Doe
2. John Doe
3. Jane Doe
4. John Doe
