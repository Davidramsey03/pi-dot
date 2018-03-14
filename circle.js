function Circle(tempX, tempY, tempPi, tempNextPi) {
  this.x = tempX;
  this.y = tempY;
  //width of circle based on number of columns, but constrained
  this.r = w / colInp.value() / 4;
  this.r = constrain(this.r, 12, 24);
  //current digit of pi
  this.digit = int(tempPi);
  //next digit of pi
  this.nextDigit = int(tempNextPi);

  //default stroke and fill to same as canvas BG, only shown if you have more circles than available digits of pi
  this.c = color(15);
  this.s = color(15);


  this.show = function() {
    //proportionally set the strokeWeight to something nice
    strokeWeight(this.r / 6);
    //Set fill based on NEXT digit of p i
    this.setFill(this.nextDigit);
    fill(this.c);
    //Set stroke based on CURRENT digit of pi
    this.setStroke(this.digit);
    stroke(this.s);
    //Draw the circle
    ellipse(this.x, this.y, this.r);


  }

  //Specify colors based on digit passed in
  this.setFill = function(num) {
      switch (num) {
        case 0:
            this.c = color(255, 243, 30);
            break;
        case 1:
            this.c = color(250, 100, 0);
            break;
        case 2:
            this.c = color(30, 127, 255);
            break;
        case 3:
            this.c = color(244, 0, 0);
            break;
        case 4:
            this.c = color(100, 220, 40);
            break;
        case 5:
            this.c = color(150, 30, 255);
            break;
        case 6:
            this.c = color(255, 30, 255);
            break;
        case 7:
            this.c = color(30, 245, 255);
            break;
        case 8:
            this.c = color(60, 20, 140);
            break;
        case 9:
            this.c = color(0, 50, 200);
            break;
      }
  }

  //Specify colors based on digit passed in
  this.setStroke = function(num) {
      switch (num) {
        case 0:
            this.s = color(255, 243, 30);
            break;
        case 1:
            this.s = color(250, 100, 0);
            break;
        case 2:
            this.s = color(30, 127, 255);
            break;
        case 3:
            this.s = color(244, 0, 0);
            break;
        case 4:
            this.s = color(100, 220, 40);
            break;
        case 5:
            this.s = color(150, 30, 255);
            break;
        case 6:
            this.s = color(255, 30, 255);
            break;
        case 7:
            this.s = color(30, 245, 255);
            break;
        case 8:
            this.s = color(60, 20, 140);
            break;
        case 9:
            this.s = color(0, 50, 200);
            break;
      }
  }


  this.nearDuplicates = function(other) {
      //Set the overlap distance to whichever is farther, the row spacing or column spacing
      var distToCheck = max( w / int(colInp.value()) + 1, w / int(rowInp.value()) + 1 ) + (this.r * 2);
      // Lines below display some semblance of the distance your checking, for testing or visualising
      // rectMode(CENTER);
      // stroke(this.s);
      // strokeWeight(1);
      // noFill();
      // ellipse(this.x, this.y, distToCheck*2);

      //Loop through all the circles, checking for their distance from THIS circle
      for (var i = 0; i < circles.length; i++) {
          var d = dist(this.x, this.y, circles[i].x, circles[i].y);
          //If it's close enough, but it's not the current circle (will find itself otherwise)
          if (d > this.r && d < distToCheck ) {
              //Check if it's digit of pi is the same as mine. If it is, draw a line to it with a matching color.
              if (circles[i].digit == this.digit) {
                strokeWeight(this.r / 6);
                noFill();
                stroke(this.s);
                line(this.x, this.y, circles[i].x, circles[i].y);
              }
          }
      }

  }


}
