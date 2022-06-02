# Canvas

[all methods](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## [Drawing shapes with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

### [Rect](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_rectangles)

**fillRect(x, y, width, height)** - Draws a filled rectangle.

**strokeRect(x, y, width, height)** - Draws a rectangular outline.

**clearRect(x, y, width, height)** - Clears the specified rectangular area, making it fully transparent.

### [Paths](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_paths)

**beginPath()** - Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.

**moveTo(x, y)** - Moves the pen to the coordinates specified by x and y.

**lineTo(x, y)** - Draws a line from the current drawing position to the position specified by x and y.

**arcTo(x1, y1, x2, y2, radius)** - Draws an arc with the given control points and radius, connected to the previous point by a straight line.

**arc(x, y, radius, startAngle, endAngle, counterclockwise)** - Draws an arc which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction indicated by counterclockwise (defaulting to clockwise - false).

```
ctx.arc(75, 75, 35, 0, Math.PI * 2, false); // circle
ctx.arc(75, 75, 35, 0, Math.PI, false); // semicircle
ctx.arc(75, 75, 35, 0, (Math.PI/180)*45, false) //45 degrees
```

**quadraticCurveTo(cp1x, cp1y, x, y)** - Draws a quadratic Bézier curve from the current pen position to the end point specified by x and y, using the control point specified by cp1x and cp1y.

**bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)** - Draws a cubic Bézier curve from the current pen position to the end point specified by x and y, using the control points specified by (cp1x, cp1y) and (cp2x, cp2y).

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes/canvas_quadratic.png)

```
ctx.beginPath();
ctx.moveTo(75, 25);
ctx.quadraticCurveTo(25, 25, 25, 62.5);
ctx.quadraticCurveTo(25, 100, 50, 100);
ctx.quadraticCurveTo(50, 120, 30, 125);
ctx.quadraticCurveTo(60, 120, 65, 100);
ctx.quadraticCurveTo(125, 100, 125, 62.5);
ctx.quadraticCurveTo(125, 25, 75, 25);
ctx.stroke();
```

**closePath()** - Adds a straight line to the path, going to the start of the current sub-path.

**stroke()**- Draws the shape by stroking its outline.

**fill()** - Draws a solid shape by filling the path's content area.

*Note: When you call fill(), any open shapes are closed automatically, so you don't have to call closePath(). This is not the case when you call stroke().*

### [Path2D objects](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#path2d_objects)

The **Path2D()** constructor returns a newly instantiated Path2D object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of SVG path data.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes/path2d.png)

```
var rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

var circle = new Path2D();
circle.arc(100, 35, 25, 0, 2 * Math.PI);

ctx.stroke(rectangle);
ctx.fill(circle);
```

you olso can use svg:
```
var p = new Path2D('M10 10 h 80 v 80 h -80 Z'); //svg
ctx.stroke(p);
```

## [Applying styles and colors](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)

### [Colors](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#colors)

**fillStyle = color** - Sets the style used when filling shapes.

**strokeStyle = color** - Sets the style for shapes' outlines.

The color can be:
```
ctx.fillStyle = 'orange';
ctx.fillStyle = '#FFA500';
ctx.fillStyle = 'rgb(255, 165, 0)';
ctx.fillStyle = 'rgba(255, 165, 0, 1)';
```

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas_strokestyle.png)

```
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' + Math.floor(255 - 42.5 * j) + ')';
        ctx.beginPath();
        ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
```

### [Transparency](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#transparency)

**globalAlpha = transparencyValue** - Applies the specified transparency value to all future shapes drawn on the canvas. The value must be between 0.0 (fully transparent) to 1.0 (fully opaque). This value is 1.0 (fully opaque) by default.
```
ctx.globalAlpha = 0.2;
```

The globalAlpha property can be useful if you want to draw a lot of shapes on the canvas with similar transparency, but otherwise it's generally more useful to set the transparency on individual shapes when setting their colors.
```
ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
```

### [Line styles](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#line_styles)

**lineWidth = value** - Sets the width of lines drawn in the future.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas_linewidth.png)

```
for (var i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
```

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas-grid.png)

*Obtaining crisp lines requires understanding how paths are stroked. If you consider a path from (3,1) to (3,5) with a line thickness of 1.0, you end up with the situation in the second image. The actual area to be filled (dark blue) only extends halfway into the pixels on either side of the path. An approximation of this has to be rendered, which means that those pixels being only partially shaded, and results in the entire area (the light blue and dark blue) being filled in with a color only half as dark as the actual stroke color. This is what happens with the 1.0 width line in the previous example code.*

*To fix this, you have to be very precise in your path creation. Knowing that a 1.0 width line will extend half a unit to either side of the path, creating the path from (3.5,1) to (3.5,5) results in the situation in the third image—the 1.0 line width ends up completely and precisely filling a single pixel vertical line.*

**lineCap = type** - Sets the appearance of the ends of lines.

The lineCap property determines how the end points of every line are drawn. There are three possible values for this property and those are: butt, round and square. By default this property is set to butt:

**butt** - The ends of lines are squared off at the endpoints.
**round** - The ends of lines are rounded.
**square** - The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/Canvas_linecap.png)

```
var lineCap = ['butt', 'round', 'square'];

  // Draw guides
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();

  // Draw lines
  ctx.strokeStyle = 'black';
  for (var i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  }
```

**lineJoin = type** - Sets the appearance of the "corners" where lines meet.

The lineJoin property determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the same position, are skipped).

**round** - Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to half the line width.
**bevel** - Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.
**miter** - Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area. This setting is effected by the miterLimit property which is explained below.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/Canvas_linejoin.png)

```
var lineJoin = ['round', 'bevel', 'miter'];
  ctx.lineWidth = 10;
  for (var i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * 40);
    ctx.lineTo(35, 45 + i * 40);
    ctx.lineTo(75, 5 + i * 40);
    ctx.lineTo(115, 45 + i * 40);
    ctx.lineTo(155, 5 + i * 40);
    ctx.stroke();
  }
```

**miterLimit = value** - The miterLimit property determines how far the outside connection point can be placed from the inside connection point. If two lines exceed this value, a bevel join gets drawn instead

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas_miterlimit.png)

```
// Clear canvas
  ctx.clearRect(0, 0, 150, 150);

  // Draw guides
  ctx.strokeStyle = '#09f';
  ctx.lineWidth   = 2;
  ctx.strokeRect(-5, 50, 160, 50);

  // Set line styles
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 10;

  // check input
  if (document.getElementById('miterLimit').value.match(/\d+(\.\d+)?/)) {
    ctx.miterLimit = parseFloat(document.getElementById('miterLimit').value);
  } else {
    alert('Value must be a positive number');
  }

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(0, 100);
  for (i = 0; i < 24 ; i++) {
    var dy = i % 2 == 0 ? 25 : -25;
    ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
  }
  ctx.stroke();
  return false;
```

### [Using line dashes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#using_line_dashes)

**getLineDash()** - Returns the current line dash pattern array containing an even number of non-negative numbers.

**setLineDash(segments)** - Sets the current line dash pattern.

**lineDashOffset = value** - Specifies where to start a dash array on a line.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/marching-ants.png)

```
var offset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();
```

### [Gradients](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#gradients)

**createLinearGradient(x1, y1, x2, y2)** - Creates a linear gradient object with a starting point of (x1, y1) and an end point of (x2, y2).

**createRadialGradient(x1, y1, r1, x2, y2, r2)** - Creates a radial gradient. The parameters represent two circles, one with its center at (x1, y1) and a radius of r1, and the other with its center at (x2, y2) with a radius of r2.

**createConicGradient(angle, x, y)** - Creates a conic gradient object with a starting angle of angle in radians, at the position (x, y).

Once we've created a CanvasGradient object we can assign colors to it by using the addColorStop() method.

**gradient.addColorStop(position, color)** - Creates a new color stop on the gradient object. The position is a number between 0.0 and 1.0 and defines the relative position of the color in the gradient, and the color argument must be a string representing a CSS color, indicating the color the gradient should reach at that offset into the transition.

```
var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
lineargradient.addColorStop(0, 'white');
lineargradient.addColorStop(1, 'black');
ctx.fillStyle = lineargradient;
ctx.fillRect(20, 20, 300, 200);
```

### [Pattern](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#patterns)

**createPattern(image, type)** - Creates and returns a new canvas pattern object. image is a CanvasImageSource (that is, an HTMLImageElement, another canvas, a video element, or the like. type is a string indicating how to use the image.

**repeat** - Tiles the image in both vertical and horizontal directions.
**repeat-x** - Tiles the image horizontally but not vertically.
**repeat-y** - Tiles the image vertically but not horizontally.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/canvas_createpattern.png)

```
// create new image object to use as pattern
    var img = new Image();
    img.src = 'canvas_createpattern.png';
    img.onload = function() {

    // create pattern
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);

  }
```

### [Shadows](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#shadows)

**shadowOffsetX = float** - Indicates the horizontal distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0.

**shadowOffsetY = float** - Indicates the vertical distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0. 

**shadowBlur = float** - Indicates the size of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0.

**shadowColor = color** - A standard CSS color value indicating the color of the shadow effect; by default, it is fully-transparent black.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/shadowed-string.png)

```
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

ctx.font = '20px Times New Roman';
ctx.fillStyle = 'Black';
ctx.fillText('Sample String', 5, 30);
```

### [Canvas fill rulles](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#canvas_fill_rules)

When using fill (or clip and isPointInPath) you can optionally provide a fill rule algorithm by which to determine if a point is inside or outside a path and thus if it gets filled or not. This is useful when a path intersects itself or is nested.

**"nonzero"**: The non-zero winding rule, which is the default rule.
**"evenodd"**: The even-odd winding rule.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors/fill-rule.png)

```
ctx.beginPath();
ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
ctx.fill('evenodd');
```

## [Drawing text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text)

The canvas rendering context provides two methods to render text:

**fillText(text, x, y [, maxWidth])** - Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.

**strokeText(text, x, y [, maxWidth])** - Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw.

### [Styling text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text#styling_text)

**font = value** - The current text style being used when drawing text. This string uses the same syntax as the CSS font property. The default font is 10px sans-serif.

**textAlign = value** - Text alignment setting. Possible values: start, end, left, right or center. The default value is start.

**textBaseline = value** - Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.

**direction = value** - Directionality. Possible values: ltr, rtl, inherit. The default value is inherit.

## [Using images](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images)

If you want to use image you need to create new HTMLImageElement objects in your script. To do this, you can use the convenient Image() constructor:

```
var img = new Image();   // Create new img element
img.src = 'myImage.png'; // Set source path
```
When this script gets executed, the image starts loading.

If you try to call drawImage() before the image has finished loading, it won't do anything (or, in older browsers, may even throw an exception). So you need to be sure to use the load event so you don't try this before the image has loaded:

```
var img = new Image();   // Create new img element
img.addEventListener('load', function() {
  // execute drawImage statements here
}, false);
img.src = 'myImage.png'; // Set source path
```

**drawImage(image, x, y)** - Draws the CanvasImageSource specified by the image parameter at the coordinates (x, y).

**drawImage(image, x, y, width, height)** - This adds the width and height parameters, which indicate the size to which to scale the image when drawing it onto the canvas.

**drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)** - Given an image, this function takes the area of the source image specified by the rectangle whose top-left corner is (sx, sy) and whose width and height are sWidth and sHeight and draws it into the canvas, placing it on the canvas at (dx, dy) and scaling it to the size specified by dWidth and dHeight.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images/canvas_backdrop.png)

```
var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'backdrop.png';
}
```

## [Transformations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations)

### [Saving and restoring state](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#saving_and_restoring_state)

**save()** - Saves the entire state of the canvas.

**restore()** - Restores the most recently saved canvas state.

Canvas states are stored on a stack. Every time the save() method is called, the current drawing state is pushed onto the stack.

You can call the save() method as many times as you like. Each time the restore() method is called, the last saved state is popped off the stack and all saved settings are restored.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations/canvas_savestate.png)

```
ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle with default settings
ctx.save();                  // Save the default state

ctx.fillStyle = '#09F';      // Make changes to the settingsctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

ctx.save();                  // Save the current state
ctx.fillStyle = '#FFF';      // Make changes to the settings
ctx.globalAlpha = 0.5;
ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

ctx.restore();               // Restore previous state
ctx.fillRect(45, 45, 60, 60);   // Draw a rectangle with restored settings

ctx.restore();               // Restore original state
ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with restored settings
```

### [Translating](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#translating)

**translate(x, y)** - Moves the canvas and its origin on the grid. x indicates the horizontal distance to move, and y indicates how far to move the grid vertically.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations/translate.png)

```
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    ctx.save();
    ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
    ctx.translate(10 + j * 50, 10 + i * 50);
    ctx.fillRect(0, 0, 25, 25);
    ctx.restore();
  }
}
```

### [Rotating](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#rotating)

**rotate(angle)** - Rotates the canvas clockwise around the current origin by the angle number of radians.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations/rotate.png)

```
 // left rectangles, rotate from canvas origin
  ctx.save();
  // blue rect
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25);
  // grey rect
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(30, 30, 100, 100);
  ctx.restore();

  // right rectangles, rotate from rectangle center
  // draw blue rect
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(150, 30, 100, 100);

  ctx.translate(200, 80); // translate to rectangle center
                          // x = x + 0.5 * width
                          // y = y + 0.5 * height
  ctx.rotate((Math.PI / 180) * 25); // rotate
  ctx.translate(-200, -80); // translate back

  // draw grey rect
  ctx.fillStyle = '#4D4E53';
  ctx.fillRect(150, 30, 100, 100);
```

### [Scaling](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#scaling)

**scale(x, y)** - Scales the canvas units by x horizontally and by y vertically. Both parameters are real numbers. Values that are smaller than 1.0 reduce the unit size and values above 1.0 increase the unit size. Values of 1.0 leave the units the same size.

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations/scale.png)

```
ctx.save();
ctx.scale(10, 3);
ctx.fillRect(1, 10, 10, 10);
ctx.restore();

// mirror horizontally
ctx.scale(-1, 1);
ctx.font = '48px serif';
ctx.fillText('MDN', -135, 120);
```

### [Transform](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#transforms)

**transform(a, b, c, d, e, f)** - Multiplies the current transformation matrix with the matrix described by its arguments. The transformation matrix is described by:

  [a c e]
  [b d f]
  [0 0 1]

If any of the arguments are Infinity the transformation matrix must be marked as infinite instead of the method throwing an exception.

## [Compositing and clipping](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing)

### [globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing#globalcompositeoperation)

We can not only draw new shapes behind existing shapes but we can also use it to mask off certain areas, clear sections from the canvas (not limited to rectangles like the clearRect() method does) and more.

**globalCompositeOperation = type** - This sets the type of compositing operation to apply when drawing new shapes, where type is a string identifying which of the twelve compositing operations to use.

### [Clipping paths](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing#clipping_paths)

![image](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing/canvas_clipping_path.png)

clip() - Turns the path currently being built into the current clipping path.

*You use clip() instead of closePath() to close a path and turn it into a clipping path instead of stroking or filling the path.*
