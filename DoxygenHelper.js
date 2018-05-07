class DoxygenHelper {


    constructor() {
        this._DocType = this.loadType();
        this._maxdepth = 2;
        this._result = [];
    }


    /*
     * @function _main: entry point
     */
    _main(object) {
        let _all = {},
            _type = this.checkType(object);

        if (_type !== 'object') {
            _all[Object.keys[object][0]] = _type;
        } else {
            _all = Object.assign({}, _all, this.search(object, 1));
        }
        this._result.push(_all);
    }

    /*
     * @function search: deep trace
     */
    search(obj, depth) {
        let _local = {};
        // Or, using array extras
        Object.entries(obj).forEach(([key, value]) => {
            // console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
            var _type = this.checkType(value);
            if (depth < this._maxdepth && _type === 'object' && Object.keys(value).length > 0) {
                _local[key] = this.search(value, depth + 1);
            } else {
                _local[key] = _type;
            }
        });

        return _local;
    }

    /*
     * @function exportToDoxygen: output helper
     */
    exportToDoxygen(object) {

    }

    /*
     * @function loadType: define data types, operations
     */
    loadType() {
        // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
        let _basics = {
                'function': 'function',
                'undefined': 'undefined',
                'string': 'string',
                'boolean': 'boolean',
                'true': 'boolean',
                'false': 'boolean',
                'null': 'null',
                'date': 'date',
            },
            _datastructure = {
                'object': 'object',
                'array': 'array',
                'maps': 'maps',
                'sets': 'sets',
                'weakmaps': 'weakmaps',
                'weaksets': 'weaksets',
                'json': 'json',
            },
            _numbers = {
                'number': 'number',
                'NaN': 'number',
                'Infinity': 'number',
                '-Infinity': 'number',
            },
            _es5 = {
                'Symbol': 'Symbol',
            },
            _types = Object.assign({}, _basics, _datastructure, _numbers, _es5)

        return _types;
    }

    /*
     * @function checkType: classify materials using loadType
     *
     */
    checkType(tmp, print) {
        let _type = '';
        if (this.isFunction(tmp)) {
            _type = 'function';
        } else if (this.isNode(tmp) || this.isElement(tmp)) {
            _type = 'DOM';
        } else if (tmp === null) {
            _type = 'null';
        } else {
            _type = this._DocType[typeof(tmp)]
        }
        return _type;
    }

    /*
     * @function isFunction: function checker
     * https://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
     */
    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    /*
     * @function isNode: Returns true if it is a DOM node
     * https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
     */
    isNode(o) {
        return (
            typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
        );
    }

    /*
     * @function isElement: Returns true if it is a DOM element    
     * https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
     */
    isElement(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    }
}

a = new DoxygenHelper()

a._main(fm)