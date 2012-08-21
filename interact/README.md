# Interact Example

It will bind `mouse move` event, and check is mouse hover rect. If hover on it, the callback `hoverIn` will be called.

# Usage

```
<html>
  <head>
    <title>Interact</title>
    <script src="jquery.min.js"></script>
    <script src="jquery.interact.js"></script>
  </head>
  <body>
    <canvas id="interact"></canvas>
    <script>
      var interact = jQuery('#interact').interact();
      interact.fillRect({
        hover: function(object) {
          object.setColor('blue');
        },
        hoverOut: function(object) {
          object.setColor('black');
        }
      });
      interact.render();
    </script>
  </body>
</html>
```

# Options

* `width` - Canvas Width
* `height` - Canvas Height

## fillRect
* `x` - The block's x position.
* `y` - The block's y position.
* `width` - The block's width.
* `height` - The block's height.
* `alpha` - The block's alpha.
* `color` - The block's color.
* `hover` - Mouse over event callback.
* `hoverOut` - Mouse out event callback.

`hover` and `hoverOut` callback can receive a param, it have one method.

# Method

* `render` - Start redner content object.
* `fillRect` - Create a block and fill color.

## fillRect hover&hoverOut callback object

* `setColor` - Change object color.
