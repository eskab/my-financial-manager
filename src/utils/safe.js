const hasKey = (object, key) => key in object;
const isPresent = object => typeof object !== "undefined" && object !== null;
const isObject = object => object && typeof object === "object";

function valueCheck(value) {
  if (!hasKey(this, "value")) {
    return value;
  }
  return this.value;
}

const valueOr = object => new Proxy({ ...object, valueOr: valueCheck }, {
  get: (target, name) => {
    if (hasKey(target, name)) {
      return target[name];
    }

    return valueOr();
  }
});

// Draft version
// Todo: predicates & refactor below

const safe = object => new Proxy(object, {
  get: (target, name) => {
    if (hasKey(target, name)) {
      if (Array.isArray(target[name])) {
        return valueOr({ value: target[name] });
      }

      if (isObject(target[name])) {
        return safe(target[name]);
      }

      if (isPresent(target[name])) {
        return valueOr({ value: target[name] });
      }

      return valueOr();
    }
    return valueOr();
  }
});

export { safe };
