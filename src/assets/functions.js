export function paths() {
  const path = {
    pointerBumper: [
      [
        { x: 117, y: 181 },
        { x: 115, y: 169 },
        { x: 32, y: 10 },
        { x: 0, y: 15 },
        { x: 0, y: 163 },
        { x: 14, y: 175 },
        { x: 95, y: 193 },
        { x: 108, y: 191 },
      ],
    ],
    rightPointerBumper: [
      [
        { x: 11, y: 191 },
        { x: 26, y: 192 },
        { x: 109, y: 173 },
        { x: 121, y: 162 },
        { x: 88, y: 12 },
        { x: 4, y: 171 },
        { x: 5, y: 181 },
      ],
    ],
    topBumper: [
      [
        { x: 48, y: 114 },
        { x: 93, y: 102 },
        { x: 114, y: 66 },
        { x: 108, y: 30 },
        { x: 67, y: 0 },
        { x: 47, y: 0 },
        { x: 0, y: 48 },
        { x: 12, y: 93 },
        { x: 15, y: 17 },
        { x: 0, y: 48 },
      ],
    ],
    topHalfMoon: [
      [
        { x: 800, y: 228 },
        { x: 800, y: 0 },
        { x: 682, y: 129 },
        { x: 4, y: 227 },
        { x: 94, y: 148 },
        { x: 0, y: 0 },
        { x: 94, y: 148 },
        { x: 196, y: 82 },
        { x: 0, y: 0 },
        { x: 682, y: 129 },
        { x: 800, y: 0 },
        { x: 588, y: 73 },
        { x: 196, y: 82 },
        { x: 277, y: 48 },
        { x: 0, y: 0 },
        { x: 588, y: 73 },
        { x: 800, y: 0 },
        { x: 479, y: 37 },
        { x: 277, y: 48 },
        { x: 375, y: 29 },
        { x: 0, y: 0 },
        { x: 800, y: 0 },
        { x: 0, y: 0 },
        { x: 479, y: 37 },
        { x: 6, y: 227 },
        { x: 46, y: 188 },
        { x: 0, y: 0 },
        { x: 1, y: 228 },
        { x: 46, y: 188 },
        { x: 94, y: 148 },
        { x: 0, y: 0 },
        { x: 94, y: 148 },
        { x: 143, y: 113 },
        { x: 0, y: 0 },
        { x: 143, y: 113 },
        { x: 190, y: 85 },
        { x: 0, y: 0 },
        { x: 190, y: 85 },
        { x: 241, y: 61 },
        { x: 0, y: 0 },
        { x: 241, y: 61 },
        { x: 280, y: 47 },
        { x: 0, y: 0 },
        { x: 280, y: 47 },
        { x: 328, y: 35 },
        { x: 0, y: 0 },
        { x: 795, y: 227 },
        { x: 800, y: 228 },
        { x: 800, y: 0 },
        { x: 746, y: 180 },
        { x: 746, y: 180 },
        { x: 800, y: 0 },
        { x: 686, y: 132 },
        { x: 686, y: 132 },
        { x: 800, y: 0 },
        { x: 635, y: 98 },
        { x: 635, y: 98 },
        { x: 800, y: 0 },
        { x: 580, y: 70 },
        { x: 580, y: 70 },
        { x: 800, y: 0 },
        { x: 546, y: 56 },
        { x: 546, y: 56 },
        { x: 800, y: 0 },
        { x: 484, y: 38 },
        { x: 484, y: 38 },
        { x: 800, y: 0 },
        { x: 428, y: 30 },
        { x: 800, y: 0 },
        { x: 0, y: 0 },
        { x: 375, y: 29 },
        { x: 428, y: 30 },
        { x: 328, y: 35 },
        { x: 375, y: 29 },
        { x: 0, y: 0 },
      ],
    ],
  };
  return path;
}

export function collisionGroupCollection() {}

export function collisionGroups(_this, group) {
  _this.setCollisionGroup(group);
  _this.setCollidesWith([2, 4, 8]);

  return _this;
}