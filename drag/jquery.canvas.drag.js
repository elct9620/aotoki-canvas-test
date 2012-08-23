/*jslint browser: true*/
/*global jQuery,console*/

(function ($) {
    "use strict";

    $.fn.canvasDrag = function (args) {
        args = args || {};

        var width = args.width || 600, // Canvas Size
            height = args.height || 400,
            frameLength = Math.ceil(1000 / args.fps) || 35, // FPS, default 30 fps
            objects = [], // Canvas Objects
            events = [], // Events
            self = this,
            canvas,
            frameTimer;

        function renderObjects() {
            var i, object;
            for (i = 0; i < objects.length; i += 1) {
                object = objects[i];
                object.draw();
            }
        }

        // Update Frame
        function updateFrame() {
            // Reset Canvas
            canvas.clearRect(0, 0, width, height);

            // Render Objects
            renderObjects();

            // Update Frame
            frameTimer = setTimeout(updateFrame, frameLength);
        }

        // Objects
        function FillRect(args) {
            args = args || {};

            var x = args.x || 0,
                y = args.y || 0,
                width = args.width || 100,
                height = args.height || 50,
                color = args.color || "black",
                alpha = args.alpha || 1;

            function draw() {
                canvas.save();

                canvas.fillStyle = color;
                canvas.globalAlpha = alpha;
                canvas.fillRect(x, y, width, height);
                canvas.globalAlpha = 1;

                canvas.restore();
            }

            function setPosition(newX, newY) {
                x = newX;
                y = newY;
            }

            function getPosition() {
                return [x, y];
            }

            function setColor(newColor) {
                color = newColor;
            }

            function setAlpha(newAlpha) {
                alpha = newAlpha;
            }

            function resize(newWidth, newHeight) {
                width = newWidth;
                height = newHeight;
            }

            function getSize() {
                return [width, height];
            }

            return {
                draw: draw,
                setPosition: setPosition,
                setAlpha: setAlpha,
                resize: resize,
                getPosition: getPosition,
                getSize: getSize,
                setColor: setColor
            };

        }

        // Create New Objct
        this.fillRect = function (args, event) {
            args = args || {};
            event = event || {};

            var onDrag = event.onDrag || null,
                release = event.release || null,
                object;

            object = new FillRect(args);
            objects.push(object);

            if (onDrag) {
                events.push({
                    type: 'drag',
                    checkOnArea: function (x, y) {
                        var position = this.object.getPosition(),
                            size = this.object.getSize();

                        return (x >= position[0] && x <= position[0] + size[0]) && (y >= position[1] && y <= position[1] + size[1]);

                    },
                    callback: onDrag,
                    release: release,
                    object: object,
                    dragging: false,
                    offsetX: 0,
                    offsetY: 0
                });
            }

            return this;

        };

        // Bind Events
        function bindEvents() {

            $(self).mousedown(function (event) {
                var i, objEvent, position;

                for (i = 0; i < events.length; i += 1) {
                    objEvent = events[i];

                    if (objEvent.checkOnArea(event.offsetX, event.offsetY)) {
                        position = objEvent.object.getPosition();
                        objEvent.dragging = true;
                        objEvent.offsetX = event.offsetX - position[0];
                        objEvent.offsetY = event.offsetY - position[1];
                    }

                }
            });

            $(self).mouseup(function (event) {
                var i, objEvent, x, y, maxX, maxY;

                for (i = 0; i < events.length; i += 1) {
                    objEvent = events[i];
                    if (objEvent.dragging) {
                        objEvent.release(event, objEvent.object);
                    }
                    objEvent.dragging = false;
                }
            });

            $(self).mousemove(function (event) {
                var i, objEvent, x, y, maxX, maxY;

                for (i = 0; i < events.length; i += 1) {
                    objEvent = events[i];
                    if (objEvent.dragging) {
                        objEvent.callback(event, objEvent.object, {
                            x: objEvent.offsetX,
                            y: objEvent.offsetY
                        });
                    }
                }
            });
        }

        // Start Render
        this.render = function () {
            // Setting Canvas Size
            $(this).attr('width', width).attr('height', height);
            canvas = this[0].getContext('2d');

            bindEvents();
            updateFrame();

            return this;
        };

        return this;
    };

}(jQuery));
