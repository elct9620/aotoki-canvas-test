# Drag Example

It will move object by `drag` method.

# Usage

```
<html>
  <head>
    <title>Drag</title>
    <script src="jquery.min.js"></script>
    <scrtip src="jquery.canvas.drag.js"></script>
  </head>
  <body>
    <canvas id="drag"></canvas>
    <script>
      var drag = jQuery('#drag').canvasDrag().start();
      drag.addRect({
        x: 50,
        y: 50
      },{
        onDrag: function(event, object) {
          object.setPosition(event.offsetX, event.offsetY);
        }
      });
    </script>
  </body>
</html>
```

# Options

* `width` - Canvas width.
* `height` - Canvas height.
* `fps` - Frame per second (it use set frame update time)

## fillRect

### Fist Param

* `color` - The block's color.
* `x` - The block's position X.
* `y` - The block's position Y.
* `width` - The block's width.
* `height` - The block's height.
* `alpha` - The block's alpha.

### Secondary Param

* `onDrag` - When user drag the block, it will be called.
* `release` - When user release blokc, it will be called.

# Method

* `render` - Start render canvas.
* `fillRect` - Create a new block.
  * `options`
  * `events`

## onDrag callback object

* `draw` - Render block
* `setPosition` - Set block object positoin.
  * `x`
  * `y`
* `setAlpha` - Set block object alpha.
  * `alpha` - From 0 to 1
* `setColor` -  Set block object color.
  * `color`
* `resize` - Change block size.
  * `width`
  * `height`
* `getPosition` - Get block current position, it will return an array with x, y.
* `getSize` - Get block current size, it will return an array with width, height.
