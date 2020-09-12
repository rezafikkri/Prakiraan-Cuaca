/*!
 * CV Reza v2
 * Copyright (c) 2020 Reza Sariful Fikri
*/
define(function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Object to convert XML into a structured JSON object
   *
   * @class XmlToJson
   */
  var XmlToJson = /*#__PURE__*/function () {
    function XmlToJson(xml) {
      _classCallCheck(this, XmlToJson);

      if (xml) {
        return this.parse(xml);
      }
    }
    /**
        * Adds an object value to a parent object
        *
        * @method addToParent
        * @param {Object} parent
        * @param {String} nodeName
        * @param {Mixed} obj
        * @return none
        */


    _createClass(XmlToJson, [{
      key: "addToParent",
      value: function addToParent(parent, nodeName, obj) {
        // If this is the first or only instance of the node name, assign it as
        // an object on the parent.
        if (!parent[nodeName]) {
          parent[nodeName] = obj;
        } // Else the parent knows about other nodes of the same name
        else {
            // If the parent has a property with the node name, but it is not an array,
            // store the contents of that property, convert the property to an array, and
            // assign what was formerly an object on the parent to the first member of the
            // array
            if (!Array.isArray(parent[nodeName])) {
              var tmp = parent[nodeName];
              parent[nodeName] = [];
              parent[nodeName].push(tmp);
            } // Push the current object to the collection


            parent[nodeName].push(obj);
          }
      }
    }, {
      key: "convertXMLStringToDoc",
      value: function convertXMLStringToDoc(str) {
        var xmlDoc = null;

        if (str && typeof str === 'string') {
          // Create a DOMParser
          var parser = new DOMParser(); // Use it to turn your xmlString into an XMLDocument

          xmlDoc = parser.parseFromString(str, 'application/xml');
        }

        return xmlDoc;
      }
      /**
       * Validates if an data is an XMLDocument
       *
       * @method isXML
       * @param {Mixed} data
       * @return {Boolean}
       */

    }, {
      key: "isXML",
      value: function isXML(data) {
        var documentElement = (data ? data.ownerDocument || data : 0).documentElement;
        return documentElement ? documentElement.nodeName.toLowerCase() !== 'html' : false;
      }
      /**
       * Sends a chunk of XML to be parsed
       *
       * @method parse
       * @param {XMLXtring} xml
       * @return {JSON | Null}
       */

    }, {
      key: "parse",
      value: function parse(xml) {
        if (xml && typeof xml === 'string') {
          xml = this.convertXMLStringToDoc(xml);
        }

        return xml && this.isXML(xml) ? this.parseNode({}, xml.firstChild) : null;
      }
      /**
       * Reads through a node's attributes and assigns the values to a new object
       *
       * @method parseAttributes
       * @param {XMLNode} node
       * @return {Object}
       */

    }, {
      key: "parseAttributes",
      value: function parseAttributes(node) {
        var attributes = node.attributes,
            obj = {}; // If the node has attributes, assign the new object properties
        // corresponding to each attribute

        if (node.hasAttributes()) {
          for (var i = 0; i < attributes.length; i++) {
            obj[attributes[i].name] = this.parseValue(attributes[i].value);
          }
        } // return the new object


        return obj;
      }
      /**
       * Rips through child nodes and parses them
       *
       * @method parseChildren
       * @param {Object} parent
       * @param {XMLNodeMap} childNodes
       * @return none
       */

    }, {
      key: "parseChildren",
      value: function parseChildren(parent, childNodes) {
        // If there are child nodes...
        if (childNodes.length > 0) {
          // Loop over all the child nodes
          for (var i = 0; i < childNodes.length; i++) {
            // If the child node is a XMLNode, parse the node
            if (childNodes[i].nodeType == 1) {
              this.parseNode(parent, childNodes[i]);
            }
          }
        }
      }
      /**
       * Converts a node into an object with properties
       *
       * @method parseNode
       * @param {Object} parent
       * @param {XMLNode} node
       * @return {Object}
       */

    }, {
      key: "parseNode",
      value: function parseNode(parent, node) {
        var nodeName = node.nodeName,
            obj = Object.assign({}, this.parseAttributes(node));
   // If there is only one text child node, there is no need to process the children

        if (node.childNodes.length == 1 && node.childNodes[0].nodeType == 3) {
          // If the node has attributes, then the object will already have properties.
          // Add a new property 'text' with the value of the text content
          if (node.hasAttributes()) {
            obj['text'] = this.parseValue(node.childNodes[0].nodeValue);
          } // If there are no attributes, then the parent[nodeName] property value is
          // simply the interpreted textual content
          else {
              obj = this.parseValue(node.childNodes[0].nodeValue);
            }
        } // Otherwise, there are child XMLNode elements, so process them
        else {
            this.parseChildren(obj, node.childNodes);
          } // Once the object has been processed, add it to the parent


        this.addToParent(parent, nodeName, obj); // Return the parent

        return parent;
      }
    }, {
      key: "parseValue",

      /**
       * Interprets a value and converts it to Boolean, Number or String based on content
       *
       * @method parseValue
       * @param {Mixed} val
       * @return {Mixed}
       */
      value: function parseValue(val) {
        // Create a numeric value from the passed parameter
        var num = Number(val); // If the value is 'true' or 'false', parse it as a Boolean and return it

        if (val.toLowerCase() === 'true' || val.toLowerCase() === 'false') {
          return val.toLowerCase() == 'true';
        } // If the num parsed to a Number, return the numeric value
        // Else if the valuse passed has no length (an attribute without value) return null,
        // Else return the param as is


        return isNaN(num) ? val : val.length == 0 ? null : num;
      }
    }]);

    return XmlToJson;
  }();

  var selectCustomOption = document.querySelector("div.select-custom__option");
  var inputProvinsi = document.querySelector('input[name="provinsi"]'); // select custom

  document.querySelector('a.select-custom__btn').addEventListener('click', function (e) {
    e.preventDefault();
    selectCustomOption.classList.toggle('select-custom__option--d-block');
  });
  selectCustomOption.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('provinsi')) {
      e.preventDefault();
      inputProvinsi.value = target.dataset.provinsi;
      selectCustomOption.classList.remove('select-custom__option--d-block');
    }
  }); // get data cuaca

  var btnShow = document.querySelector('a.btn-show');
  btnShow.addEventListener('click', function (e) {
    e.preventDefault(); // cek provinsi dipilih atau tidak

    if (inputProvinsi.value) {
      fetch('get-api.php?provinsi=' + inputProvinsi.value.replace(/\s/g, '')).then(function (response) {
        return response.text();
      }).then(function (response) {
        var json = new XmlToJson(response);

        var _iterator = _createForOfIteratorHelper(json.data.forecast.area),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;
            console.log(p.name[1].text);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        console.log(json);
      });
    }
  });

});
