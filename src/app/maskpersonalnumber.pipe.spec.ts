import { MaskpersonalnumberPipe } from './maskpersonalnumber.pipe';

describe('MaskpersonalnumberPipe', () => {
  it('create an instance', () => {
    const pipe = new MaskpersonalnumberPipe();
    expect(pipe).toBeTruthy();
  });
});
