import { Polygram } from './polygram';

describe('Polygram', () => {
  it('should create an instance', () => {
    expect(new Polygram(0, {x: 0, y: 0}, 0)).toBeTruthy();
  });
});
