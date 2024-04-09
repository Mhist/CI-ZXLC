/**
 * 转换 cartesian3 坐标位 经纬度
 * @param cartesian3
 * @return {{latitude: number, longitude: number, height: number}}
 */
export function convertC3ToPosition(viewer, cartesian3) {
  let ellipsoid = viewer.scene.globe.ellipsoid;
  let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
  //获得海拔
  if (cartographic.height < 0) {
    cartographic.height = viewer.scene.globe.getHeight(cartographic);
  }
  console.log(viewer,cartesian3)
  return {
    longitude: Cesium.Math.toDegrees(cartographic.longitude),
    latitude: Cesium.Math.toDegrees(cartographic.latitude),
    height: cartographic.height
  };
}

/**
 * 计算两点间的偏航角
 * @param cartesian3_a
 * @param cartesian3_b
 * @return {Number}
 */
export function courseAngle(cartesian3_a, cartesian3_b) {
  let finalPosition = new Cesium.Cartesian3();
  let matrix4 = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian3_a);
  Cesium.Matrix4.inverse(matrix4, matrix4);
  Cesium.Matrix4.multiplyByPoint(matrix4, cartesian3_b, finalPosition);
  Cesium.Cartesian3.normalize(finalPosition, finalPosition);
  return Cesium.Math.toDegrees(Math.atan2(finalPosition.x, finalPosition.y));
}

/**
 * 判断是否点击在地球上
 * @param position
 */
export function judgeClickPosition(viewer, position) {
  let flag = true;
  if (!Cesium.defined(position)) {
    return false;
  }
  let ray = viewer.camera.getPickRay(position);
  if (!Cesium.defined(ray)) {
    return false;
  }
  if (flag) {
    return {
      pos: position,
      ray: ray
    };
  } else {
    return flag;
  }
}

/**
 * 判断是否点击到实体
 * @param scene
 * @param position
 * @return {boolean|*}
 */
export function judgeClickEntity(scene, position) {
  let flag = true;
  let pickedObject = scene.pick(position);
  if (!Cesium.defined(pickedObject) || !Cesium.defined(pickedObject.id)) {
    return false;
  }
  let entity = pickedObject.id;
  if (!flag) {
    return false;
  } else {
    return entity;
  }
}


/**
 * 获得一个UUID
 * @return {string}
 */
export function createUUID() {
  let len = 32;
  let radix = 16;
  let chars = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'.split("");
  let uuid = [];
  radix = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

export function createPoint(viewer, worldPosition, color) {
  let useColor = Cesium.Color.WHITE;
  if (!color) {
    useColor = color;
  }
  let point = viewer.entities.add({
    position : worldPosition,
    point : {
      color : useColor,
      pixelSize : 5,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
  return point;
}
