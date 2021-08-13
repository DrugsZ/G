import type { DisplayObject } from '../DisplayObject';
import type { StylePropertyHandler } from '.';
import { inject, injectable } from 'inversify';
import type { vec2, vec3 } from 'gl-matrix';
import { SceneGraphService } from '../services';
import { parseTransform } from '../property-handlers/transform';
import { convertPercentUnit, convertAngleUnit } from '../property-handlers/dimension';

/**
 * @see /zh/docs/api/animation#支持变换的属性
 * 
 * support the following formats like CSS Transform:
 * 
 * scale
 * * scale(x, y)
 * * scaleX(x)
 * * scaleY(x)
 * * scaleZ(z)
 * * scale3d(x, y, z)
 * 
 * translate (unit: none, px, %(relative to its bounds))
 * * translate(x, y) eg. translate(0, 0) translate(0, 30px) translate(100%, 100%)
 * * translateX(0)
 * * translateY(0)
 * * translateZ(0)
 * * translate3d(0, 0, 0)
 * 
 * rotate (unit: deg rad turn)
 * * rotate(0.5turn) rotate(30deg) rotate(1rad)
 * 
 * unsupported for now:
 * * calc() eg. translate(calc(100% + 10px))
 * * matrix/matrix3d()
 * * skew/skewX/skewY
 * * perspective
 * * none
 */
@injectable()
export class TransformProperty implements StylePropertyHandler<string, string> {
  @inject(SceneGraphService)
  private sceneGraphService: SceneGraphService;

  update(oldValue: string, value: string, object: DisplayObject) {
    const result = parseTransform(value);
    result?.forEach(({ d, t }) => {
      if (t === 'scale') { // scale(1) scale(1, 1)
        // @ts-ignore
        object.setLocalScale(d[0], d[1], 1);
      } else if (t === 'scalex') {
        object.setLocalScale(d as unknown as number, 1, 1);
      } else if (t === 'scaley') {
        object.setLocalScale(1, d as unknown as number, 1);
      } else if (t === 'scalez') {
        object.setLocalScale(1, 1, d as unknown as number);
      } else if (t === 'scale3d') {
        // @ts-ignore
        object.setLocalScale(d[0], d[1], d[2]);
      } else if (t === 'translate') {
        object.setLocalPosition(
          convertPercentUnit(d[0], 0, object),
          convertPercentUnit(d[1], 1, object),
          0,
        );
      } else if (t === 'translatex') {
        object.setLocalPosition(
          convertPercentUnit(d[0], 0, object),
          0,
          0,
        );
      } else if (t === 'translatey') {
        object.setLocalPosition(
          0,
          convertPercentUnit(d[0], 1, object),
          0,
        );
      } else if (t === 'translatez') {
        object.setLocalPosition(0, 0, convertPercentUnit(d[0].px, 2, object));
      } else if (t === 'translate3d') {
        object.setLocalPosition(
          convertPercentUnit(d[0], 0, object),
          convertPercentUnit(d[1], 1, object),
          convertPercentUnit(d[2], 2, object)
        );
      } else if (t === 'rotate') {
        object.setLocalEulerAngles(convertAngleUnit(d[0]));
      } else if (t === 'rotatex') {

      } else if (t === 'rotatey') {

      } else if (t === 'rotatez') {

      } else if (t === 'rotate3d') {

      }
    });
  }
}