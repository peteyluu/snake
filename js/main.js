const SnakeView = require('./snake-view.js');

$( () => {
  const rootEl = $('.snake-game');
  new SnakeView(rootEl);
});
