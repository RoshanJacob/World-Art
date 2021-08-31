class WorldCircleMouse {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  display() {
    fill(randC1, randC2, randC3);
    ellipseMode(RADIUS);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
}
