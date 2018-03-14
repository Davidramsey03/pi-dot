//width and height for canvas
var w;
var h;

//canvas
var cnv;

//inputs for changing numbers on the fly
var rowInp;
var colInp;

//1000 digits of pi
var digitsPi = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198";
//array, will put pi digits in this
var piDigits = [];

//circle objects
var circles = [];

//tracks current index of pi for iterating
var piIndex = 0;


function setup() {
  //make canvas half of screen width and full height, with constraints
  w = windowWidth/2;
  w = constrain(w, 350, 800);
  h = windowHeight;
  cnv = createCanvas(w, h);
  //center convas horizontally
  cnv.position(windowWidth/2-(cnv.width/2), 0);

  //Add row and column inputs and labels
  rowInp = createInput(8);
  rowLabel = createElement('p', 'Rows');
  colInp = createInput(8);
  colLabel = createElement('p', 'Columns');
  //Add Save button
  saveBtn = createButton("Save Image");
  saveBtn.mousePressed(saveImage);
  //assign id to input
  rowInp.id('rows');
  colInp.id('cols');
  //recalculate rows and columns whenever row or columns input changes
  rowInp.input(makeRowsColumns);
  colInp.input(makeRowsColumns);

  //build pi array from the provided string
  for (var i = 0; i < digitsPi.length; i++) {
    piDigits.push(digitsPi[i]);
  }

  //Initial build of circles
  makeRowsColumns();

}

function draw() {
  background(15);

  //Check for circles nearby that have same value first (draws line between them, and we want it beneath the circles, so we do this first)
  for (var i = 0; i < circles.length; i++) {
    circles[i].nearDuplicates();
  }

  //Show all the circles
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
  }
}

function makeRowsColumns() {
  //empty the circles array
  circles.length = 0;
  //start tracking which index we're att
  piIndex = 0;

  //loop through all the rows and columns needed, set x and y location of each circle, and add the circle
  for (var i = 1; i <= rowInp.value(); i++) {
    for (j = 1; j <= colInp.value(); j++) {
      var spacingX = w / (int(colInp.value()) + 1);
      var circleX = (spacingX * j);
      var spacingY = h / (int(rowInp.value()) + 1);
      var circleY = (spacingY * i);
      //adds the circle, passing in location and both current digit of pi AND the next digit of pi (for coloring)
      circles.push(new Circle(circleX, circleY, digitsPi[piIndex], digitsPi[piIndex + 1]));
      //increment the tracking variable
      piIndex++;
    }
  }
}

//Save jpg of canvas
function saveImage() {
  save(cnv, 'pi_image.jpg');
}

//Resize and re-center canvas on window resize
function windowResized() {
  w = windowWidth/2;
  w = constrain(w, 350, 800);
  h = windowHeight;
  resizeCanvas(w, h);
  cnv.position(windowWidth/2-(cnv.width/2), 0);
  makeRowsColumns();
}
