var place = require("./place");
var exc = require("./exceptions");
var request = require("request");

var _object_index = {};

function _conv_object(obj, client, inverse) {
  var new_obj;
  var _iter;

  if (Array.isArray(obj)) {
    new_obj = [];
    _iter = obj;
  } else {
    new_obj = {};
    _iter = Object.keys(obj);
  }
  for (var i = 0; i < _iter.length; i++) {
    var key;
    var val;

    if (!Array.isArray(obj)) {
      key = _iter[i];
    } else {
      key = i;
    }
    val = obj[key];

    if (inverse) {
      if (val._obj) {
        val = new_obj[key] = val._obj;
      }
    } else if (typeof val == "object" && val && "object" in val) {
      for (var resource in resources) {
        if (val["object"] != resource.object_type) {
          continue;
        }

        val = new_obj[key] = new resource(obj, client);
        break;
      }
    }
    if (val && typeof val == "object") {
      new_obj[key] = _conv_object(val, client, inverse);
    } else {
      new_obj[key] = val;
    }
  }
  return new_obj;
}

class APIResource {
  constructor(obj, client) {
    this._client = client || place.default_client;
    this._set_obj(obj);
    return new Proxy(this, {
      get: function (target, key, receiver) {
        if (key in target._obj) return target._obj[key];
        return Reflect.get(target, key, receiver);
      },
    });
  }

  _set_obj(obj) {
    this._obj = obj;
    this._obj = _conv_object(this._obj, this._client);
    if ("id" in obj) _object_index[obj.id] = this;
  }

  json(self) {
    return JSON.stringify(_conv_object(this._obj, null, true));
  }

  update(updates) {
    this.constructor.request("put", {
      id: this.id,
      json: updates,
    });
  }

  delete() {
    this.constructor.request("delete", {
      id: this.id,
    });
  }
}

APIResource.request = function (method, params) {
  var $class = this;
  var path = params.path || $class.resource;
  var client = params.client || place.default_client;
  if (params.id) path += "/" + params.id;
  var url = client.api_url + path.trim("/");

  return new Promise(function (resolve, reject) {
    try {
      request[method](
        {
          url: url,
          qs: params.params,
          json: true,
          body: params.json,
          auth: {
            user: client.api_key,
            pass: "",
          },
          headers: {
            "X-API-Version": "v2.5",
          },
        },
        function (error, response, body) {
          if (error) {
            reject(error);
            return;
          }
          var status_code = response.statusCode;
          var obj;

          try {
            if (typeof body == "object") {
              obj = body;
            } else {
              obj = JSON.parse(body);
            }
          } catch (e) {
            if (status_code === 500) {
              reject(new exc.InternalError());
              return;
            }
            reject(new exc.InvalidResponse());

            return;
          }

          if (Array.isArray(obj)) {
            reject(new exc.InvalidResponse());
            return;
          }

          var object_type = obj.object;
          if (!object_type) {
            reject(
              new exc.InvalidResponse('Response missing "object" attribute')
            );
            return;
          }

          if (status_code != 200) {
            if (object_type != "error") {
              reject(new exc.InvalidResponse("Expected error object"));
              return;
            }

            for (var e in exc) {
              e = exc[e];
              if (e.status_code != status_code) continue;
              if (e.error_type && e.error_type != obj.error_type) continue;
              reject(new e(obj.error_description, obj));
              return;
            }

            reject(new exc.APIException(obj.error_description, obj));
          }

          if (object_type == "list")
            resolve(
              obj.values.map(function (o) {
                return new $class(o, client);
              })
            );
          else {
            resolve(new $class(obj, client));
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

APIResource.get = function (id, update, params) {
  if (update)
    return this.request("put", {
      id: id,
      json: update,
      params: params,
    });
  return this.request("get", {
    id: id,
    params: params,
  });
};

APIResource.select = function (options) {
  var update_all = options.update_all;
  var delete_all = options.delete_all;
  delete options.update_all;
  delete options.delete_all;
  if (update_all)
    return this.request("put", {
      params: options,
      json: update_all,
    });
  if (delete_all)
    return this.request("delete", {
      params: options,
    });
  return this.request("get", {
    params: options,
  });
};

APIResource.create = function (obj) {
  if (Array.isArray(obj))
    obj = {
      object: "list",
      values: obj,
    };
  obj = _conv_object(obj, null, true);
  return this.request("post", {
    json: obj,
  });
};

APIResource.update_all = function (objects, params) {
  var updates = [];
  for (var i = 0; i < objects.length; i++) {
    updates.push(objects[i][1]);
    objects[i][1].id = objects[i][0].id;
  }
  return this.request("put", {
    json: {
      object: "list",
      values: updates,
    },
    params: params,
  });
};

APIResource.delete_all = function (objects) {
  var deletes = objects
    .map(function (o) {
      return o.id;
    })
    .join("|");
  return this.request("delete", {
    params: {
      id: deletes,
    },
  });
};

module.exports = APIResource;

var resources = require("./resources");
