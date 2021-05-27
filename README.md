<img src="https://media.giphy.com/media/Xbjut97XRr1aU/giphy.gif" width="100%">

# Pinball

A desktop pinball game built with Phaser 3 - A 2D WebGL renderer with a built-in game engine. In this project we have used Matter plugin witch provides the ability to use the Matter JS Physics Engine.

Visit link to play our pinball game [https://yrgo-pinball.netlify.app](https://yrgo-pinball.netlify.app/)

<br>

# Installation

1. Clone repository

```
git clone https://github.com/amandafager/pinball.git
```

```
cd path/to/project/folder/pinball
```

2. Install dependencies

```
npm i
```

3. Start server

```
npm run start
```

4. Open [http://localhost:8000 ](http://localhost:8000) in your browser

<br>

# Changelog

<details><summary>View changelog</summary>

- [#1 - Project setup and game configuration.](https://github.com/danielmedb/pinball2.0/pull/1)
- [#2 - Images for game objects and first object create class.](https://github.com/danielmedb/pinball2.0/pull/2)
- [#3 - Removed pull request.](#3)
- [#4 - Game ball functionality.](https://github.com/danielmedb/pinball2.0/pull/4)
- [#5 - First draft of creating game objects with collision shape.](https://github.com/danielmedb/pinball2.0/pull/5)
- [#6 - New object create class with collision shape and launcher class.](https://github.com/danielmedb/pinball2.0/pull/6)
- [#7 - Game over and new game.](https://github.com/danielmedb/pinball2.0/pull/7)
- [#8 - Flippers and update on launcher.](https://github.com/danielmedb/pinball2.0/pull/8)
- [#9 - New images for game design.](https://github.com/danielmedb/pinball2.0/pull/9)
- [#10 - Update in package.json.](https://github.com/danielmedb/pinball2.0/pull/10)
- [#11 - Update in package.json. Testing deploy on Netlify.](https://github.com/danielmedb/pinball2.0/pull/11)
- [#12 - Update objects physics shapes.](https://github.com/danielmedb/pinball2.0/pull/12)
- [#13 - Score functionality and collision effect on bumpers.](https://github.com/danielmedb/pinball2.0/pull/13)
- [#14 - Addition of game objects.](https://github.com/danielmedb/pinball2.0/pull/14)
- [#15 - Left spring and audio on flippers.](https://github.com/danielmedb/pinball2.0/pull/15)
- [#16 - Tailwind and welcome/end screen.](https://github.com/danielmedb/pinball2.0/pull/16)
- [#17 - Updates on left spring and launcher spring.](https://github.com/danielmedb/pinball2.0/pull/17)
- [#18 - Audio on more objects.](https://github.com/danielmedb/pinball2.0/pull/18)
- [#19 - Testing text solution on brave browser.](https://github.com/danielmedb/pinball2.0/pull/19)
- [#20 - Updated audio, bounce and closing pin.](https://github.com/danielmedb/pinball2.0/pull/20)
- [#21 - Warnings, score and hit effects.](https://github.com/danielmedb/pinball2.0/pull/21)
- [#22 - Comments, ball modifications.](https://github.com/danielmedb/pinball2.0/pull/22)

</details>

<br>

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

<br>

# Testers

Tested by the following people:

1. Martin Hansson
2. Rikard Segerkvist
3. Moa Berg
4. Gilda Eklöf

Tested by the following muggles (non-coders):

1. Mikael Hagberg Stenfelt
2. Felicia Griph
3. Amanda Ternblad
4. Axel Carlsson
