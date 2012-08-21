/*jslint browser: true*/
/*global jQuery,console*/

/**
 * jQuery Canvas Interact Test
 *
 */

(function ($) {
    "use strict";

    $.fn.interact = function (args) {
        args = args || {};

        var canvasWidth = args.width || 600,
            canvasHeight = args.height || 400,
            frameLength = Math.ceil(1000 / args.fps) || 35, //Set frame updat length, default is 30 fps
            canvas = this[0].getContext('2d'),
            objects = [],
            hoverEvents = [],
            self = this;

        function render() {
            var i,  object;

            canvas.save();
            for (i = 0; i < objects.length; i += 1) {
                object = objects[i];
                if (object.type === 'fillRect') {
                    canvas.globalAlpha = object.alpha;
                    canvas.fillStyle = object.color;
                    canvas.fillRect(object.x, object.y, object.width, object.height);
                }
            }
            canvas.restore();
        }

        function frameUpdate() {
            canvas.clearRect(0, 0, canvasWidth, canvasHeight);

            //Render Objects
            render();

            //Update Canvas
            setTimeout(frameUpdate, frameLength);
        }

        function checkHover(x, y) {
            var i, event;

            for (i = 0; i < hoverEvents.length; i += 1) {
                event = hoverEvents[i];
                if ((event.x <= x && event.maxX >= x) && (event.y <= y && event.maxY >= y)) {
                    if (event.hoverIn) {
                        event.hoverIn(objects[i]);
                    }
                } else {
                    if (event.hoverOut) {
                        event.hoverOut(objects[i]);
                    }
                }
            }
        }

        function bindEvent(target) {
            $(target).mousemove(function (event) {
                checkHover(event.offsetX, event.offsetY);
            });
        }

        this.fillRect = function (options) {
            options = options || {};

            var x = options.x || 0,
                y = options.y || 0,
                width = options.width || 100,
                height = options.height || 100,
                color = options.color || "#000",
                alpha = options.alpha || 1,
                hoverIn = options.hover || null,
                hoverOut = options.hoverOut || null,
                objectIndex;

            objectIndex = objects.push({
                type: 'fillRect',
                x: x,
                y: y,
                width: width,
                height: height,
                color: color,
                alpha: alpha,
                setColor: function (color) {
                    this.color = color;
                }
            });

            hoverEvents.push({
                x: x,
                y: y,
                maxX: x + width,
                maxY: y + height,
                index: objectIndex - 1,
                hoverIn: hoverIn,
                hoverOut: hoverOut
            });
        };

        this.render = function () {
            $(this).attr('width', canvasWidth).attr('height', canvasHeight);
            bindEvent(this);
            frameUpdate();
            return this;
        };

        return this;
    };

}(jQuery));
