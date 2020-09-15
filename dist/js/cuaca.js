/*!
 * CV Reza v2
 * Copyright (c) 2020 Reza Sariful Fikri
*/
(function () {
  'use strict';

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

  /* daftar kabupaten atau kota-kota besar di Indonesia, berdasarkan kecocokan (data kabupaten atau kota) prakiraan cuaca BMKG dan (data kabupaten atau kota) di Wikipedia, terakhir update 12 September 2020 */
  var kabupatenKota = {
    Aceh: ['Kab. Aceh Barat', 'Kab. Aceh Barat Daya', 'Kab. Aceh Besar', 'Kab. Aceh Jaya', 'Kab. Aceh Selatan', 'Kab. Aceh Singkil', 'Kab. Aceh Tamiang', 'Kab. Aceh Tengah', 'Kab. Aceh Tenggara', 'Kab. Aceh Timur', 'Kab. Aceh Utara', 'Kota Banda Aceh', 'Kab. Bener Meriah', 'Kab. Bireuen', 'Kab. Gayo Lues', 'Kota Langsa', 'Kota Lhokseumawe', 'Kab. Nagan Raya', 'Kab. Pidie', 'Kab. Pidie Jaya', 'Kota Sabang', 'Kab. Simeulue', 'Kota Subulussalam'],
    Bali: ['Kab. Karangasem', 'Kab. Bangli', 'Kota Denpasar', 'Kab. Gianyar', 'Kab. Badung', 'Kab. Jembrana', 'Kab. Klungkung', 'Kab. Buleleng', 'Kab. Tabanan'],
    BangkaBelitung: ['Kab. Bangka Tengah [description: Koba]', 'Kab. Belitung Timur', 'Kab. Bangka Barat [description: Mentok]', 'Kota Pangkalpinang', 'Kab. Bangka', 'Kab. Belitung [description: Tanjung Pandan]', 'Kab. Bangka Selatan'],
    Banten: ['Kab. Serang [description: Ciruas]', 'Kab. Pandeglang [description: Pandeglang]', 'Kota Serang', 'Kota Tangerang', 'Kab. Tangerang'],
    Bengkulu: ['Kota Bengkulu', 'Kab. Bengkulu Selatan', 'Kab. Bengkulu Tengah', 'Kab. Bengkulu Utara', 'Kab. Kaur', 'Kab. Kepahiang', 'Kab. Lebong', 'Kab. Muko Muko', 'Kab. Rejang Lebong', 'Kab. Seluma'],
    DIYogyakarta: ['Kab. Bantul', 'Kab. Sleman', 'Kab. Kulon Progo', 'Kab. Gunung Kidul', 'Kota Yogyakarta'],
    DKIJakarta: ['Kota Jakarta Barat', 'Kota Jakarta Pusat', 'Kota Jakarta Selatan', 'Kota Jakarta Timur', 'Kota Jakarta Utara', 'Kab. Kepulauan Seribu'],
    Gorontalo: ['Kota Gorontalo', 'Kab. Gorontalo Utara', 'Kab. Gorontalo', 'Kab. Pahuwato', 'Kab. Bone Bolango', 'Kab. Boalemo'],
    Jambi: ['Kab. Merangin', 'Kab. Batanghari', 'Kab. Bungo', 'Kota Jambi', 'Kab. Kerinci', 'Kab. Tanjung Jabung Barat', 'Kab. Tanjung Jabung Timur', 'Kab. Muaro Jambi', 'Kab. Sarolangun', 'Kota Sungai Penuh', 'Kab. Tebo'],
    JawaBarat: ['Kota Bandung', 'Kota Banjar', 'Kota Bekasi', 'Kab. Ciamis', 'Kab. Cianjur [description: Cianjur]', 'Kab. Bogor [description: Cibinong]', 'Kab. Bekasi', 'Kota Cimahi', 'Kota Cirebon', 'Kota Depok', 'Kab. Garut', 'Kab. Indramayu', 'Kab. Karawang', 'Kota Bogor', 'Kab. Kuningan', 'Kab. Bandung Barat', 'Kab. Majalengka', 'Kab. Pangandaran', 'Kab. Sukabumi [description: Pelabuhan Ratu]', 'Kab. Purwakarta', 'Kab. Tasikmalaya', 'Kab. Bandung', 'Kab. Subang', 'Kab. Cirebon', 'Kab. Sumedang', 'Kota Tasikmalaya'],
    JawaTengah: ['Kab. Banjarnegara', 'Kab. Batang', 'Kab. Blora', 'Kab. Boyolali', 'Kab. Brebes', 'Kab. Cilacap', 'Kab. Demak', 'Kab. Jepara', 'Kab. Pekalongan', 'Kab. Karanganyar', 'Kab. Kebumen', 'Kab. Kendal', 'Kab. Klaten', 'Kab. Kudus', 'Kota Magelang', 'Kab. Magelang', 'Kab. Pati', 'Kota Pekalongan', 'Kab. Pemalang', 'Kab. Purbalingga', 'Kab. Grobogan', 'Kab. Banyumas', 'Kab. Purworejo', 'Kab. Rembang', 'Kota Salatiga', 'Kota Semarang', 'Kab. Tegal', 'Kab. Sragen', 'Kab. Sukoharjo', 'Kota Surakarta', 'Kota Tegal', 'Kab. Temanggung', 'Kab. Semarang', 'Kab. Wonogiri', 'Kab. Wonosobo'],
    JawaTimur: ['Kab. Bangkalan', 'Kab. Banyuwangi', 'Kota Batu', 'Kab. Bojonegoro', 'Kab. Bondowoso', 'Kab. Gresik', 'Kab. Jember', 'Kab. Jombang', 'Kab. Blitar', 'Kab. Kediri', 'Kab. Madiun', 'Kab. Malang', 'Kab. Mojokerto', 'Kab. Pasuruan', 'Kab. Probolinggo', 'Kota Blitar', 'Kota Kediri', 'Kota Madiun', 'Kota Malang', 'Kota Mojokerto', 'Kota Pasuruan', 'Kota Probolinggo', 'Kab. Lamongan', 'Kab. Lumajang', 'Kab. Magetan', 'Kab. Nganjuk', 'Kab. Ngawi', 'Kab. Pacitan', 'Kab. Pamekasan', 'Kab. Ponorogo', 'Kab. Sampang', 'Kab. Sidoarjo', 'Kab. Situbondo', 'Kab. Sumenep', 'Kota Surabaya', 'Kab. Trenggalek', 'Kab. Tuban', 'Kab. Tulungagung'],
    KalimantanBarat: ['Kab. Bengkayang', 'Kab. Kapuas Hulu', 'Kab. Kayong Utara', 'Kab. Ketapang', 'Kab. Ngabang', 'Kab. Melawi', 'Kab. Mempawah [description: Mempawah]', 'Kota Pontianak', 'Kab. Sambas', 'Kab. Sanggau', 'Kab. Sekadau', 'Kota Singkawang', 'Kab. Sintang', 'Kab. Kubu Raya [description: Sungai Raya]'],
    KalimantanSelatan: ['Kab. Hulu Sungai Utara', 'Kota Banjarbaru', 'Kota Banjarmasin', 'Kab. Hulu Sungai Tengah', 'Kab. Tanah Bambu', 'Kab. Hulu Sungai Selatan', 'Kab. Kotabaru', 'Kab. Barito Kuala', 'Kab. Banjar', 'Kab. Balangan', 'Kab. Tanah Laut', 'Kab. Tapin', 'Kab. Tabalong'],
    KalimantanTengah: ['Kab. Barito Selatan', 'Kab. Katingan', 'Kab. Kapuas', 'Kab. Gunung Mas', 'Kab. Seruyan', 'Kab. Barito Utara', 'Kab. Lamandau', 'Kota Palangkaraya', 'Kab. Kotawaringin Barat', 'Kab. Pulang Pisau', 'Kab. Murung Raya', 'Kab. Kotawaringin Timur', 'Kab. Sukamara', 'Kab. Barito Timur'],
    KalimantanTimur: ['Kota Balikpapan', 'Kota Bontang', 'Kab. Penajam Paser Utara', 'Kota Samarinda', 'Kab. Kutai Barat', 'Kab. Kutai Timur', 'Kab. Paser', 'Kab. Berau', 'Kab. Kutai Kartanegara'],
    KalimantanUtara: ['Kab. Malinau', 'Kab. Nunukan', 'Kab. Tana Tidung', 'Kab. Bulungan', 'Kota Tarakan'],
    KepulauanRiau: ['Kota Batam', 'Kab. Bintan', 'Kab. Lingga', 'Kab. Natuna', 'Kab. Karimun', 'Kota Tanjung Pinang', 'Kab. Anambas'],
    Lampung: ['Kota Bandar Lampung', 'Kab. Way Kanan', 'Kab. Pesawaran', 'Kab. Lampung Tengah', 'Kab. Lampung Selatan', 'Kab. Tanggamus', 'Kab. Lampung Utara', 'Kab. Lampung Barat [description: Liwa]', 'Kab. Pesisir Barat [description: Krui]', 'Kab. Tulang Bawang', 'Kota Metro', 'Kab. Tulang Bawang Barat', 'Kab. Pringsewu', 'Kab. Lampung Timur', 'Kab. Mesuji'],
    Maluku: ['Kota Ambon', 'Kab. Seram Bagian Timur', 'Kab. Kepulauan Aru', 'Kab. Maluku Barat Daya', 'Kab. Buru Selatan', 'Kab. Maluku Tengah', 'Kab. Buru', 'Kab. Seram Bagian Barat', 'Kab. Maluku Tenggara Barat', 'Kab. Maluku Tenggara'],
    MalukuUtara: ['Kab. Halmahera Barat', 'Kab. Halmahera Selatan', 'Kab. Halmahera Timur', 'Kab. Pulau Morotai', 'Kab. Kepulauan Sula', 'Kab. Pulau Taliabu', 'Kota Ternate', 'Kota Tidore Kepulauan [description: Tidore]', 'Kab. Halmahera Utara', 'Kab. Halmahera Tengah'],
    NusaTenggaraBarat: ['Kab. Dompu', 'Kab. Lombok Barat', 'Kota Bima', 'Kota Mataram', 'Kab. Lombok Tengah', 'Kab. Bima', 'Kab. Lombok Timur', 'Kab. Sumbawa', 'Kab. Sumbawa Barat', 'Kab. Lombok Utara'],
    NusaTenggaraTimur: ['Kab. Belu', 'Kab. Rote Ndao', 'Kab. Ngada', 'Kab. Malaka', 'Kab. Manggarai Timur', 'Kab. Ende', 'Kab. Alor', 'Kab. Timor Tengah Utara', 'Kota Kupang', 'Kab. Manggarai Barat', 'Kab. Flores Timur', 'Kab. Lembata', 'Kab. Sikka', 'Kab. Nagekeo', 'Kab. Kupang', 'Kab. Manggarai', 'Kab. Sabu Raijua', 'Kab. Timor Tengah Selatan', 'Kab. Sumba Tengah', 'Kab. Sumba Barat', 'Kab. Sumba Timur', 'Kab. Sumba Barat Daya'],
    Papua: ['Kab. Asmat', 'Kab. Biak Numfor', 'Kab. Waropen', 'Kab. Mamberamo Raya', 'Kab. Paniai', 'Kota Jayapura', 'Kab. Tolikara', 'Kab. Mappi', 'Kab. Merauke', 'Kab. Puncak Jaya', 'Kab. Nabire', 'Kab. Pegunungan Bintang', 'Kab. Sarmi', 'Kab. Jayapura [description: Sentani]', 'Kab. Kep Yapen', 'Kab. Supiori', 'Kab. Yahukimo', 'Kab. Boven Digoel', 'Kab. Mimika', 'Kab. Jayawijaya', 'Kab. Keerom'],
    PapuaBarat: ['Kab. Sorong', 'Kab. Teluk Bintuni', 'Kab. Fakfak', 'Kab. Kaimana', 'Kab. Maybrat', 'Kab. Manokwari', 'Kab. Manokwari Selatan', 'Kota Sorong', 'Kab. Sorong Selatan', 'Kab. Raja Ampat', 'Kab. Teluk Wondama'],
    Riau: ['Kab. Rokan Hilir', 'Kab. Kampar', 'Kab. Bengkalis', 'Kota Dumai', 'Kab. Pelalawan', 'Kab. Rokan Hulu', 'Kota Pekanbaru', 'Kab. Indragiri Hulu', 'Kab. Kepulauan Meranti', 'Kab. Siak', 'Kab. Kuantan Singingi', 'Kab. Indragiri Hilir'],
    SulawesiBarat: ['Kab. Majene', 'Kab. Mamasa', 'Kab. Mamuju', 'Kab. Mamuju Tengah', 'Kab. Mamuju Utara', 'Kab. Polewali Mandar'],
    SulawesiSelatan: ['Kab. Bantaeng', 'Kab. Barru', 'Kab. Kepulauan Selayar', 'Kab. Bulukumba', 'Kab. Enrekang', 'Kab. Jeneponto', 'Kab. Tana Toraja', 'Kota Makasar', 'Kab. Luwu Timur', 'Kab. Maros', 'Kab. Luwu Utara', 'Kota Palopo', 'Kab. Pangkajene dan Kepulauan', 'Kota Pare Pare', 'Kab. Pinrang', 'Kab. Toraja Utara', 'Kab. Wajo', 'Kab. Sidenreng Rappang', 'Kab. Sinjai', 'Kab. Gowa', 'Kab. Takalar', 'Kab. Bone', 'Kab. Soppeng'],
    SulawesiTengah: ['Kab. Tojo Una-Una', 'Kab. Morowali', 'Kab. Buol', 'Kab. Donggala', 'Kab. Banggai', 'Kota Palu', 'Kab. Parigi Moutong', 'Kab. Poso', 'Kab. Banggai Kepulauan', 'Kab. Sigi Biromaru', 'Kab. Toli-Toli'],
    SulawesiTenggara: ['Kota Bau - Bau', 'Kab. Bombana', 'Kab. Buton Utara', 'Kab. Buton', 'Kab. Kolaka', 'Kab. Kolaka Utara', 'Kab. Konawe', 'Kab. Konawe Selatan', 'Kota Kendari', 'Kab. Muna', 'Kab. Konawe Utara', 'Kab. Wakatobi'],
    SulawesiUtara: ['Kab. Minahasa Utara', 'Kab. Minahasa Selatan', 'Kota Bitung', 'Kab. Bolaang Mongondow Utara [description: Boroko]', 'Kota Kotamobagu', 'Kab. Bolaang Mongondow [description: Lolak]', 'Kota Manado', 'Kab. Talaud', 'Kab. Sitaro', 'Kab. Minahasa Tenggara', 'Kab. Sangihe', 'Kota Tomohon', 'Kab. Minahasa'],
    SumateraBarat: ['Kab. Solok', 'Kab. Tanah Datar', 'Kota Bukittinggi', 'Kab. Agam', 'Kab. Pasaman', 'Kab. Sijunjung', 'Kota Padang', 'Kab. Solok Selatan', 'Kota Padangpanjang', 'Kab. Pesisir Selatan', 'Kota Pariaman', 'Kab. Padang Pariaman', 'Kota Payakumbuh', 'Kab. Dharmasraya', 'Kab. Limapuluh Kota', 'Kota Sawahlunto', 'Kab. Pasaman Barat', 'Kota Solok', 'Kab. Kepulauan Mentawai'],
    SumateraSelatan: ['Kab. Ogan Komering Ulu', 'Kab. Ogan Ilir', 'Kab. Ogan Komering Ilir', 'Kab. Lahat', 'Kota Lubuk Linggau', 'Kab. Ogan Komering Ulu Timur', 'Kab. Ogan Komering Ulu Selatan', 'Kab. Muaraenim', 'Kab. Musi Rawas Utara', 'Kab. Musi Rawas', 'Kota Pagar Alam', 'Kota Palembang', 'Kab. Banyuasin', 'Kota Prabumulih', 'Kab. Musi Banyuasin', 'Kab. Penukal Abab Lematang Ilir', 'Kab. Empat Lawang'],
    SumateraUtara: ['Kab. Labuhanbatu Utara', 'Kab. Toba Samosir', 'Kota Binjai', 'Kab. Humbang Hasundutan', 'Kab. Nias', 'Kab. Padanglawas Utara [description: Gunung Tua]', 'Kab. Karo', 'Kab. Asahan', 'Kab. Labuhanbatu Selatan', 'Kab. Nias Barat', 'Kab. Batubara', 'Kab. Nias Utara', 'Kab. Deli Serdang', 'Kota Medan', 'Kota Padang Sidempuan', 'Kab. Tapanuli Tengah', 'Kab. Samosir', 'Kab. Mandailing Natal', 'Kab. Simalungun', 'Kota Pematang Siantar', 'Kab. Labuhanbatu', 'Kab. Pak-Pak Bharat', 'Kab. Serdang Bedagai', 'Kota Sibolga', 'Kab. Padanglawas', 'Kab. Dairi', 'Kab. Tapanuli Selatan [description: Sipirok]', 'Kab. Langkat', 'Kota Tanjung Balai', 'Kab. Tapanuli Utara', 'Kota Tebing Tinggi', 'Kab. Nias Selatan']
  };

  var weatherIcon = [{
    kodeCuaca: [0, 100],
    textCuaca: 'Cerah',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g fill="#ffe168" transform="translate(-.003409 -.002314)"><circle cx="53.173584" cy="33.167381" r="22.1845"/><rect height="8.572632" ry="1.061295" width="2.12259" x="53.377384" y="57.277"/><rect height="8.572632" ry="1.061295" transform="matrix(.70710678 -.70710678 .70710678 .70710678 0 0)" width="2.12259" x="10.083256" y="85.041283"/><rect height="8.572632" ry="1.061295" transform="matrix(.25881905 -.96592583 .96592583 .25881905 0 0)" width="2.12259" x="-19.333153" y="84.162666"/><rect height="8.572632" ry="1.061295" transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 0 0)" width="2.12259" x="-44.736908" y="66.970482"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 -.70710678 .70710678 -.70710678 0 0)" width="2.12259" x="-58.200134" y="38.210041"/><rect height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-54.200272" y="-8.873461"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="-16.961073" y="-36.685749"/><rect height="8.572632" ry="1.061295" transform="matrix(-.17247536 .98501383 -.98501383 -.17247536 0 0)" width="2.12259" x="21.472845" y="-33.810787"/><rect height="8.572632" ry="1.061295" transform="matrix(.70710678 .70710678 -.70710678 .70710678 0 0)" width="2.12259" x="65.396637" y="9.446353"/><rect height="8.572632" ry="1.061295" transform="matrix(.5 .8660254 -.8660254 .5 0 0)" width="2.12259" x="50.463188" y="-5.779677"/></g></svg>'
  }, {
    kodeCuaca: [1, 101, 2, 102],
    textCuaca: 'Cerah Berawan',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><g fill="#ffe168"><circle cx="60.326859" cy="264.01913" r="22.1845"/><rect height="8.572632" ry="1.061295" width="2.12259" x="60.530659" y="288.12875"/><rect height="8.572632" ry="1.061295" transform="matrix(.25881905 -.96592583 .96592583 .25881905 0 0)" width="2.12259" x="-240.46742" y="150.82103"/><rect height="8.572632" ry="1.061295" transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 0 0)" width="2.12259" x="-269.57397" y="14.131183"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 -.70710678 .70710678 -.70710678 0 0)" width="2.12259" x="-226.4951" y="-119.96866"/><rect height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-61.353546" y="-239.7252"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="141.21764" y="-204.98071"/></g><path d="m24.969913 249.66442a6.5349535 6.5349535 0 0 0 -6.535184 6.53491 6.5349535 6.5349535 0 0 0 .01389.3903 6.5349535 6.5349535 0 0 0 -3.857831 5.95255 6.5349535 6.5349535 0 0 0 .28945 1.9221h32.890656a4.9973173 4.9973173 0 0 0 1.224495-3.26745 4.9973173 4.9973173 0 0 0 -4.997225-4.9975 4.9973173 4.9973173 0 0 0 -1.963729.40791 8.1686919 8.1686919 0 0 0 -7.742603-5.59721 8.1686919 8.1686919 0 0 0 -4.179292 1.16047 6.5349535 6.5349535 0 0 0 -5.142617-2.50608z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5875"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(.70710678 .70710678 -.70710678 .70710678 0 0)" width="2.12259" x="233.6916" y="167.62506"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(.5 .8660254 -.8660254 .5 0 0)" width="2.12259" x="253.96329" y="103.45128"/><path d="m70.389644 272.61499a4.9952389 4.9952389 0 0 0 -4.995416 4.9952 4.9952389 4.9952389 0 0 0 .01062.29834 4.9952389 4.9952389 0 0 0 -2.94888 4.55006 4.9952389 4.9952389 0 0 0 .221252 1.46923h25.14122a3.8198886 3.8198886 0 0 0 .935992-2.4976 3.8198886 3.8198886 0 0 0 -3.819819-3.82003 3.8198886 3.8198886 0 0 0 -1.501055.3118 6.2440488 6.2440488 0 0 0 -5.918349-4.27844 6.2440488 6.2440488 0 0 0 -3.1946.88705 4.9952389 4.9952389 0 0 0 -3.930954-1.91561z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.27134"/></g></svg>'
  }, {
    kodeCuaca: [3, 103],
    textCuaca: 'Berawan',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><circle cx="53.111469" cy="269.26801" fill="#ffe168" r="22.1845"/><path d="m81.076115 265.09443a12.505183 12.505183 0 0 0 -11.471135 7.53804 10.92558 10.92558 0 0 0 -5.904547-1.74615 10.92558 10.92558 0 0 0 -1.579751.12557 8.556178 8.2929105 0 0 0 -6.713283-3.15277 8.556178 8.2929105 0 0 0 -8.392253 6.68692 10.92558 10.92558 0 0 0 -8.71988 10.68824 10.92558 10.92558 0 0 0 .699698 3.80856c.145534-.0757.308708-.12248.484725-.12248h61.061351a9.8725126 9.8725126 0 0 0 3.04426-7.10809 9.8725126 9.8725126 0 0 0 -9.872743-9.87278 9.8725126 9.8725126 0 0 0 -1.435574.1142 12.505183 12.505183 0 0 0 -11.200868-6.95926z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.116667"/><g fill="#ffe168"><rect height="8.572632" ry="1.061295" transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 0 0)" width="2.12259" x="-272.77655" y="5.803145"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 -.70710678 .70710678 -.70710678 0 0)" width="2.12259" x="-225.10457" y="-128.78224"/><rect height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-54.138157" y="-244.97409"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="150.03122" y="-203.59019"/></g><path d="m15.210507 252.45661a8.2262732 8.2262732 0 0 0 -8.2265628 8.22622 8.2262732 8.2262732 0 0 0 .017488.49132 8.2262732 8.2262732 0 0 0 -4.8562802 7.49314 8.2262732 8.2262732 0 0 0 .3643629 2.41956h41.4031221a6.2906795 6.2906795 0 0 0 1.54141-4.11311 6.2906795 6.2906795 0 0 0 -6.290563-6.29091 6.2906795 6.2906795 0 0 0 -2.471964.51348 10.282842 10.282842 0 0 0 -9.746478-7.04583 10.282842 10.282842 0 0 0 -5.260939 1.46082 8.2262732 8.2262732 0 0 0 -6.473584-3.15469z" fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.910901"/></g></svg>'
  }, {
    kodeCuaca: [4, 104],
    textCuaca: 'Berawan Tebal',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><circle cx="53.422859" cy="269.19724" fill="#ffe168" r="22.1845"/><path d="m26.121639 255.06626a9.1682976 9.1682976 0 0 0 -9.168235 9.16824 9.1682976 9.1682976 0 0 0 .0077.21437 9.1682976 9.1682976 0 0 0 -7.3998504 8.98761 9.1682976 9.1682976 0 0 0 2.9569774 6.72828 9.1682976 9.1682976 0 0 0 -1.146547 4.43517 9.1682976 9.1682976 0 0 0 2.024226 5.73273h66.022958a13.090535 13.090535 0 0 0 4.597441-9.95649 13.090535 13.090535 0 0 0 -13.090539-13.09054 13.090535 13.090535 0 0 0 -2.631253.28131 15.50422 15.50422 0 0 0 -14.868398-11.1433 15.50422 15.50422 0 0 0 -10.493635 4.11182 9.1682976 9.1682976 0 0 0 -6.39899-2.61528 9.1682976 9.1682976 0 0 0 -3.245391.59757 9.1682976 9.1682976 0 0 0 -7.166514-3.45149z" fill="#cacaca" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.38125"/><path d="m72.511174 240.57538a6.5349535 6.5349535 0 0 0 -6.535185 6.53491 6.5349535 6.5349535 0 0 0 .01389.3903 6.5349535 6.5349535 0 0 0 -3.85783 5.95255 6.5349535 6.5349535 0 0 0 .28945 1.9221h32.890664a4.9973174 4.9973174 0 0 0 1.2245-3.26745 4.9973174 4.9973174 0 0 0 -4.997237-4.9975 4.9973174 4.9973174 0 0 0 -1.96373.40791 8.1686919 8.1686919 0 0 0 -7.742603-5.59721 8.1686919 8.1686919 0 0 0 -4.179292 1.16047 6.5349535 6.5349535 0 0 0 -5.142617-2.50608z" fill="#ddd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.852083"/><g fill="#ffe168"><rect height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-54.449547" y="-244.90332"/><rect height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="149.76097" y="-203.76031"/></g></g></svg>'
  }, {
    kodeCuaca: [5],
    textCuaca: 'Udara Kabur',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-.020538 -.01453)"><circle cx="51.596889" cy="37.381355" fill="#ffe168" r="22.1845"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 0 0)" width="2.12259" x="-48.39922" y="64.356865"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(-.70710678 -.70710678 .70710678 -.70710678 0 0)" width="2.12259" x="-60.06498" y="34.115429"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="scale(-1)" width="2.12259" x="-52.623577" y="-13.087437"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(-.70710678 .70710678 -.70710678 -.70710678 0 0)" width="2.12259" x="-12.866457" y="-38.550594"/><rect fill="#ffe168" height="8.572632" ry="1.061295" transform="matrix(-.17247536 .98501383 -.98501383 -.17247536 0 0)" width="2.12259" x="25.895607" y="-32.984547"/><g fill="#e2e2e2" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".952"><rect height="2.597763" ry="1.298882" width="26.386097" x="38.404083" y="47.933361"/><rect height="2.597763" ry="1.298882" width="26.472622" x="9.267153" y="47.956238"/><rect height="2.582963" ry="1.291481" width="19.813589" x="18.532869" y="53.2258"/><rect height="2.709807" ry="1.354904" width="19.788244" x="37.071865" y="58.474281"/><rect height="2.709807" ry="1.354904" width="13.216998" x="64.220978" y="53.183167"/><rect height="2.709807" ry="1.354904" width="21.248507" x="75.358749" y="58.473816"/><rect height="2.53585" ry="1.267925" width="19.756844" x="67.516762" y="47.969193"/><rect height="2.709807" ry="1.354904" width="13.216998" x="78.065376" y="42.631889"/><rect height="2.582963" ry="1.291481" width="19.813589" x="22.588806" y="42.63192"/></g></g></svg>'
  }, {
    kodeCuaca: [10],
    textCuaca: 'Asap',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g fill="#c8c8c8" transform="translate(0 -230.85407)"><path d="m62.967087 239.7666c-3.97187.001-7.622177 2.18366-9.503296 5.68182-1.24106-1.11323-2.84882-1.7301-4.516004-1.73271-2.258934.001-4.368916 1.1273-5.627047 3.00344-1.807399-2.4634-4.678567-3.92048-7.733895-3.92483-5.307028.00001-9.609223 4.3022-9.609231 9.60923.004 1.00042.164264 1.99407.474906 2.94504-2.869241 2.20287-4.552371 5.61362-4.555277 9.23096.0026 3.09523 1.236797 6.06219 3.430281 8.24601 16.626768.0303 32.790488 0 49.793344 0 .388086-.43368.740462-.89804 1.053682-1.38854 4.836001-1.17348 8.242994-5.50106 8.248592-10.4774-.0029-5.91318-4.763008-10.72327-10.675835-10.78797-.209234-5.80361-4.972838-10.40144-10.78022-10.40505z"/><rect height="2.698487" ry="1.349243" width="52.918381" x="25.380283" y="274.81967"/><rect height="2.698487" ry="1.349243" width="51.603642" x="21.40032" y="280.11697"/><rect height="2.698487" ry="1.349243" width="51.603642" x="27.998049" y="285.39499"/></g></svg>'
  }, {
    kodeCuaca: [45],
    textCuaca: 'Kabut',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g fill="#c8c8c8"><rect height="3.973686" ry="1.986843" width="65.014366" x="18.320288" y="14.542019"/><rect height="3.973686" ry="1.986843" width="64.843552" x="23.800037" y="21.157375"/><rect height="3.973686" ry="1.986843" width="10.574555" x="11.911375" y="21.163708"/><rect height="3.973686" ry="1.986843" width="71.443817" x="14.556745" y="27.775341"/><rect height="3.974695" ry="1.987347" width="68.793594" x="18.521004" y="34.384315"/><rect height="3.973686" ry="1.986843" width="58.208508" x="22.493893" y="41.002815"/><rect height="3.973686" ry="1.986843" width="10.574555" x="83.33712" y="40.995277"/><rect height="3.973686" ry="1.986843" width="48.93224" x="17.202915" y="47.60984"/><rect height="3.973686" ry="1.986843" width="26.467348" x="67.454613" y="47.630127"/></g></svg>'
  }, {
    kodeCuaca: [60],
    textCuaca: 'Hujan Ringan',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><path d="m32.249524 238.71234a9.1682977 9.1682977 0 0 0 -9.168235 9.16825 9.1682977 9.1682977 0 0 0 .0077.21436 9.1682977 9.1682977 0 0 0 -7.399851 8.98762 9.1682977 9.1682977 0 0 0 2.956978 6.72828 9.1682977 9.1682977 0 0 0 -1.146547 4.43517 9.1682977 9.1682977 0 0 0 2.024226 5.73272h66.022958a13.090535 13.090535 0 0 0 4.597442-9.95649 13.090535 13.090535 0 0 0 -13.090538-13.09053 13.090535 13.090535 0 0 0 -2.631255.28131 15.50422 15.50422 0 0 0 -14.868398-11.14331 15.50422 15.50422 0 0 0 -10.493634 4.11182 9.1682977 9.1682977 0 0 0 -6.398991-2.61528 9.1682977 9.1682977 0 0 0 -3.245391.59758 9.1682977 9.1682977 0 0 0 -7.166514-3.4515z" fill="#cacaca"/><g fill="#b7ccd9"><path d="m33.439948 281.93031c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m63.800047 286.49581c0-1.46125 1.620426-3.23379 2.645832-4.2592.881947.88194 2.645837 2.79795 2.645832 4.2592-.000001 1.46125-1.184578 2.64583-2.645833 2.64583-1.461248 0-2.64583-1.18458-2.645831-2.64583z"/><path d="m54.255386 280.91151c-.000001-1.46125 1.620425-3.23379 2.645832-4.2592.881946.88195 2.645832 2.79795 2.645831 4.2592s-1.184578 2.64583-2.645831 2.64583c-1.46125 0-2.645831-1.18458-2.645832-2.64583z"/></g></g></svg>'
  }, {
    kodeCuaca: [61],
    textCuaca: 'Hujan Sedang',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><path d="m32.249524 236.05301a9.1682977 9.1682977 0 0 0 -9.168235 9.16825 9.1682977 9.1682977 0 0 0 .0077.21436 9.1682977 9.1682977 0 0 0 -7.399851 8.98762 9.1682977 9.1682977 0 0 0 2.956978 6.72828 9.1682977 9.1682977 0 0 0 -1.146547 4.43517 9.1682977 9.1682977 0 0 0 2.024226 5.73272h66.022958a13.090535 13.090535 0 0 0 4.597442-9.95649 13.090535 13.090535 0 0 0 -13.090538-13.09053 13.090535 13.090535 0 0 0 -2.631255.28131 15.50422 15.50422 0 0 0 -14.868398-11.14331 15.50422 15.50422 0 0 0 -10.493634 4.11182 9.1682977 9.1682977 0 0 0 -6.398991-2.61528 9.1682977 9.1682977 0 0 0 -3.245391.59758 9.1682977 9.1682977 0 0 0 -7.166514-3.4515z" fill="#cacaca"/><g fill="#b7ccd9"><path d="m54.387019 280.88485c-.000001-1.46125 1.620425-3.23379 2.645832-4.2592.881946.88195 2.645832 2.79795 2.645831 4.2592s-1.184578 2.64583-2.645831 2.64583c-1.46125 0-2.645831-1.18458-2.645832-2.64583z"/><path d="m24.602302 276.72318c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m32.443518 283.83914c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m43.820793 276.85482c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m44.84967 289.15513c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m66.549311 276.55232c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m78.177136 279.4954c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/></g></g></svg>'
  }, {
    kodeCuaca: [63],
    textCuaca: 'Hujan Lebat',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><path d="m32.249524 234.83717a9.1682977 9.1682977 0 0 0 -9.168235 9.16825 9.1682977 9.1682977 0 0 0 .0077.21436 9.1682977 9.1682977 0 0 0 -7.399851 8.98762 9.1682977 9.1682977 0 0 0 2.956978 6.72828 9.1682977 9.1682977 0 0 0 -1.146547 4.43517 9.1682977 9.1682977 0 0 0 2.024226 5.73272h66.022958a13.090535 13.090535 0 0 0 4.597442-9.95649 13.090535 13.090535 0 0 0 -13.090538-13.09053 13.090535 13.090535 0 0 0 -2.631255.28131 15.50422 15.50422 0 0 0 -14.868398-11.14331 15.50422 15.50422 0 0 0 -10.493634 4.11182 9.1682977 9.1682977 0 0 0 -6.398991-2.61528 9.1682977 9.1682977 0 0 0 -3.245391.59758 9.1682977 9.1682977 0 0 0 -7.166514-3.4515z" fill="#cacaca"/><g fill="#b7ccd9"><path d="m56.06244 279.11054c-.000001-1.46125 1.620425-3.23379 2.645832-4.2592.881946.88195 2.645832 2.79795 2.645831 4.2592s-1.184578 2.64583-2.645831 2.64583c-1.46125 0-2.645831-1.18458-2.645832-2.64583z"/><path d="m24.602302 275.50734c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m33.932781 277.22472c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m43.820793 275.63898c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m46.711249 284.21613c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m66.549311 275.33648c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m78.177136 278.27956c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m21.554693 284.97239c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m29.559481 288.32323c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m39.053534 290.37097c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m55.063111 289.62634c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m63.440216 285.34471c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/><path d="m71.631163 287.95092c-.000001-1.46125 1.620425-3.23378 2.645832-4.2592.881942.88194 2.645832 2.79795 2.645832 4.2592-.000001 1.46125-1.184579 2.64584-2.645832 2.64583-1.46125.00001-2.645831-1.18458-2.645832-2.64583z"/></g></g></svg>'
  }, {
    kodeCuaca: [80],
    textCuaca: 'Hujan Lokal',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><path d="m32.249524 233.77507a9.1682977 9.1682977 0 0 0 -9.168235 9.16825 9.1682977 9.1682977 0 0 0 .0077.21436 9.1682977 9.1682977 0 0 0 -7.399851 8.98762 9.1682977 9.1682977 0 0 0 2.956978 6.72828 9.1682977 9.1682977 0 0 0 -1.146547 4.43517 9.1682977 9.1682977 0 0 0 2.024226 5.73272h66.022958a13.090535 13.090535 0 0 0 4.597442-9.95649 13.090535 13.090535 0 0 0 -13.090538-13.09053 13.090535 13.090535 0 0 0 -2.631255.28131 15.50422 15.50422 0 0 0 -14.868398-11.14331 15.50422 15.50422 0 0 0 -10.493634 4.11182 9.1682977 9.1682977 0 0 0 -6.398991-2.61528 9.1682977 9.1682977 0 0 0 -3.245391.59758 9.1682977 9.1682977 0 0 0 -7.166514-3.4515z" fill="#cacaca"/><g fill="#b7ccd9"><path d="m51.705529 273.75629c.730624-1.26548 3.020223-1.99033 4.420958-2.36566.322814 1.20476.892381 3.74602.161757 5.01149-.730626 1.26548-2.348791 1.69907-3.614273.96845-1.26548-.73063-1.699066-2.3488-.968442-3.61428z"/><path d="m23.318015 272.7539c.730625-1.26548 3.020221-1.99033 4.420959-2.36566.322814 1.20475.892383 3.746.161758 5.01148-.730626 1.26549-2.348794 1.69908-3.614271.96844-1.265485-.73062-1.699067-2.34879-.968446-3.61426z"/><path d="m29.715413 276.50773c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322815 1.20475.892384 3.74601.161759 5.01149-.730626 1.26548-2.348797 1.69908-3.614274.96845-1.265485-.73062-1.699067-2.3488-.968443-3.61428z"/><path d="m43.060583 276.14777c.730624-1.26548 3.020217-1.99032 4.420958-2.36566.322814 1.20475.89238 3.74602.161758 5.01149-.730626 1.26548-2.348797 1.69908-3.614275.96844-1.265484-.73061-1.699065-2.34879-.968441-3.61427z"/><path d="m38.872163 285.19682c.730624-1.26549 3.020221-1.99033 4.420958-2.36566.322815 1.20475.892384 3.746.161759 5.01148-.730627 1.26548-2.348796 1.69908-3.614272.96844-1.265485-.73062-1.69907-2.34878-.968445-3.61426z"/><path d="m68.80993 272.22685c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322815 1.20475.892382 3.74602.161756 5.0115-.730623 1.26547-2.348795 1.69907-3.614271.96843-1.265485-.73061-1.699067-2.34879-.968443-3.61427z"/><path d="m75.996524 275.81632c.730624-1.26548 3.020217-1.99032 4.420957-2.36566.322815 1.20475.892381 3.74602.161759 5.01149-.730627 1.26548-2.348798 1.69908-3.614275.96844-1.265484-.73061-1.699066-2.34879-.968441-3.61427z"/><path d="m18.31838 282.40661c.730624-1.26548 3.020218-1.99032 4.420958-2.36566.322815 1.20475.892381 3.74602.161759 5.01149-.730626 1.26548-2.348797 1.69908-3.614275.96844-1.265485-.73061-1.699065-2.34879-.968442-3.61427z"/><path d="m37.277613 273.28247c.730624-1.26548 3.020218-1.99032 4.420957-2.36566.322815 1.20475.892382 3.74602.161757 5.0115-.730624 1.26547-2.348795 1.69907-3.614272.96844-1.265485-.73062-1.699067-2.3488-.968442-3.61428z"/><path d="m29.350616 285.493c.730625-1.26548 3.020217-1.99032 4.420958-2.36566.322811 1.20476.89238 3.74602.161756 5.0115-.730626 1.26548-2.348795 1.69907-3.614273.96844-1.265483-.73062-1.699065-2.3488-.968441-3.61428z"/><path d="m45.177034 289.6352c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322813 1.20476.892382 3.74602.161756 5.0115s-2.348794 1.69907-3.614271.96844c-1.265485-.73062-1.699067-2.3488-.968443-3.61428z"/><path d="m52.243827 285.15286c.730624-1.26548 3.020218-1.99032 4.420959-2.36566.322811 1.20476.89238 3.74602.161755 5.0115-.730623 1.26547-2.348794 1.69907-3.614272.96843-1.265484-.73061-1.699066-2.34879-.968442-3.61427z"/><path d="m61.275044 286.66099c.730624-1.26548 3.02022-1.99032 4.420957-2.36566.322815 1.20476.892384 3.74601.161758 5.01149-.730625 1.26548-2.348794 1.69907-3.614271.96844-1.265485-.73062-1.699069-2.34879-.968444-3.61427z"/><path d="m21.141111 290.10973c.730624-1.26548 3.020221-1.99033 4.420957-2.36566.322815 1.20475.892384 3.746.16176 5.01148-.730627 1.26548-2.348796 1.69908-3.614273.96844-1.265484-.73062-1.699069-2.34878-.968444-3.61426z"/><path d="m60.155636 275.65085c.730624-1.26548 3.020225-1.99034 4.420958-2.36566.322813 1.20476.892384 3.74601.161758 5.01149-.730627 1.26548-2.348789 1.69906-3.614271.96843-1.265482-.73061-1.69907-2.34878-.968445-3.61426z"/></g></g></svg>'
  }, {
    kodeCuaca: [95, 97],
    textCuaca: 'Hujan Petir',
    iconCuaca: '<svg viewBox="0 0 105.83333 66.145886" width="130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -230.85407)"><path d="m32.249524 232.7618a9.1682977 9.1682977 0 0 0 -9.168235 9.16825 9.1682977 9.1682977 0 0 0 .0077.21436 9.1682977 9.1682977 0 0 0 -7.399851 8.98762 9.1682977 9.1682977 0 0 0 2.956978 6.72828 9.1682977 9.1682977 0 0 0 -1.146547 4.43517 9.1682977 9.1682977 0 0 0 2.024226 5.73272h66.022958a13.090535 13.090535 0 0 0 4.597442-9.95649 13.090535 13.090535 0 0 0 -13.090538-13.09053 13.090535 13.090535 0 0 0 -2.631255.28131 15.50422 15.50422 0 0 0 -14.868398-11.14331 15.50422 15.50422 0 0 0 -10.493634 4.11182 9.1682977 9.1682977 0 0 0 -6.398991-2.61528 9.1682977 9.1682977 0 0 0 -3.245391.59758 9.1682977 9.1682977 0 0 0 -7.166514-3.4515z" fill="#cacaca"/><g fill="#b7ccd9"><path d="m51.705529 272.74302c.730624-1.26548 3.020223-1.99033 4.420958-2.36566.322814 1.20476.892381 3.74602.161757 5.01149-.730626 1.26548-2.348791 1.69907-3.614273.96845-1.26548-.73063-1.699066-2.3488-.968442-3.61428z"/><path d="m23.318015 271.74063c.730625-1.26548 3.020221-1.99033 4.420959-2.36566.322814 1.20475.892383 3.746.161758 5.01148-.730626 1.26549-2.348794 1.69908-3.614271.96844-1.265485-.73062-1.699067-2.34879-.968446-3.61426z"/><path d="m29.715413 275.49446c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322815 1.20475.892384 3.74601.161759 5.01149-.730626 1.26548-2.348797 1.69908-3.614274.96845-1.265485-.73062-1.699067-2.3488-.968443-3.61428z"/><path d="m34.001724 289.84379c.730624-1.26549 3.020221-1.99033 4.420958-2.36566.322815 1.20475.892384 3.746.161759 5.01148-.730627 1.26548-2.348796 1.69908-3.614272.96844-1.265485-.73062-1.69907-2.34878-.968445-3.61426z"/><path d="m68.80993 271.21358c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322815 1.20475.892382 3.74602.161756 5.0115-.730623 1.26547-2.348795 1.69907-3.614271.96843-1.265485-.73061-1.699067-2.34879-.968443-3.61427z"/><path d="m75.996524 274.80305c.730624-1.26548 3.020217-1.99032 4.420957-2.36566.322815 1.20475.892381 3.74602.161759 5.01149-.730627 1.26548-2.348798 1.69908-3.614275.96844-1.265484-.73061-1.699066-2.34879-.968441-3.61427z"/><path d="m18.31838 281.39334c.730624-1.26548 3.020218-1.99032 4.420958-2.36566.322815 1.20475.892381 3.74602.161759 5.01149-.730626 1.26548-2.348797 1.69908-3.614275.96844-1.265485-.73061-1.699065-2.34879-.968442-3.61427z"/><path d="m37.277613 272.2692c.730624-1.26548 3.020218-1.99032 4.420957-2.36566.322815 1.20475.892382 3.74602.161757 5.0115-.730624 1.26547-2.348795 1.69907-3.614272.96844-1.265485-.73062-1.699067-2.3488-.968442-3.61428z"/><path d="m32.885291 282.74187c.730625-1.26548 3.020217-1.99032 4.420958-2.36566.322811 1.20476.89238 3.74602.161756 5.0115-.730626 1.26548-2.348795 1.69907-3.614273.96844-1.265483-.73062-1.699065-2.3488-.968441-3.61428z"/><path d="m47.151536 291.12297c.730625-1.26548 3.020219-1.99032 4.420958-2.36566.322813 1.20476.892382 3.74602.161756 5.0115s-2.348794 1.69907-3.614271.96844c-1.265485-.73062-1.699067-2.3488-.968443-3.61428z"/><path d="m52.243827 284.13959c.730624-1.26548 3.020218-1.99032 4.420959-2.36566.322811 1.20476.89238 3.74602.161755 5.0115-.730623 1.26547-2.348794 1.69907-3.614272.96843-1.265484-.73061-1.699066-2.34879-.968442-3.61427z"/><path d="m61.275044 285.64772c.730624-1.26548 3.02022-1.99032 4.420957-2.36566.322815 1.20476.892384 3.74601.161758 5.01149-.730625 1.26548-2.348794 1.69907-3.614271.96844-1.265485-.73062-1.699069-2.34879-.968444-3.61427z"/><path d="m21.141111 289.09646c.730624-1.26548 3.020221-1.99033 4.420957-2.36566.322815 1.20475.892384 3.746.16176 5.01148-.730627 1.26548-2.348796 1.69908-3.614273.96844-1.265484-.73062-1.699069-2.34878-.968444-3.61426z"/><path d="m60.155636 274.63758c.730624-1.26548 3.020225-1.99034 4.420958-2.36566.322813 1.20476.892384 3.74601.161758 5.01149-.730627 1.26548-2.348789 1.69906-3.614271.96843-1.265482-.73061-1.69907-2.34878-.968445-3.61426z"/></g><path d="m45.406976 268.67269-4.594008 13.22258h5.291666l-5.291666 11.90625 13.229166-14.55208h-9.260417l6.614584-10.58333z" fill="#ffe168"/><path d="m67.517425 279.91992c.730624-1.26548 3.02022-1.99032 4.420957-2.36566.322815 1.20476.892384 3.74601.161758 5.01149-.730625 1.26548-2.348794 1.69907-3.614271.96844-1.265485-.73062-1.699069-2.34879-.968444-3.61427z" fill="#b7ccd9"/></g></svg>'
  }];

  var selectProvinsi = document.querySelector("#selectProvinsi");
  var selectKabupatenKota = document.querySelector("#selectKabupatenKota");
  var inputProvinsi = document.querySelector('input[name="provinsi"]');
  var inputKabupatenKota = document.querySelector('input[name="kabupatenKota"]');
  var cardStatusSuhu = document.querySelector('.card__status .card__suhu');
  var cardHeaderSelect = document.querySelector('.card__header select');
  var cardHeaderp = document.querySelector('.card__header p');
  var cardStatusIcon = document.querySelector('.card__status .card__icon');
  var cardSecondary = document.querySelector('.card__secondary table');
  /** select custom **/

  document.querySelector('#btnProvinsi').addEventListener('click', function (e) {
    e.preventDefault();
    selectProvinsi.classList.toggle('select-custom__option--d-block');
  });
  document.querySelector('#btnKabupatenKota').addEventListener('click', function (e) {
    e.preventDefault();
    selectKabupatenKota.classList.toggle('select-custom__option--d-block');
  });

  function selectCustom(e, classContains, input, datasetName, selectCustom) {
    var target = e.target;

    if (target.classList.contains(classContains)) {
      e.preventDefault();

      if (classContains === 'kabupatenKota' && /\[description:/.test(target.dataset[datasetName])) {
        input.value = target.dataset[datasetName].split('[description:')[0].replace(/\s$/, '');
        input.dataset.originValue = target.dataset[datasetName];
      } else if (classContains === 'kabupatenKota') {
        input.value = target.dataset[datasetName];
        input.dataset.originValue = target.dataset[datasetName];
      } else {
        input.value = target.dataset[datasetName];
      }

      selectCustom.classList.remove('select-custom__option--d-block');
    }

    return true;
  }

  function buatListKabupatenKota(inputProvinsi, inputKabupatenKota, kabupatenKota) {
    // jika yang dipilih berbedah dari sebelumnya
    if (inputProvinsi.hasOwnProperty('oldValue') && inputProvinsi.oldValue !== inputProvinsi.value) {
      // reset inputKabupatenKota
      inputKabupatenKota.value = '';
      delete inputKabupatenKota.dataset.originValue;
    } // jika yang dipilih berbedah dari sebelumnya atau jika provinsi belum pernah dipilih sebelumnya


    if (inputProvinsi.hasOwnProperty('oldValue') && inputProvinsi.oldValue !== inputProvinsi.value || !inputProvinsi.hasOwnProperty('oldValue')) {
      // change oldValue atau set value oldValue
      inputProvinsi.oldValue = inputProvinsi.value; // buat dan append list kabupaten atau kota

      var provinsi = inputProvinsi.value;
      var hasil = '<li><a href="#" class="kabupatenKota" data-kabupaten-kota=""></a></li>';

      var _iterator = _createForOfIteratorHelper(kabupatenKota[provinsi.replace(/\s/g, '')]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var kb = _step.value;

          // jika ada keterangan description
          if (/^[\w\.\s]+\[description:[\s\w+]+\]$/i.test(kb)) {
            hasil += "<li><a href=\"#\" class=\"kabupatenKota\" data-kabupaten-kota=\"".concat(kb, "\">").concat(kb.split('[description: ')[0].replace(/\s$/, ''), "</a></li>");
          } else {
            // selain dari itu
            hasil += "<li><a href=\"#\" class=\"kabupatenKota\" data-kabupaten-kota=\"".concat(kb, "\">").concat(kb, "</a></li>");
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.querySelector('#selectKabupatenKota ul').innerHTML = hasil;
    }

    return true;
  }

  selectProvinsi.addEventListener('click', function (e) {
    if (selectCustom(e, 'provinsi', inputProvinsi, 'provinsi', selectProvinsi)) buatListKabupatenKota(inputProvinsi, inputKabupatenKota, kabupatenKota);
  });
  selectKabupatenKota.addEventListener('click', function (e) {
    selectCustom(e, 'kabupatenKota', inputKabupatenKota, 'kabupatenKota', selectKabupatenKota);
  });
  /** clear localStorage ketika halaman di reload **/

  localStorage.clear();
  /** get data cuaca **/

  function inArray(niddle, haystack) {
    // menghasilkan true atau false
    var _iterator2 = _createForOfIteratorHelper(haystack),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var h = _step2.value;
        if (h === niddle) return true;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return false;
  }

  function generateDayIndo(day) {
    switch (day) {
      case 0:
        return "Ahad";

      case 1:
        return "Senin";

      case 2:
        return "Selasa";

      case 3:
        return "Rabu";

      case 4:
        return "Kamis";

      case 5:
        return "Jum'at";

      case 6:
        return "Sabtu";
    }
  }

  function generateAttrSelectedOption(day, hours, nextHours) {
    var objDate = new Date(Date.now()); // generate nextHours	

    if (nextHours !== '00') nextHours = nextHours.datetime.toString().substr(8, 2);
    if (nextHours === '00') nextHours = 24; // jika day dari timerange sama dengan day sekarang dan jam dari timerange lebih kecil sama dengan jam sekarang dan jam selanjutnya dari timerange lebih besar dari jam sekarang, maka selected;
    // maksudnya adalah 'selected' jika jam dari timerange lebih kecil sama dengan jam sekarang dan paling dekat dengan jam sekarang, ini untuk menghindari jika jam sekarang jam 20 maka seharusnya yang 'selected' adalah timerange dengan jam 18, bukan malah timerange dengan jam 00;

    if (day == objDate.getDate() && hours <= objDate.getHours() && nextHours > objDate.getHours()) return 'selected';
    return '';
  }

  function generateDateTimeOption(timeRange) {
    // menghasilkan option untuk select input
    var hasil = '';
    var i = 0;

    var _iterator3 = _createForOfIteratorHelper(timeRange),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _timeRange;

        var t = _step3.value;
        var objDate = new Date(t.datetime.toString().substr(0, 4), t.datetime.toString().substr(4, 2) - 1, t.datetime.toString().substr(6, 2), t.datetime.toString().substr(8, 2));
        hasil += "<option value=\"".concat(t.datetime, "\" ").concat(generateAttrSelectedOption(t.datetime.toString().substr(6, 2), t.datetime.toString().substr(8, 2), (_timeRange = timeRange[i + 1]) !== null && _timeRange !== void 0 ? _timeRange : '00'), ">").concat(generateDayIndo(objDate.getDay()), " ").concat(t.datetime.toString().substr(8, 2), ".00</option>");
        i++;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return hasil;
  }

  function generateWeatherPrimaryInfo(timeRangeKodeCuaca, timeRangeTemperature, cardHeaderSelect, weatherIcon) {
    // menghasilkan svg icon, text cuaca, suhu
    var dateTimeSelect = cardHeaderSelect.value;
    var kodeCuaca;
    var iconCuaca = '';
    var textCuaca = '';
    var suhu = '';

    var _iterator4 = _createForOfIteratorHelper(timeRangeKodeCuaca),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var w = _step4.value;

        if (parseInt(dateTimeSelect) === w.datetime) {
          kodeCuaca = w.value.text;
          break;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var _iterator5 = _createForOfIteratorHelper(weatherIcon),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var i = _step5.value;

        if (inArray(kodeCuaca, i.kodeCuaca)) {
          iconCuaca = i.iconCuaca;
          textCuaca = i.textCuaca;
          break;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    var _iterator6 = _createForOfIteratorHelper(timeRangeTemperature),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var t = _step6.value;

        if (parseInt(dateTimeSelect) === t.datetime) {
          suhu = "<h1>".concat(t.value[0].text.toString().replace('.', ','), "</h1><h5><a href=\"#\" data-suhu=\"").concat(t.value[0].text.toString().replace('.', ','), "\" class=\"card__suhuCelsius card__suhuCelsius--active\">\xB0C</a></h5><h5>|</h5><h5><a href=\"#\" data-suhu=\"").concat(t.value[1].text.toString().replace('.', ','), "\" class=\"card__suhuFahrenheit\">\xB0F</a></h5>");
          break;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return {
      iconCuaca: iconCuaca,
      textCuaca: textCuaca,
      suhu: suhu
    };
  }

  function generateArahAngin(kodeArahAngin) {
    switch (kodeArahAngin) {
      case "N":
        return 'dari arah Utara';

      case "NNE":
        return 'dari arah Utara - Timur Laut';

      case "NE":
        return 'dari arah Timur Laut';

      case "ENE":
        return 'dari arah Timur - Timur Laut';

      case "E":
        return 'dari arah Timur';

      case "ESE":
        return 'dari arah Timur - Tenggara';

      case "SE":
        return 'dari arah Tenggara';

      case "SSE":
        return 'dari arah Selatan Menenggara';

      case "S":
        return 'dari arah Selatan';

      case "SSW":
        return 'dari arah Selatan - Barat Daya';

      case "SW":
        return 'dari arah Barat Daya';

      case "WSW":
        return 'dari arah Barat - Barat Daya';

      case "W":
        return 'dari arah Barat';

      case "WNW":
        return 'dari arah Barat - Barat Laut';

      case "NW":
        return 'dari arah Barat Laut';

      case "NNW":
        return 'dari arah Utara - Barat Laut';

      case "VARIABLE":
        return 'Berubah - Ubah';
    }
  }

  function generateWeatherScondaryInfo(timeRangeHumidity, timeRangeWindSpeed, timeRangeWindDirection, cardHeaderSelect) {
    // menghasilkan row table
    var dateTimeSelect = cardHeaderSelect.value;
    var hasil = '';

    var _iterator7 = _createForOfIteratorHelper(timeRangeHumidity),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var hu = _step7.value;

        if (parseInt(dateTimeSelect) === hu.datetime) {
          hasil += "<tr><th>Kelembapan Udara</th><td>".concat(hu.value.text + hu.value.unit, "</td></tr>");
          break;
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    var _iterator8 = _createForOfIteratorHelper(timeRangeWindSpeed),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var ws = _step8.value;

        if (parseInt(dateTimeSelect) === ws.datetime) {
          hasil += "<tr><th>Kecepatan Angin</th><td id=\"ws\" data-kph=\"".concat(ws.value[2].text.toFixed(2).replace('.', ','), " ").concat(ws.value[2].unit, "\" data-mph=\"").concat(ws.value[1].text.toFixed(2).replace('.', ','), " ").concat(ws.value[1].unit, "\">").concat(ws.value[2].text.toFixed(2).replace('.', ','), " ").concat(ws.value[2].unit, "</td></tr>");
          break;
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    var _iterator9 = _createForOfIteratorHelper(timeRangeWindDirection),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var wd = _step9.value;

        if (parseInt(dateTimeSelect) === wd.datetime) {
          hasil += "<tr>\n\t\t\t\t\t<th>Arah Angin</th>\n\t\t\t\t\t<td width=\"240\">".concat(generateArahAngin(wd.value[1].text), "</td>\n\t\t\t\t</tr>");
          break;
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    return hasil;
  }

  function showCardPrimaryCardSecondary(cardInitialMessage) {
    cardInitialMessage.classList.remove('card__initial-message--d-block');
    document.querySelector('.card__primary').classList.remove('card__primary--d-none');
    document.querySelector('.card__secondary').classList.remove('card__secondary--d-none');
  }

  function getCuaca(paramGetApi, loading, paramGetDataCuacaJson) {
    // loading
    loading.classList.add("loading--d-flex");
    fetch('get-api.php?provinsi=' + paramGetApi.replace(/\s/g, '')).finally(function () {
      // loading selesai
      loading.classList.remove("loading--d-flex");
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Cek koneksi internet kamu!");
      }

      return response.text();
    }).then(function (response) {
      var json = new XmlToJson(response);
      if (json.data === undefined) throw new Error("Cek koneksi internet kamu!");
      console.log(json);
      var cardHeaderh3 = document.querySelector('.card__header h4'); // karena function getCuaca() itu general, bisa digunakan untuk mengambil data cuaca kabupaten berdasarkan parameter provinsi atau data cuaca provinsi berdasarkan parameter Indonesia, maka kita perlu cek apakah function getCuaca() digunakan untuk mengambil data cuaca kabupaten atau provinsi.

      if (paramGetApi !== 'Indonesia') {
        // cek paramGetDataCuacaJson, jika terdapat parameter description
        if (/\[description:/.test(paramGetDataCuacaJson)) {
          /// maka cari data cuaca yang cocok di object json berdasarkan parameter description
          var _iterator10 = _createForOfIteratorHelper(json.data.forecast.area),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var r = _step10.value;

              //// jika description json = paramGetDataCuacaJson
              if (r.description === paramGetDataCuacaJson.split('[description:')[1].replace(/[\s\]]/g, '')) {
                ///// tampilkan ke layar
                cardHeaderh3.innerHTML = "".concat(paramGetDataCuacaJson.split('[description:')[0].replace(/\s$/, ''), "<br>Provinsi ").concat(paramGetApi);
                cardHeaderSelect.innerHTML = generateDateTimeOption(r.parameter[0].timerange);
                var weatherPrimaryInfo = generateWeatherPrimaryInfo(r.parameter[6].timerange, r.parameter[5].timerange, cardHeaderSelect, weatherIcon);
                cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
                cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
                cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;
                var weatherScondaryInfo = generateWeatherScondaryInfo(r.parameter[0].timerange, r.parameter[8].timerange, r.parameter[7].timerange, cardHeaderSelect);
                cardSecondary.innerHTML = weatherScondaryInfo; ///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya

                var cardInitialMessage = document.querySelector('.card__initial-message');
                if (cardInitialMessage.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(cardInitialMessage); ///// simpan isi attribute parameter di localStorage

                localStorage.setItem('parameterCuaca', JSON.stringify(r.parameter));
                return true;
              }
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        } // selain dari itu
        else {
            //// maka cari data yang cocok di object json berdasarkan parameter name[1].text
            var _iterator11 = _createForOfIteratorHelper(json.data.forecast.area),
                _step11;

            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                var _r = _step11.value;

                ///// jika name[1].text json = paramGetDataCuacaJson
                if (_r.name[1].text === paramGetDataCuacaJson) {
                  //// tampilkan ke layar
                  cardHeaderh3.innerHTML = "".concat(paramGetDataCuacaJson, "<br>Provinsi ").concat(paramGetApi);
                  cardHeaderSelect.innerHTML = generateDateTimeOption(_r.parameter[0].timerange);

                  var _weatherPrimaryInfo = generateWeatherPrimaryInfo(_r.parameter[6].timerange, _r.parameter[5].timerange, cardHeaderSelect, weatherIcon);

                  cardHeaderp.innerHTML = _weatherPrimaryInfo.textCuaca;
                  cardStatusIcon.innerHTML = _weatherPrimaryInfo.iconCuaca;
                  cardStatusSuhu.innerHTML = _weatherPrimaryInfo.suhu;

                  var _weatherScondaryInfo = generateWeatherScondaryInfo(_r.parameter[0].timerange, _r.parameter[8].timerange, _r.parameter[7].timerange, cardHeaderSelect);

                  cardSecondary.innerHTML = _weatherScondaryInfo; ///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya

                  var _cardInitialMessage = document.querySelector('.card__initial-message');

                  if (_cardInitialMessage.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(_cardInitialMessage); ///// simpan isi attribute parameter di localStorage

                  localStorage.setItem('parameterCuaca', JSON.stringify(_r.parameter));
                  return true;
                }
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
          }
      } else {
        // maka cari data cuaca yang cocok di object json berdasarkan parameter domain
        var _iterator12 = _createForOfIteratorHelper(json.data.forecast.area),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _r2 = _step12.value;

            ///jika domain json = paramGetDataCuacaJson
            if (_r2.domain === paramGetDataCuacaJson) {
              //// tampilkan ke layar
              cardHeaderh3.innerHTML = "Provinsi ".concat(paramGetDataCuacaJson);
              cardHeaderSelect.innerHTML = generateDateTimeOption(_r2.parameter[0].timerange);

              var _weatherPrimaryInfo2 = generateWeatherPrimaryInfo(_r2.parameter[6].timerange, _r2.parameter[5].timerange, cardHeaderSelect, weatherIcon);

              cardHeaderp.innerHTML = _weatherPrimaryInfo2.textCuaca;
              cardStatusIcon.innerHTML = _weatherPrimaryInfo2.iconCuaca;
              cardStatusSuhu.innerHTML = _weatherPrimaryInfo2.suhu;

              var _weatherScondaryInfo2 = generateWeatherScondaryInfo(_r2.parameter[0].timerange, _r2.parameter[8].timerange, _r2.parameter[7].timerange, cardHeaderSelect);

              cardSecondary.innerHTML = _weatherScondaryInfo2; ///// karena default ketika halaman pertama kali diload card primary dan card secondary di hide, maka kita perlu show keduanya

              var _cardInitialMessage2 = document.querySelector('.card__initial-message');

              if (_cardInitialMessage2.classList.contains('card__initial-message--d-block')) showCardPrimaryCardSecondary(_cardInitialMessage2); ///// simpan isi attribute parameter di localStorage

              localStorage.setItem('parameterCuaca', JSON.stringify(_r2.parameter));
              return true;
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
    }).catch(function (error) {
      document.querySelector('.alert').classList.add('alert--d-flex');
      document.querySelector('.alert p').innerHTML = error;
    });
    return false;
  }

  var btnShow = document.querySelector('a.btn-show');
  btnShow.addEventListener('click', function (e) {
    e.preventDefault(); // jika provinsi dipilih

    if (inputProvinsi.value) {
      /// jika kabupaten dipilih
      if (inputKabupatenKota.value) {
        //// get data cuaca dengan parameter nama provinsi
        getCuaca(inputProvinsi.value, btnShow.nextElementSibling, inputKabupatenKota.dataset.originValue);
      } /// selain dari itu
      else {
          //// get data cuaca dengan parameter 'Indonesia'
          getCuaca('Indonesia', btnShow.nextElementSibling, inputProvinsi.value);
        }
    }
  });
  /** tampil data cuaca berdasarkan dataTime select **/

  cardHeaderSelect.addEventListener('change', function (e) {
    var parameterCuaca = JSON.parse(localStorage.getItem('parameterCuaca')); // jika parameterCuaca ada di localStorage

    if (parameterCuaca !== null) {
      // maka tampilkan ke layar
      var weatherPrimaryInfo = generateWeatherPrimaryInfo(parameterCuaca[6].timerange, parameterCuaca[5].timerange, cardHeaderSelect, weatherIcon);
      cardHeaderp.innerHTML = weatherPrimaryInfo.textCuaca;
      cardStatusIcon.innerHTML = weatherPrimaryInfo.iconCuaca;
      cardStatusSuhu.innerHTML = weatherPrimaryInfo.suhu;
      var weatherScondaryInfo = generateWeatherScondaryInfo(parameterCuaca[0].timerange, parameterCuaca[8].timerange, parameterCuaca[7].timerange, cardHeaderSelect);
      cardSecondary.innerHTML = weatherScondaryInfo;
    }
  });
  /** alert **/

  document.querySelector('.alert__action a').addEventListener('click', function (e) {
    e.preventDefault();
    e.target.parentElement.parentElement.classList.remove('alert--d-flex');
  });
  /** tampil suhu dalam Celsius atau Fahrenheit dan kecepatan angin dalam MPH atau KPH **/

  cardStatusSuhu.addEventListener('click', function (e) {
    var target = e.target;

    if ((target.classList.contains('card__suhuCelsius') || target.classList.contains('card__suhuFahrenheit')) && !target.classList.contains('card__suhuCelsius--active') && !target.classList.contains('card__suhuFahrenheit--active')) {
      e.preventDefault();
      var cardSuhuCelsius = cardStatusSuhu.querySelector('a.card__suhuCelsius');
      var cardSuhuFahrenheit = cardStatusSuhu.querySelector('a.card__suhuFahrenheit');
      var ws = document.querySelector('.card__secondary tr td#ws');

      if (cardSuhuCelsius.classList.contains('card__suhuCelsius--active')) {
        // remove class suhu active yang ada dan tambahkan pada target
        cardSuhuCelsius.classList.remove('card__suhuCelsius--active');
        target.classList.add('card__suhuFahrenheit--active'); // tampil kecepatan angin dalam MPH jika suhu dalam Fahrenheit

        ws.innerHTML = ws.dataset.mph;
      } else if (cardSuhuFahrenheit.classList.contains('card__suhuFahrenheit--active')) {
        // remove class suhu active yang ada dan tambahkan pada target
        cardSuhuFahrenheit.classList.remove('card__suhuFahrenheit--active');
        target.classList.add('card__suhuCelsius--active'); // tampil kecepatan angin dalam KPH jika suhu dalam Celsius

        ws.innerHTML = ws.dataset.kph;
      } // inner suhu ke h1


      cardStatusSuhu.querySelector('h1').innerHTML = target.dataset.suhu;
    }
  });

}());
