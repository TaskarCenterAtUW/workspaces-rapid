var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS((exports) => {
  function find(list, predicate, ac) {
    if (ac === undefined) {
      ac = Array.prototype;
    }
    if (list && typeof ac.find === "function") {
      return ac.find.call(list, predicate);
    }
    for (var i = 0;i < list.length; i++) {
      if (hasOwn(list, i)) {
        var item = list[i];
        if (predicate.call(undefined, item, i, list)) {
          return item;
        }
      }
    }
  }
  function freeze(object, oc) {
    if (oc === undefined) {
      oc = Object;
    }
    if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
      object = oc.create(null, oc.getOwnPropertyDescriptors(object));
    }
    return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
  }
  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }
  function assign(target, source) {
    if (target === null || typeof target !== "object") {
      throw new TypeError("target is not an object");
    }
    for (var key in source) {
      if (hasOwn(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var HTML_BOOLEAN_ATTRIBUTES = freeze({
    allowfullscreen: true,
    async: true,
    autofocus: true,
    autoplay: true,
    checked: true,
    controls: true,
    default: true,
    defer: true,
    disabled: true,
    formnovalidate: true,
    hidden: true,
    ismap: true,
    itemscope: true,
    loop: true,
    multiple: true,
    muted: true,
    nomodule: true,
    novalidate: true,
    open: true,
    playsinline: true,
    readonly: true,
    required: true,
    reversed: true,
    selected: true
  });
  function isHTMLBooleanAttribute(name) {
    return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
  }
  var HTML_VOID_ELEMENTS = freeze({
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  });
  function isHTMLVoidElement(tagName) {
    return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
  }
  var HTML_RAW_TEXT_ELEMENTS = freeze({
    script: false,
    style: false,
    textarea: true,
    title: true
  });
  function isHTMLRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLEscapableRawTextElement(tagName) {
    var key = tagName.toLowerCase();
    return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
  }
  function isHTMLMimeType(mimeType) {
    return mimeType === MIME_TYPE.HTML;
  }
  function hasDefaultHTMLNamespace(mimeType) {
    return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
  }
  var MIME_TYPE = freeze({
    HTML: "text/html",
    XML_APPLICATION: "application/xml",
    XML_TEXT: "text/xml",
    XML_XHTML_APPLICATION: "application/xhtml+xml",
    XML_SVG_IMAGE: "image/svg+xml"
  });
  var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
    return MIME_TYPE[key];
  });
  function isValidMimeType(mimeType) {
    return _MIME_TYPES.indexOf(mimeType) > -1;
  }
  var NAMESPACE = freeze({
    HTML: "http://www.w3.org/1999/xhtml",
    SVG: "http://www.w3.org/2000/svg",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/"
  });
  exports.assign = assign;
  exports.find = find;
  exports.freeze = freeze;
  exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
  exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
  exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
  exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
  exports.hasOwn = hasOwn;
  exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
  exports.isHTMLRawTextElement = isHTMLRawTextElement;
  exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
  exports.isHTMLMimeType = isHTMLMimeType;
  exports.isHTMLVoidElement = isHTMLVoidElement;
  exports.isValidMimeType = isValidMimeType;
  exports.MIME_TYPE = MIME_TYPE;
  exports.NAMESPACE = NAMESPACE;
});

// node_modules/@xmldom/xmldom/lib/errors.js
var require_errors = __commonJS((exports) => {
  var conventions = require_conventions();
  function extendError(constructor, writableName) {
    constructor.prototype = Object.create(Error.prototype, {
      constructor: { value: constructor },
      name: { value: constructor.name, enumerable: true, writable: writableName }
    });
  }
  var DOMExceptionName = conventions.freeze({
    Error: "Error",
    IndexSizeError: "IndexSizeError",
    DomstringSizeError: "DomstringSizeError",
    HierarchyRequestError: "HierarchyRequestError",
    WrongDocumentError: "WrongDocumentError",
    InvalidCharacterError: "InvalidCharacterError",
    NoDataAllowedError: "NoDataAllowedError",
    NoModificationAllowedError: "NoModificationAllowedError",
    NotFoundError: "NotFoundError",
    NotSupportedError: "NotSupportedError",
    InUseAttributeError: "InUseAttributeError",
    InvalidStateError: "InvalidStateError",
    SyntaxError: "SyntaxError",
    InvalidModificationError: "InvalidModificationError",
    NamespaceError: "NamespaceError",
    InvalidAccessError: "InvalidAccessError",
    ValidationError: "ValidationError",
    TypeMismatchError: "TypeMismatchError",
    SecurityError: "SecurityError",
    NetworkError: "NetworkError",
    AbortError: "AbortError",
    URLMismatchError: "URLMismatchError",
    QuotaExceededError: "QuotaExceededError",
    TimeoutError: "TimeoutError",
    InvalidNodeTypeError: "InvalidNodeTypeError",
    DataCloneError: "DataCloneError",
    EncodingError: "EncodingError",
    NotReadableError: "NotReadableError",
    UnknownError: "UnknownError",
    ConstraintError: "ConstraintError",
    DataError: "DataError",
    TransactionInactiveError: "TransactionInactiveError",
    ReadOnlyError: "ReadOnlyError",
    VersionError: "VersionError",
    OperationError: "OperationError",
    NotAllowedError: "NotAllowedError",
    OptOutError: "OptOutError"
  });
  var DOMExceptionNames = Object.keys(DOMExceptionName);
  function isValidDomExceptionCode(value) {
    return typeof value === "number" && value >= 1 && value <= 25;
  }
  function endsWithError(value) {
    return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
  }
  function DOMException(messageOrCode, nameOrMessage) {
    if (isValidDomExceptionCode(messageOrCode)) {
      this.name = DOMExceptionNames[messageOrCode];
      this.message = nameOrMessage || "";
    } else {
      this.message = messageOrCode;
      this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
    }
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, DOMException);
  }
  extendError(DOMException, true);
  Object.defineProperties(DOMException.prototype, {
    code: {
      enumerable: true,
      get: function() {
        var code = DOMExceptionNames.indexOf(this.name);
        if (isValidDomExceptionCode(code))
          return code;
        return 0;
      }
    }
  });
  var ExceptionCode = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  };
  var entries = Object.entries(ExceptionCode);
  for (i = 0;i < entries.length; i++) {
    key = entries[i][0];
    DOMException[key] = entries[i][1];
  }
  var key;
  var i;
  function ParseError(message, locator) {
    this.message = message;
    this.locator = locator;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, ParseError);
  }
  extendError(ParseError);
  exports.DOMException = DOMException;
  exports.DOMExceptionName = DOMExceptionName;
  exports.ExceptionCode = ExceptionCode;
  exports.ParseError = ParseError;
});

// node_modules/@xmldom/xmldom/lib/grammar.js
var require_grammar = __commonJS((exports) => {
  function detectUnicodeSupport(RegExpImpl) {
    try {
      if (typeof RegExpImpl !== "function") {
        RegExpImpl = RegExp;
      }
      var match = new RegExpImpl("\uD834\uDF06", "u").exec("\uD834\uDF06");
      return !!match && match[0].length === 2;
    } catch (error) {}
    return false;
  }
  var UNICODE_SUPPORT = detectUnicodeSupport();
  function chars(regexp) {
    if (regexp.source[0] !== "[") {
      throw new Error(regexp + " can not be used with chars");
    }
    return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
  }
  function chars_without(regexp, search) {
    if (regexp.source[0] !== "[") {
      throw new Error("/" + regexp.source + "/ can not be used with chars_without");
    }
    if (!search || typeof search !== "string") {
      throw new Error(JSON.stringify(search) + " is not a valid search");
    }
    if (regexp.source.indexOf(search) === -1) {
      throw new Error('"' + search + '" is not is /' + regexp.source + "/");
    }
    if (search === "-" && regexp.source.indexOf(search) !== 1) {
      throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
    }
    return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
  }
  function reg(args) {
    var self2 = this;
    return new RegExp(Array.prototype.slice.call(arguments).map(function(part) {
      var isStr = typeof part === "string";
      if (isStr && self2 === undefined && part === "|") {
        throw new Error("use regg instead of reg to wrap expressions with `|`!");
      }
      return isStr ? part : part.source;
    }).join(""), UNICODE_SUPPORT ? "mu" : "m");
  }
  function regg(args) {
    if (arguments.length === 0) {
      throw new Error("no parameters provided");
    }
    return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
  }
  var UNICODE_REPLACEMENT_CHARACTER = "�";
  var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var InvalidChar = new RegExp("[^" + chars(Char) + "]", UNICODE_SUPPORT ? "u" : "");
  var _SChar = /[\x20\x09\x0D\x0A]/;
  var SChar_s = chars(_SChar);
  var S = reg(_SChar, "+");
  var S_OPT = reg(_SChar, "*");
  var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  if (UNICODE_SUPPORT) {
    NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
  }
  var NameStartChar_s = chars(NameStartChar);
  var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
  var Name = reg(NameStartChar, NameChar, "*");
  var Nmtoken = reg(NameChar, "+");
  var EntityRef = reg("&", Name, ";");
  var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
  var Reference = regg(EntityRef, "|", CharRef);
  var PEReference = reg("%", Name, ";");
  var EntityValue = regg(reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'), "|", reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'"));
  var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
  var NCNameStartChar = chars_without(NameStartChar, ":");
  var NCNameChar = chars_without(NameChar, ":");
  var NCName = reg(NCNameStartChar, NCNameChar, "*");
  var QName = reg(NCName, regg(":", NCName), "?");
  var QName_exact = reg("^", QName, "$");
  var QName_group = reg("(", QName, ")");
  var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
  var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
  var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
  var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
  var COMMENT_START = "<!--";
  var COMMENT_END = "-->";
  var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
  var PCDATA = "#PCDATA";
  var Mixed = regg(reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/), "|", reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/));
  var _children_quantity = /[?*+]?/;
  var children = reg(/\([^>]+\)/, _children_quantity);
  var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
  var ELEMENTDECL_START = "<!ELEMENT";
  var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
  var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
  var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
  var EnumeratedType = regg(NotationType, "|", Enumeration);
  var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
  var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
  var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
  var ATTLIST_DECL_START = "<!ATTLIST";
  var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
  var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
  var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
  var SYSTEM = "SYSTEM";
  var PUBLIC = "PUBLIC";
  var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
  var ExternalID_match = reg("^", regg(regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"), "|", regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")));
  var PubidLiteral_match = reg("^", PubidLiteral, "$");
  var SystemLiteral_match = reg("^", SystemLiteral, "$");
  var NDataDecl = regg(S, "NDATA", S, Name);
  var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
  var ENTITY_DECL_START = "<!ENTITY";
  var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
  var PEDef = regg(EntityValue, "|", ExternalID);
  var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
  var EntityDecl = regg(GEDecl, "|", PEDecl);
  var PublicID = reg(PUBLIC, S, PubidLiteral);
  var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
  var Eq = reg(S_OPT, "=", S_OPT);
  var VersionNum = /1[.]\d+/;
  var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
  var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
  var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
  var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
  var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
  var DOCTYPE_DECL_START = "<!DOCTYPE";
  var CDATA_START = "<![CDATA[";
  var CDATA_END = "]]>";
  var CDStart = /<!\[CDATA\[/;
  var CDEnd = /\]\]>/;
  var CData = reg(Char, "*?", CDEnd);
  var CDSect = reg(CDStart, CData);
  exports.chars = chars;
  exports.chars_without = chars_without;
  exports.detectUnicodeSupport = detectUnicodeSupport;
  exports.reg = reg;
  exports.regg = regg;
  exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
  exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
  exports.AttlistDecl = AttlistDecl;
  exports.CDATA_START = CDATA_START;
  exports.CDATA_END = CDATA_END;
  exports.CDSect = CDSect;
  exports.Char = Char;
  exports.Comment = Comment;
  exports.COMMENT_START = COMMENT_START;
  exports.COMMENT_END = COMMENT_END;
  exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
  exports.elementdecl = elementdecl;
  exports.EntityDecl = EntityDecl;
  exports.EntityValue = EntityValue;
  exports.ExternalID = ExternalID;
  exports.ExternalID_match = ExternalID_match;
  exports.Name = Name;
  exports.NotationDecl = NotationDecl;
  exports.Reference = Reference;
  exports.PEReference = PEReference;
  exports.PI = PI;
  exports.PUBLIC = PUBLIC;
  exports.PubidLiteral = PubidLiteral;
  exports.PubidLiteral_match = PubidLiteral_match;
  exports.QName = QName;
  exports.QName_exact = QName_exact;
  exports.QName_group = QName_group;
  exports.S = S;
  exports.SChar_s = SChar_s;
  exports.S_OPT = S_OPT;
  exports.SYSTEM = SYSTEM;
  exports.SystemLiteral = SystemLiteral;
  exports.SystemLiteral_match = SystemLiteral_match;
  exports.InvalidChar = InvalidChar;
  exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
  exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
  exports.XMLDecl = XMLDecl;
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS((exports) => {
  var conventions = require_conventions();
  var find = conventions.find;
  var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
  var hasOwn = conventions.hasOwn;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
  var isHTMLVoidElement = conventions.isHTMLVoidElement;
  var MIME_TYPE = conventions.MIME_TYPE;
  var NAMESPACE = conventions.NAMESPACE;
  var PDC = Symbol();
  var errors = require_errors();
  var DOMException = errors.DOMException;
  var DOMExceptionName = errors.DOMExceptionName;
  var g = require_grammar();
  function checkSymbol(symbol) {
    if (symbol !== PDC) {
      throw new TypeError("Illegal constructor");
    }
  }
  function notEmptyString(input) {
    return input !== "";
  }
  function splitOnASCIIWhitespace(input) {
    return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
  }
  function orderedSetReducer(current, element) {
    if (!hasOwn(current, element)) {
      current[element] = true;
    }
    return current;
  }
  function toOrderedSet(input) {
    if (!input)
      return [];
    var list = splitOnASCIIWhitespace(input);
    return Object.keys(list.reduce(orderedSetReducer, {}));
  }
  function arrayIncludes(list) {
    return function(element) {
      return list && list.indexOf(element) !== -1;
    };
  }
  function validateQualifiedName(qualifiedName) {
    if (!g.QName_exact.test(qualifiedName)) {
      throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
    }
  }
  function validateAndExtract(namespace, qualifiedName) {
    validateQualifiedName(qualifiedName);
    namespace = namespace || null;
    var prefix = null;
    var localName = qualifiedName;
    if (qualifiedName.indexOf(":") >= 0) {
      var splitResult = qualifiedName.split(":");
      prefix = splitResult[0];
      localName = splitResult[1];
    }
    if (prefix !== null && namespace === null) {
      throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
    }
    if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
    }
    if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');
    }
    if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
      throw new DOMException(DOMException.NAMESPACE_ERR, 'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');
    }
    return [namespace, prefix, localName];
  }
  function copy(src, dest) {
    for (var p in src) {
      if (hasOwn(src, p)) {
        dest[p] = src[p];
      }
    }
  }
  function _extends(Class, Super) {
    var pt = Class.prototype;
    if (!(pt instanceof Super)) {
      let t = function() {};
      t.prototype = Super.prototype;
      t = new t;
      copy(pt, t);
      Class.prototype = pt = t;
    }
    if (pt.constructor != Class) {
      if (typeof Class != "function") {
        console.error("unknown Class:" + Class);
      }
      pt.constructor = Class;
    }
  }
  var NodeType = {};
  var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = NodeType.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
  var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
  var DocumentPosition = conventions.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
  });
  function commonAncestor(a, b) {
    if (b.length < a.length)
      return commonAncestor(b, a);
    var c = null;
    for (var n in a) {
      if (a[n] !== b[n])
        return c;
      c = a[n];
    }
    return c;
  }
  function docGUID(doc) {
    if (!doc.guid)
      doc.guid = Math.random();
    return doc.guid;
  }
  function NodeList() {}
  NodeList.prototype = {
    length: 0,
    item: function(index) {
      return index >= 0 && index < this.length ? this[index] : null;
    },
    toString: function(options) {
      var opts;
      if (typeof options === "function") {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
      } else if (!!options) {
        opts = {
          requireWellFormed: !!options.requireWellFormed,
          splitCDATASections: options.splitCDATASections !== false,
          nodeFilter: options.nodeFilter || null
        };
      } else {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
      }
      for (var buf = [], i = 0;i < this.length; i++) {
        serializeToString(this[i], buf, null, opts);
      }
      return buf.join("");
    },
    filter: function(predicate) {
      return Array.prototype.filter.call(this, predicate);
    },
    indexOf: function(item) {
      return Array.prototype.indexOf.call(this, item);
    }
  };
  NodeList.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function LiveNodeList(node, refresh) {
    this._node = node;
    this._refresh = refresh;
    _updateLiveList(this);
  }
  function _updateLiveList(list) {
    var inc = list._node._inc || list._node.ownerDocument._inc;
    if (list._inc !== inc) {
      var ls = list._refresh(list._node);
      __set__(list, "length", ls.length);
      if (!list.$$length || ls.length < list.$$length) {
        for (var i = ls.length;i in list; i++) {
          if (hasOwn(list, i)) {
            delete list[i];
          }
        }
      }
      copy(ls, list);
      list._inc = inc;
    }
  }
  LiveNodeList.prototype.item = function(i) {
    _updateLiveList(this);
    return this[i] || null;
  };
  _extends(LiveNodeList, NodeList);
  function NamedNodeMap() {}
  function _findNodeIndex(list, node) {
    var i = 0;
    while (i < list.length) {
      if (list[i] === node) {
        return i;
      }
      i++;
    }
  }
  function _addNamedNode(el, list, newAttr, oldAttr) {
    if (oldAttr) {
      list[_findNodeIndex(list, oldAttr)] = newAttr;
    } else {
      list[list.length] = newAttr;
      list.length++;
    }
    if (el) {
      newAttr.ownerElement = el;
      var doc = el.ownerDocument;
      if (doc) {
        oldAttr && _onRemoveAttribute(doc, el, oldAttr);
        _onAddAttribute(doc, el, newAttr);
      }
    }
  }
  function _removeNamedNode(el, list, attr) {
    var i = _findNodeIndex(list, attr);
    if (i >= 0) {
      var lastIndex = list.length - 1;
      while (i <= lastIndex) {
        list[i] = list[++i];
      }
      list.length = lastIndex;
      if (el) {
        var doc = el.ownerDocument;
        if (doc) {
          _onRemoveAttribute(doc, el, attr);
        }
        attr.ownerElement = null;
      }
    }
  }
  NamedNodeMap.prototype = {
    length: 0,
    item: NodeList.prototype.item,
    getNamedItem: function(localName) {
      if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
        localName = localName.toLowerCase();
      }
      var i = 0;
      while (i < this.length) {
        var attr = this[i];
        if (attr.nodeName === localName) {
          return attr;
        }
        i++;
      }
      return null;
    },
    setNamedItem: function(attr) {
      var el = attr.ownerElement;
      if (el && el !== this._ownerElement) {
        throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
      }
      var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
      if (oldAttr === attr) {
        return attr;
      }
      _addNamedNode(this._ownerElement, this, attr, oldAttr);
      return oldAttr;
    },
    setNamedItemNS: function(attr) {
      return this.setNamedItem(attr);
    },
    removeNamedItem: function(localName) {
      var attr = this.getNamedItem(localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    removeNamedItemNS: function(namespaceURI, localName) {
      var attr = this.getNamedItemNS(namespaceURI, localName);
      if (!attr) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
      }
      _removeNamedNode(this._ownerElement, this, attr);
      return attr;
    },
    getNamedItemNS: function(namespaceURI, localName) {
      if (!namespaceURI) {
        namespaceURI = null;
      }
      var i = 0;
      while (i < this.length) {
        var node = this[i];
        if (node.localName === localName && node.namespaceURI === namespaceURI) {
          return node;
        }
        i++;
      }
      return null;
    }
  };
  NamedNodeMap.prototype[Symbol.iterator] = function() {
    var me = this;
    var index = 0;
    return {
      next: function() {
        if (index < me.length) {
          return {
            value: me[index++],
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      },
      return: function() {
        return {
          done: true
        };
      }
    };
  };
  function DOMImplementation() {}
  DOMImplementation.prototype = {
    hasFeature: function(feature, version) {
      return true;
    },
    createDocument: function(namespaceURI, qualifiedName, doctype) {
      var contentType = MIME_TYPE.XML_APPLICATION;
      if (namespaceURI === NAMESPACE.HTML) {
        contentType = MIME_TYPE.XML_XHTML_APPLICATION;
      } else if (namespaceURI === NAMESPACE.SVG) {
        contentType = MIME_TYPE.XML_SVG_IMAGE;
      }
      var doc = new Document(PDC, { contentType });
      doc.implementation = this;
      doc.childNodes = new NodeList;
      doc.doctype = doctype || null;
      if (doctype) {
        doc.appendChild(doctype);
      }
      if (qualifiedName) {
        var root = doc.createElementNS(namespaceURI, qualifiedName);
        doc.appendChild(root);
      }
      return doc;
    },
    createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
      validateQualifiedName(qualifiedName);
      var node = new DocumentType(PDC);
      node.name = qualifiedName;
      node.nodeName = qualifiedName;
      node.publicId = publicId || "";
      node.systemId = systemId || "";
      node.internalSubset = internalSubset || "";
      node.childNodes = new NodeList;
      return node;
    },
    createHTMLDocument: function(title) {
      var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
      doc.implementation = this;
      doc.childNodes = new NodeList;
      if (title !== false) {
        doc.doctype = this.createDocumentType("html");
        doc.doctype.ownerDocument = doc;
        doc.appendChild(doc.doctype);
        var htmlNode = doc.createElement("html");
        doc.appendChild(htmlNode);
        var headNode = doc.createElement("head");
        htmlNode.appendChild(headNode);
        if (typeof title === "string") {
          var titleNode = doc.createElement("title");
          titleNode.appendChild(doc.createTextNode(title));
          headNode.appendChild(titleNode);
        }
        htmlNode.appendChild(doc.createElement("body"));
      }
      return doc;
    }
  };
  function Node(symbol) {
    checkSymbol(symbol);
  }
  Node.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    parentNode: null,
    get parentElement() {
      return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
    },
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    baseURI: "about:blank",
    get isConnected() {
      var rootNode = this.getRootNode();
      return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
    },
    contains: function(other) {
      if (!other)
        return false;
      var parent = other;
      do {
        if (this === parent)
          return true;
        parent = parent.parentNode;
      } while (parent);
      return false;
    },
    getRootNode: function(options) {
      var parent = this;
      do {
        if (!parent.parentNode) {
          return parent;
        }
        parent = parent.parentNode;
      } while (parent);
    },
    isEqualNode: function(otherNode) {
      if (!otherNode)
        return false;
      var stack = [{ node: this, other: otherNode }];
      while (stack.length > 0) {
        var pair = stack.pop();
        var node = pair.node;
        var other = pair.other;
        if (node.nodeType !== other.nodeType)
          return false;
        switch (node.nodeType) {
          case node.DOCUMENT_TYPE_NODE:
            if (node.name !== other.name)
              return false;
            if (node.publicId !== other.publicId)
              return false;
            if (node.systemId !== other.systemId)
              return false;
            break;
          case node.ELEMENT_NODE:
            if (node.namespaceURI !== other.namespaceURI)
              return false;
            if (node.prefix !== other.prefix)
              return false;
            if (node.localName !== other.localName)
              return false;
            if (node.attributes.length !== other.attributes.length)
              return false;
            for (var i = 0;i < node.attributes.length; i++) {
              var attr = node.attributes.item(i);
              var otherAttr = other.getAttributeNodeNS(attr.namespaceURI, attr.localName);
              if (!otherAttr)
                return false;
              stack.push({ node: attr, other: otherAttr });
            }
            break;
          case node.ATTRIBUTE_NODE:
            if (node.namespaceURI !== other.namespaceURI)
              return false;
            if (node.localName !== other.localName)
              return false;
            if (node.value !== other.value)
              return false;
            break;
          case node.PROCESSING_INSTRUCTION_NODE:
            if (node.target !== other.target || node.data !== other.data)
              return false;
            break;
          case node.TEXT_NODE:
          case node.CDATA_SECTION_NODE:
          case node.COMMENT_NODE:
            if (node.data !== other.data)
              return false;
            break;
        }
        if (node.childNodes.length !== other.childNodes.length)
          return false;
        for (var i = node.childNodes.length - 1;i >= 0; i--) {
          stack.push({ node: node.childNodes[i], other: other.childNodes[i] });
        }
      }
      return true;
    },
    isSameNode: function(otherNode) {
      return this === otherNode;
    },
    insertBefore: function(newChild, refChild) {
      return _insertBefore(this, newChild, refChild);
    },
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      if (oldChild) {
        this.removeChild(oldChild);
      }
    },
    removeChild: function(oldChild) {
      return _removeChild(this, oldChild);
    },
    appendChild: function(newChild) {
      return this.insertBefore(newChild, null);
    },
    hasChildNodes: function() {
      return this.firstChild != null;
    },
    cloneNode: function(deep) {
      return cloneNode(this.ownerDocument || this, this, deep);
    },
    normalize: function() {
      walkDOM(this, null, {
        enter: function(node) {
          var child = node.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (next !== null && next.nodeType === TEXT_NODE && child.nodeType === TEXT_NODE) {
              node.removeChild(next);
              child.appendData(next.data);
            } else {
              child = next;
            }
          }
          return true;
        }
      });
    },
    isSupported: function(feature, version) {
      return this.ownerDocument.implementation.hasFeature(feature, version);
    },
    lookupPrefix: function(namespaceURI) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          for (var n in map) {
            if (hasOwn(map, n) && map[n] === namespaceURI) {
              return n;
            }
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    lookupNamespaceURI: function(prefix) {
      var el = this;
      while (el) {
        var map = el._nsMap;
        if (map) {
          if (hasOwn(map, prefix)) {
            return map[prefix];
          }
        }
        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }
      return null;
    },
    isDefaultNamespace: function(namespaceURI) {
      var prefix = this.lookupPrefix(namespaceURI);
      return prefix == null;
    },
    compareDocumentPosition: function(other) {
      if (this === other)
        return 0;
      var node1 = other;
      var node2 = this;
      var attr1 = null;
      var attr2 = null;
      if (node1 instanceof Attr) {
        attr1 = node1;
        node1 = attr1.ownerElement;
      }
      if (node2 instanceof Attr) {
        attr2 = node2;
        node2 = attr2.ownerElement;
        if (attr1 && node1 && node2 === node1) {
          for (var i = 0, attr;attr = node2.attributes[i]; i++) {
            if (attr === attr1)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            if (attr === attr2)
              return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
        }
      }
      if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
        return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
      }
      if (attr2 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      if (attr1 && node1 === node2) {
        return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
      }
      var chain1 = [];
      var ancestor1 = node1.parentNode;
      while (ancestor1) {
        if (!attr2 && ancestor1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        chain1.push(ancestor1);
        ancestor1 = ancestor1.parentNode;
      }
      chain1.reverse();
      var chain2 = [];
      var ancestor2 = node2.parentNode;
      while (ancestor2) {
        if (!attr1 && ancestor2 === node1) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        chain2.push(ancestor2);
        ancestor2 = ancestor2.parentNode;
      }
      chain2.reverse();
      var ca = commonAncestor(chain1, chain2);
      for (var n in ca.childNodes) {
        var child = ca.childNodes[n];
        if (child === node2)
          return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (child === node1)
          return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        if (chain2.indexOf(child) >= 0)
          return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        if (chain1.indexOf(child) >= 0)
          return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
      }
      return 0;
    }
  };
  function _xmlEncoder(c) {
    return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
  }
  copy(NodeType, Node);
  copy(NodeType, Node.prototype);
  copy(DocumentPosition, Node);
  copy(DocumentPosition, Node.prototype);
  function _visitNode(node, callback) {
    walkDOM(node, null, {
      enter: function(n) {
        return callback(n) ? walkDOM.STOP : true;
      }
    });
  }
  function walkDOM(node, context, callbacks) {
    var stack = [{ node, context, phase: walkDOM.ENTER }];
    while (stack.length > 0) {
      var frame = stack.pop();
      if (frame.phase === walkDOM.ENTER) {
        var childContext = callbacks.enter(frame.node, frame.context);
        if (childContext === walkDOM.STOP) {
          return walkDOM.STOP;
        }
        stack.push({ node: frame.node, context: childContext, phase: walkDOM.EXIT });
        if (childContext === null || childContext === undefined) {
          continue;
        }
        var child = frame.node.lastChild;
        while (child) {
          stack.push({ node: child, context: childContext, phase: walkDOM.ENTER });
          child = child.previousSibling;
        }
      } else {
        if (callbacks.exit) {
          callbacks.exit(frame.node, frame.context);
        }
      }
    }
  }
  walkDOM.STOP = Symbol("walkDOM.STOP");
  walkDOM.ENTER = 0;
  walkDOM.EXIT = 1;
  function Document(symbol, options) {
    checkSymbol(symbol);
    var opt = options || {};
    this.ownerDocument = this;
    this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
    this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
  }
  function _onAddAttribute(doc, el, newAttr) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
    }
  }
  function _onRemoveAttribute(doc, el, newAttr, remove) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;
    if (ns === NAMESPACE.XMLNS) {
      delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
    }
  }
  function _onUpdateChild(doc, parent, newChild) {
    if (doc && doc._inc) {
      doc._inc++;
      var childNodes = parent.childNodes;
      if (newChild && !newChild.nextSibling) {
        childNodes[childNodes.length++] = newChild;
      } else {
        var child = parent.firstChild;
        var i = 0;
        while (child) {
          childNodes[i++] = child;
          child = child.nextSibling;
        }
        childNodes.length = i;
        delete childNodes[childNodes.length];
      }
    }
  }
  function _removeChild(parentNode, child) {
    if (parentNode !== child.parentNode) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
    }
    var oldPreviousSibling = child.previousSibling;
    var oldNextSibling = child.nextSibling;
    if (oldPreviousSibling) {
      oldPreviousSibling.nextSibling = oldNextSibling;
    } else {
      parentNode.firstChild = oldNextSibling;
    }
    if (oldNextSibling) {
      oldNextSibling.previousSibling = oldPreviousSibling;
    } else {
      parentNode.lastChild = oldPreviousSibling;
    }
    _onUpdateChild(parentNode.ownerDocument, parentNode);
    child.parentNode = null;
    child.previousSibling = null;
    child.nextSibling = null;
    return child;
  }
  function hasValidParentNodeType(node) {
    return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
  }
  function hasInsertableNodeType(node) {
    return node && (node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_TYPE_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.TEXT_NODE);
  }
  function isDocTypeNode(node) {
    return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
  }
  function isElementNode(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }
  function isTextNode(node) {
    return node && node.nodeType === Node.TEXT_NODE;
  }
  function isElementInsertionPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function isElementReplacementPossible(doc, child) {
    var parentChildNodes = doc.childNodes || [];
    function hasElementChildThatIsNotChild(node) {
      return isElementNode(node) && node !== child;
    }
    if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
      return false;
    }
    var docTypeNode = find(parentChildNodes, isDocTypeNode);
    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
  }
  function assertPreInsertionValidity1to5(parent, node, child) {
    if (!hasValidParentNodeType(parent)) {
      throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
    }
    if (child && child.parentNode !== parent) {
      throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
    }
    if (!hasInsertableNodeType(node) || isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE) {
      throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType);
    }
  }
  function assertPreInsertionValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementInsertionPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      if (find(parentChildNodes, isDocTypeNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
      if (!child && parentElementChild) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
      }
    }
  }
  function assertPreReplacementValidityInDocument(parent, node, child) {
    var parentChildNodes = parent.childNodes || [];
    var nodeChildNodes = node.childNodes || [];
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      var nodeChildElements = nodeChildNodes.filter(isElementNode);
      if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
      }
      if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
      }
    }
    if (isElementNode(node)) {
      if (!isElementReplacementPossible(parent, child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
      }
    }
    if (isDocTypeNode(node)) {
      let hasDoctypeChildThatIsNotChild = function(node2) {
        return isDocTypeNode(node2) && node2 !== child;
      };
      if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
      }
      var parentElementChild = find(parentChildNodes, isElementNode);
      if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
      }
    }
  }
  function _insertBefore(parent, node, child, _inDocumentAssertion) {
    assertPreInsertionValidity1to5(parent, node, child);
    if (parent.nodeType === Node.DOCUMENT_NODE) {
      (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
    }
    var cp = node.parentNode;
    if (cp) {
      cp.removeChild(node);
    }
    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = node.firstChild;
      if (newFirst == null) {
        return node;
      }
      var newLast = node.lastChild;
    } else {
      newFirst = newLast = node;
    }
    var pre = child ? child.previousSibling : parent.lastChild;
    newFirst.previousSibling = pre;
    newLast.nextSibling = child;
    if (pre) {
      pre.nextSibling = newFirst;
    } else {
      parent.firstChild = newFirst;
    }
    if (child == null) {
      parent.lastChild = newLast;
    } else {
      child.previousSibling = newLast;
    }
    do {
      newFirst.parentNode = parent;
    } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
    _onUpdateChild(parent.ownerDocument || parent, parent, node);
    if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
      node.firstChild = node.lastChild = null;
    }
    return node;
  }
  Document.prototype = {
    implementation: null,
    nodeName: "#document",
    nodeType: DOCUMENT_NODE,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(newChild, refChild) {
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var child = newChild.firstChild;
        while (child) {
          var next = child.nextSibling;
          this.insertBefore(child, refChild);
          child = next;
        }
        return newChild;
      }
      _insertBefore(this, newChild, refChild);
      newChild.ownerDocument = this;
      if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
        this.documentElement = newChild;
      }
      return newChild;
    },
    removeChild: function(oldChild) {
      var removed = _removeChild(this, oldChild);
      if (removed === this.documentElement) {
        this.documentElement = null;
      }
      return removed;
    },
    replaceChild: function(newChild, oldChild) {
      _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
      newChild.ownerDocument = this;
      if (oldChild) {
        this.removeChild(oldChild);
      }
      if (isElementNode(newChild)) {
        this.documentElement = newChild;
      }
    },
    importNode: function(importedNode, deep) {
      return importNode(this, importedNode, deep);
    },
    getElementById: function(id) {
      var rtv = null;
      _visitNode(this.documentElement, function(node) {
        if (node.nodeType == ELEMENT_NODE) {
          if (node.getAttribute("id") == id) {
            rtv = node;
            return true;
          }
        }
      });
      return rtv;
    },
    createElement: function(tagName) {
      var node = new Element(PDC);
      node.ownerDocument = this;
      if (this.type === "html") {
        tagName = tagName.toLowerCase();
      }
      if (hasDefaultHTMLNamespace(this.contentType)) {
        node.namespaceURI = NAMESPACE.HTML;
      }
      node.nodeName = tagName;
      node.tagName = tagName;
      node.localName = tagName;
      node.childNodes = new NodeList;
      var attrs = node.attributes = new NamedNodeMap;
      attrs._ownerElement = node;
      return node;
    },
    createDocumentFragment: function() {
      var node = new DocumentFragment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      return node;
    },
    createTextNode: function(data) {
      var node = new Text(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createComment: function(data) {
      var node = new Comment(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createCDATASection: function(data) {
      if (data.indexOf("]]>") !== -1) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'data contains "]]>"');
      }
      var node = new CDATASection(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.appendData(data);
      return node;
    },
    createProcessingInstruction: function(target, data) {
      var node = new ProcessingInstruction(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = node.target = target;
      node.nodeValue = node.data = data;
      return node;
    },
    createAttribute: function(name) {
      if (!g.QName_exact.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
      }
      if (this.type === "html") {
        name = name.toLowerCase();
      }
      return this._createAttribute(name);
    },
    _createAttribute: function(name) {
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.name = name;
      node.nodeName = name;
      node.localName = name;
      node.specified = true;
      return node;
    },
    createEntityReference: function(name) {
      if (!g.Name.test(name)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
      }
      if (this.type === "html") {
        throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
      }
      var node = new EntityReference(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = name;
      return node;
    },
    createElementNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Element(PDC);
      var attrs = node.attributes = new NamedNodeMap;
      node.childNodes = new NodeList;
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.tagName = qualifiedName;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      attrs._ownerElement = node;
      return node;
    },
    createAttributeNS: function(namespaceURI, qualifiedName) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var node = new Attr(PDC);
      node.ownerDocument = this;
      node.childNodes = new NodeList;
      node.nodeName = qualifiedName;
      node.name = qualifiedName;
      node.specified = true;
      node.namespaceURI = validated[0];
      node.prefix = validated[1];
      node.localName = validated[2];
      return node;
    }
  };
  _extends(Document, Node);
  function Element(symbol) {
    checkSymbol(symbol);
    this._nsMap = Object.create(null);
  }
  Element.prototype = {
    nodeType: ELEMENT_NODE,
    attributes: null,
    getQualifiedName: function() {
      return this.prefix ? this.prefix + ":" + this.localName : this.localName;
    },
    _isInHTMLDocumentAndNamespace: function() {
      return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
    },
    hasAttributes: function() {
      return !!(this.attributes && this.attributes.length);
    },
    hasAttribute: function(name) {
      return !!this.getAttributeNode(name);
    },
    getAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      return attr ? attr.value : null;
    },
    getAttributeNode: function(name) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      return this.attributes.getNamedItem(name);
    },
    setAttribute: function(name, value) {
      if (this._isInHTMLDocumentAndNamespace()) {
        name = name.toLowerCase();
      }
      var attr = this.getAttributeNode(name);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument._createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    removeAttribute: function(name) {
      var attr = this.getAttributeNode(name);
      attr && this.removeAttributeNode(attr);
    },
    setAttributeNode: function(newAttr) {
      return this.attributes.setNamedItem(newAttr);
    },
    setAttributeNodeNS: function(newAttr) {
      return this.attributes.setNamedItemNS(newAttr);
    },
    removeAttributeNode: function(oldAttr) {
      return this.attributes.removeNamedItem(oldAttr.nodeName);
    },
    removeAttributeNS: function(namespaceURI, localName) {
      var old = this.getAttributeNodeNS(namespaceURI, localName);
      old && this.removeAttributeNode(old);
    },
    hasAttributeNS: function(namespaceURI, localName) {
      return this.getAttributeNodeNS(namespaceURI, localName) != null;
    },
    getAttributeNS: function(namespaceURI, localName) {
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      return attr ? attr.value : null;
    },
    setAttributeNS: function(namespaceURI, qualifiedName, value) {
      var validated = validateAndExtract(namespaceURI, qualifiedName);
      var localName = validated[2];
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      if (attr) {
        attr.value = attr.nodeValue = "" + value;
      } else {
        attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      }
    },
    getAttributeNodeNS: function(namespaceURI, localName) {
      return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    getElementsByClassName: function(classNames) {
      var classNamesSet = toOrderedSet(classNames);
      return new LiveNodeList(this, function(base) {
        var ls = [];
        if (classNamesSet.length > 0) {
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE) {
              var nodeClassNames = node.getAttribute("class");
              if (nodeClassNames) {
                var matches = classNames === nodeClassNames;
                if (!matches) {
                  var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                  matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                }
                if (matches) {
                  ls.push(node);
                }
              }
            }
          });
        }
        return ls;
      });
    },
    getElementsByTagName: function(qualifiedName) {
      var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
      var lowerQualifiedName = qualifiedName.toLowerCase();
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node === base || node.nodeType !== ELEMENT_NODE) {
            return;
          }
          if (qualifiedName === "*") {
            ls.push(node);
          } else {
            var nodeQualifiedName = node.getQualifiedName();
            var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
            if (nodeQualifiedName === matchingQName) {
              ls.push(node);
            }
          }
        });
        return ls;
      });
    },
    getElementsByTagNameNS: function(namespaceURI, localName) {
      return new LiveNodeList(this, function(base) {
        var ls = [];
        _visitNode(base, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
            ls.push(node);
          }
        });
        return ls;
      });
    }
  };
  Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
  Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
  Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
  _extends(Element, Node);
  function Attr(symbol) {
    checkSymbol(symbol);
    this.namespaceURI = null;
    this.prefix = null;
    this.ownerElement = null;
  }
  Attr.prototype.nodeType = ATTRIBUTE_NODE;
  _extends(Attr, Node);
  function CharacterData(symbol) {
    checkSymbol(symbol);
  }
  CharacterData.prototype = {
    data: "",
    substringData: function(offset, count) {
      return this.data.substring(offset, offset + count);
    },
    appendData: function(text) {
      text = this.data + text;
      this.nodeValue = this.data = text;
      this.length = text.length;
    },
    insertData: function(offset, text) {
      this.replaceData(offset, 0, text);
    },
    deleteData: function(offset, count) {
      this.replaceData(offset, count, "");
    },
    replaceData: function(offset, count, text) {
      var start = this.data.substring(0, offset);
      var end = this.data.substring(offset + count);
      text = start + text + end;
      this.nodeValue = this.data = text;
      this.length = text.length;
    }
  };
  _extends(CharacterData, Node);
  function Text(symbol) {
    checkSymbol(symbol);
  }
  Text.prototype = {
    nodeName: "#text",
    nodeType: TEXT_NODE,
    splitText: function(offset) {
      var text = this.data;
      var newText = text.substring(offset);
      text = text.substring(0, offset);
      this.data = this.nodeValue = text;
      this.length = text.length;
      var newNode = this.ownerDocument.createTextNode(newText);
      if (this.parentNode) {
        this.parentNode.insertBefore(newNode, this.nextSibling);
      }
      return newNode;
    }
  };
  _extends(Text, CharacterData);
  function Comment(symbol) {
    checkSymbol(symbol);
  }
  Comment.prototype = {
    nodeName: "#comment",
    nodeType: COMMENT_NODE
  };
  _extends(Comment, CharacterData);
  function CDATASection(symbol) {
    checkSymbol(symbol);
  }
  CDATASection.prototype = {
    nodeName: "#cdata-section",
    nodeType: CDATA_SECTION_NODE
  };
  _extends(CDATASection, Text);
  function DocumentType(symbol) {
    checkSymbol(symbol);
  }
  DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
  _extends(DocumentType, Node);
  function Notation(symbol) {
    checkSymbol(symbol);
  }
  Notation.prototype.nodeType = NOTATION_NODE;
  _extends(Notation, Node);
  function Entity(symbol) {
    checkSymbol(symbol);
  }
  Entity.prototype.nodeType = ENTITY_NODE;
  _extends(Entity, Node);
  function EntityReference(symbol) {
    checkSymbol(symbol);
  }
  EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
  _extends(EntityReference, Node);
  function DocumentFragment(symbol) {
    checkSymbol(symbol);
  }
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
  _extends(DocumentFragment, Node);
  function ProcessingInstruction(symbol) {
    checkSymbol(symbol);
  }
  ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
  _extends(ProcessingInstruction, CharacterData);
  function XMLSerializer() {}
  XMLSerializer.prototype.serializeToString = function(node, options) {
    return nodeSerializeToString.call(node, options);
  };
  Node.prototype.toString = nodeSerializeToString;
  function nodeSerializeToString(options) {
    var opts;
    if (typeof options === "function") {
      opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
    } else if (options != null) {
      opts = {
        requireWellFormed: !!options.requireWellFormed,
        splitCDATASections: options.splitCDATASections !== false,
        nodeFilter: options.nodeFilter || null
      };
    } else {
      opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
    }
    var buf = [];
    var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
    var prefix = refNode.prefix;
    var uri = refNode.namespaceURI;
    if (uri && prefix == null) {
      var prefix = refNode.lookupPrefix(uri);
      if (prefix == null) {
        var visibleNamespaces = [
          { namespace: uri, prefix: null }
        ];
      }
    }
    serializeToString(this, buf, visibleNamespaces, opts);
    return buf.join("");
  }
  function needNamespaceDefine(node, isHTML, visibleNamespaces) {
    var prefix = node.prefix || "";
    var uri = node.namespaceURI;
    if (!uri) {
      return false;
    }
    if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
      return false;
    }
    var i = visibleNamespaces.length;
    while (i--) {
      var ns = visibleNamespaces[i];
      if (ns.prefix === prefix) {
        return ns.namespace !== uri;
      }
    }
    return true;
  }
  function addSerializedAttribute(buf, qualifiedName, value) {
    buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
  }
  function serializeToString(node, buf, visibleNamespaces, opts) {
    if (!visibleNamespaces) {
      visibleNamespaces = [];
    }
    var nodeFilter = opts.nodeFilter;
    var requireWellFormed = opts.requireWellFormed;
    var splitCDATASections = opts.splitCDATASections;
    var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
    var isHTML = doc.type === "html";
    walkDOM(node, { ns: visibleNamespaces }, {
      enter: function(n, ctx) {
        var namespaces = ctx.ns;
        if (nodeFilter) {
          n = nodeFilter(n);
          if (n) {
            if (typeof n == "string") {
              buf.push(n);
              return null;
            }
          } else {
            return null;
          }
        }
        switch (n.nodeType) {
          case ELEMENT_NODE:
            var attrs = n.attributes;
            var len = attrs.length;
            var nodeName = n.tagName;
            var prefixedNodeName = nodeName;
            if (!isHTML && !n.prefix && n.namespaceURI) {
              var defaultNS;
              for (var ai = 0;ai < attrs.length; ai++) {
                if (attrs.item(ai).name === "xmlns") {
                  defaultNS = attrs.item(ai).value;
                  break;
                }
              }
              if (!defaultNS) {
                for (var nsi = namespaces.length - 1;nsi >= 0; nsi--) {
                  var nsEntry = namespaces[nsi];
                  if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
                    defaultNS = nsEntry.namespace;
                    break;
                  }
                }
              }
              if (defaultNS !== n.namespaceURI) {
                for (var nsi = namespaces.length - 1;nsi >= 0; nsi--) {
                  var nsEntry = namespaces[nsi];
                  if (nsEntry.namespace === n.namespaceURI) {
                    if (nsEntry.prefix) {
                      prefixedNodeName = nsEntry.prefix + ":" + nodeName;
                    }
                    break;
                  }
                }
              }
            }
            buf.push("<", prefixedNodeName);
            var childNamespaces = namespaces.slice();
            for (var i = 0;i < len; i++) {
              var attr = attrs.item(i);
              if (attr.prefix == "xmlns") {
                childNamespaces.push({
                  prefix: attr.localName,
                  namespace: attr.value
                });
              } else if (attr.nodeName == "xmlns") {
                childNamespaces.push({ prefix: "", namespace: attr.value });
              }
            }
            for (var i = 0;i < len; i++) {
              var attr = attrs.item(i);
              if (needNamespaceDefine(attr, isHTML, childNamespaces)) {
                var attrPrefix = attr.prefix || "";
                var uri = attr.namespaceURI;
                addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri);
                childNamespaces.push({ prefix: attrPrefix, namespace: uri });
              }
              var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
              if (filteredAttr) {
                if (typeof filteredAttr === "string") {
                  buf.push(filteredAttr);
                } else {
                  addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value);
                }
              }
            }
            if (nodeName === prefixedNodeName && needNamespaceDefine(n, isHTML, childNamespaces)) {
              var nodePrefix = n.prefix || "";
              var uri = n.namespaceURI;
              addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri);
              childNamespaces.push({ prefix: nodePrefix, namespace: uri });
            }
            var canCloseTag = !n.firstChild;
            if (canCloseTag && (isHTML || n.namespaceURI === NAMESPACE.HTML)) {
              canCloseTag = isHTMLVoidElement(nodeName);
            }
            if (canCloseTag) {
              buf.push("/>");
              return null;
            }
            buf.push(">");
            if (isHTML && isHTMLRawTextElement(nodeName)) {
              var child = n.firstChild;
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, childNamespaces.slice(), opts);
                }
                child = child.nextSibling;
              }
              buf.push("</", prefixedNodeName, ">");
              return null;
            }
            return { ns: childNamespaces, tag: prefixedNodeName };
          case DOCUMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            if (requireWellFormed && n.nodeType === DOCUMENT_NODE && n.documentElement == null) {
              throw new DOMException("The Document has no documentElement", DOMExceptionName.InvalidStateError);
            }
            return { ns: namespaces };
          case ATTRIBUTE_NODE:
            addSerializedAttribute(buf, n.name, n.value);
            return null;
          case TEXT_NODE:
            if (requireWellFormed && g.InvalidChar.test(n.data)) {
              throw new DOMException("The Text node data contains characters outside the XML Char production", DOMExceptionName.InvalidStateError);
            }
            buf.push(n.data.replace(/[<&>]/g, _xmlEncoder));
            return null;
          case CDATA_SECTION_NODE:
            if (requireWellFormed && n.data.indexOf("]]>") !== -1) {
              throw new DOMException('The CDATASection data contains "]]>"', DOMExceptionName.InvalidStateError);
            }
            if (splitCDATASections) {
              buf.push(g.CDATA_START, n.data.replace(/]]>/g, "]]]]><![CDATA[>"), g.CDATA_END);
            } else {
              buf.push(g.CDATA_START, n.data, g.CDATA_END);
            }
            return null;
          case COMMENT_NODE:
            if (requireWellFormed) {
              if (g.InvalidChar.test(n.data)) {
                throw new DOMException("The comment node data contains characters outside the XML Char production", DOMExceptionName.InvalidStateError);
              }
              if (n.data.indexOf("--") !== -1 || n.data[n.data.length - 1] === "-") {
                throw new DOMException('The comment node data contains "--" or ends with "-"', DOMExceptionName.InvalidStateError);
              }
            }
            buf.push(g.COMMENT_START, n.data, g.COMMENT_END);
            return null;
          case DOCUMENT_TYPE_NODE:
            var pubid = n.publicId;
            var sysid = n.systemId;
            if (requireWellFormed) {
              if (pubid && !g.PubidLiteral_match.test(pubid)) {
                throw new DOMException("DocumentType publicId is not a valid PubidLiteral", DOMExceptionName.InvalidStateError);
              }
              if (sysid && sysid !== "." && !g.SystemLiteral_match.test(sysid)) {
                throw new DOMException("DocumentType systemId is not a valid SystemLiteral", DOMExceptionName.InvalidStateError);
              }
              if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1) {
                throw new DOMException('DocumentType internalSubset contains "]>"', DOMExceptionName.InvalidStateError);
              }
            }
            buf.push(g.DOCTYPE_DECL_START, " ", n.name);
            if (pubid) {
              buf.push(" ", g.PUBLIC, " ", pubid);
              if (sysid && sysid !== ".") {
                buf.push(" ", sysid);
              }
            } else if (sysid && sysid !== ".") {
              buf.push(" ", g.SYSTEM, " ", sysid);
            }
            if (n.internalSubset) {
              buf.push(" [", n.internalSubset, "]");
            }
            buf.push(">");
            return null;
          case PROCESSING_INSTRUCTION_NODE:
            if (requireWellFormed) {
              if (n.target.indexOf(":") !== -1 || n.target.toLowerCase() === "xml") {
                throw new DOMException("The ProcessingInstruction target is not well-formed", DOMExceptionName.InvalidStateError);
              }
              if (g.InvalidChar.test(n.data)) {
                throw new DOMException("The ProcessingInstruction data contains characters outside the XML Char production", DOMExceptionName.InvalidStateError);
              }
              if (n.data.indexOf("?>") !== -1) {
                throw new DOMException('The ProcessingInstruction data contains "?>"', DOMExceptionName.InvalidStateError);
              }
            }
            buf.push("<?", n.target, " ", n.data, "?>");
            return null;
          case ENTITY_REFERENCE_NODE:
            buf.push("&", n.nodeName, ";");
            return null;
          default:
            buf.push("??", n.nodeName);
            return null;
        }
      },
      exit: function(n, childCtx) {
        if (childCtx && childCtx.tag) {
          buf.push("</", childCtx.tag, ">");
        }
      }
    });
  }
  function importNode(doc, node, deep) {
    var destRoot;
    walkDOM(node, null, {
      enter: function(srcNode, destParent) {
        var destNode = srcNode.cloneNode(false);
        destNode.ownerDocument = doc;
        destNode.parentNode = null;
        if (destParent === null) {
          destRoot = destNode;
        } else {
          destParent.appendChild(destNode);
        }
        var shouldDeep = srcNode.nodeType === ATTRIBUTE_NODE || deep;
        return shouldDeep ? destNode : null;
      }
    });
    return destRoot;
  }
  function cloneNode(doc, node, deep) {
    var destRoot;
    walkDOM(node, null, {
      enter: function(srcNode, destParent) {
        var destNode = new srcNode.constructor(PDC);
        for (var n in srcNode) {
          if (hasOwn(srcNode, n)) {
            var v = srcNode[n];
            if (typeof v != "object") {
              if (v != destNode[n]) {
                destNode[n] = v;
              }
            }
          }
        }
        if (srcNode.childNodes) {
          destNode.childNodes = new NodeList;
        }
        destNode.ownerDocument = doc;
        var shouldDeep = deep;
        switch (destNode.nodeType) {
          case ELEMENT_NODE:
            var attrs = srcNode.attributes;
            var attrs2 = destNode.attributes = new NamedNodeMap;
            var len = attrs.length;
            attrs2._ownerElement = destNode;
            for (var i = 0;i < len; i++) {
              destNode.setAttributeNode(cloneNode(doc, attrs.item(i), true));
            }
            break;
          case ATTRIBUTE_NODE:
            shouldDeep = true;
        }
        if (destParent !== null) {
          destParent.appendChild(destNode);
        } else {
          destRoot = destNode;
        }
        return shouldDeep ? destNode : null;
      }
    });
    return destRoot;
  }
  function __set__(object, key, value) {
    object[key] = value;
  }
  function childrenRefresh(node) {
    var ls = [];
    var child = node.firstChild;
    while (child) {
      if (child.nodeType === ELEMENT_NODE) {
        ls.push(child);
      }
      child = child.nextSibling;
    }
    return ls;
  }
  try {
    if (Object.defineProperty) {
      Object.defineProperty(LiveNodeList.prototype, "length", {
        get: function() {
          _updateLiveList(this);
          return this.$$length;
        }
      });
      Object.defineProperty(Node.prototype, "textContent", {
        get: function() {
          if (this.nodeType === ELEMENT_NODE || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
            var buf = [];
            walkDOM(this, null, {
              enter: function(n) {
                if (n.nodeType === ELEMENT_NODE || n.nodeType === DOCUMENT_FRAGMENT_NODE) {
                  return true;
                }
                if (n.nodeType === PROCESSING_INSTRUCTION_NODE || n.nodeType === COMMENT_NODE) {
                  return null;
                }
                buf.push(n.nodeValue);
              }
            });
            return buf.join("");
          }
          return this.nodeValue;
        },
        set: function(data) {
          switch (this.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              while (this.firstChild) {
                this.removeChild(this.firstChild);
              }
              if (data || String(data)) {
                this.appendChild(this.ownerDocument.createTextNode(data));
              }
              break;
            default:
              this.data = data;
              this.value = data;
              this.nodeValue = data;
          }
        }
      });
      Object.defineProperty(Element.prototype, "children", {
        get: function() {
          return new LiveNodeList(this, childrenRefresh);
        }
      });
      Object.defineProperty(Document.prototype, "children", {
        get: function() {
          return new LiveNodeList(this, childrenRefresh);
        }
      });
      Object.defineProperty(DocumentFragment.prototype, "children", {
        get: function() {
          return new LiveNodeList(this, childrenRefresh);
        }
      });
      __set__ = function(object, key, value) {
        object["$$" + key] = value;
      };
    }
  } catch (e) {}
  exports._updateLiveList = _updateLiveList;
  exports.Attr = Attr;
  exports.CDATASection = CDATASection;
  exports.CharacterData = CharacterData;
  exports.Comment = Comment;
  exports.Document = Document;
  exports.DocumentFragment = DocumentFragment;
  exports.DocumentType = DocumentType;
  exports.DOMImplementation = DOMImplementation;
  exports.Element = Element;
  exports.Entity = Entity;
  exports.EntityReference = EntityReference;
  exports.LiveNodeList = LiveNodeList;
  exports.NamedNodeMap = NamedNodeMap;
  exports.Node = Node;
  exports.NodeList = NodeList;
  exports.Notation = Notation;
  exports.Text = Text;
  exports.ProcessingInstruction = ProcessingInstruction;
  exports.walkDOM = walkDOM;
  exports.XMLSerializer = XMLSerializer;
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS((exports) => {
  var freeze = require_conventions().freeze;
  exports.XML_ENTITIES = freeze({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  });
  exports.HTML_ENTITIES = freeze({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "\uD835\uDD04",
    afr: "\uD835\uDD1E",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "\uD835\uDD38",
    aopf: "\uD835\uDD52",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "\uD835\uDC9C",
    ascr: "\uD835\uDCB6",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "\uD835\uDD05",
    bfr: "\uD835\uDD1F",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "\uD835\uDD39",
    bopf: "\uD835\uDD53",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "\uD835\uDCB7",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "\uD835\uDD20",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "\uD835\uDD54",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "\uD835\uDC9E",
    cscr: "\uD835\uDCB8",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "\uD835\uDD07",
    dfr: "\uD835\uDD21",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "\uD835\uDD3B",
    dopf: "\uD835\uDD55",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "\uD835\uDC9F",
    dscr: "\uD835\uDCB9",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "\uD835\uDD08",
    efr: "\uD835\uDD22",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "\uD835\uDD3C",
    eopf: "\uD835\uDD56",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "\uD835\uDD09",
    ffr: "\uD835\uDD23",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "\uD835\uDD3D",
    fopf: "\uD835\uDD57",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "\uD835\uDCBB",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "\uD835\uDD0A",
    gfr: "\uD835\uDD24",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "\uD835\uDD3E",
    gopf: "\uD835\uDD58",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "\uD835\uDCA2",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "\uD835\uDD25",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "\uD835\uDD59",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "\uD835\uDCBD",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "\uD835\uDD26",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "\uD835\uDD40",
    iopf: "\uD835\uDD5A",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "\uD835\uDCBE",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "\uD835\uDD0D",
    jfr: "\uD835\uDD27",
    jmath: "ȷ",
    Jopf: "\uD835\uDD41",
    jopf: "\uD835\uDD5B",
    Jscr: "\uD835\uDCA5",
    jscr: "\uD835\uDCBF",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "\uD835\uDD0E",
    kfr: "\uD835\uDD28",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "\uD835\uDD42",
    kopf: "\uD835\uDD5C",
    Kscr: "\uD835\uDCA6",
    kscr: "\uD835\uDCC0",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "\uD835\uDD0F",
    lfr: "\uD835\uDD29",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "\uD835\uDD43",
    lopf: "\uD835\uDD5D",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "\uD835\uDCC1",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "\uD835\uDD10",
    mfr: "\uD835\uDD2A",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "\uD835\uDD44",
    mopf: "\uD835\uDD5E",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "\uD835\uDCC2",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "\uD835\uDD11",
    nfr: "\uD835\uDD2B",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "\uD835\uDD5F",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "\uD835\uDCA9",
    nscr: "\uD835\uDCC3",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "\uD835\uDD12",
    ofr: "\uD835\uDD2C",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "\uD835\uDD46",
    oopf: "\uD835\uDD60",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "\uD835\uDCAA",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "\uD835\uDD13",
    pfr: "\uD835\uDD2D",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "\uD835\uDD61",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "\uD835\uDCAB",
    pscr: "\uD835\uDCC5",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "\uD835\uDD14",
    qfr: "\uD835\uDD2E",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "\uD835\uDD62",
    qprime: "⁗",
    Qscr: "\uD835\uDCAC",
    qscr: "\uD835\uDCC6",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "\uD835\uDD2F",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "\uD835\uDD63",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "\uD835\uDCC7",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "\uD835\uDD16",
    sfr: "\uD835\uDD30",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "\uD835\uDD4A",
    sopf: "\uD835\uDD64",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "\uD835\uDCAE",
    sscr: "\uD835\uDCC8",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "\uD835\uDD17",
    tfr: "\uD835\uDD31",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "\uD835\uDD4B",
    topf: "\uD835\uDD65",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "\uD835\uDCAF",
    tscr: "\uD835\uDCC9",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "\uD835\uDD18",
    ufr: "\uD835\uDD32",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "\uD835\uDD4C",
    uopf: "\uD835\uDD66",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "\uD835\uDCB0",
    uscr: "\uD835\uDCCA",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "\uD835\uDD19",
    vfr: "\uD835\uDD33",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "\uD835\uDD4D",
    vopf: "\uD835\uDD67",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "\uD835\uDCB1",
    vscr: "\uD835\uDCCB",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "\uD835\uDD1A",
    wfr: "\uD835\uDD34",
    Wopf: "\uD835\uDD4E",
    wopf: "\uD835\uDD68",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "\uD835\uDCB2",
    wscr: "\uD835\uDCCC",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "\uD835\uDD1B",
    xfr: "\uD835\uDD35",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "\uD835\uDD4F",
    xopf: "\uD835\uDD69",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "\uD835\uDCB3",
    xscr: "\uD835\uDCCD",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "\uD835\uDD1C",
    yfr: "\uD835\uDD36",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "\uD835\uDD50",
    yopf: "\uD835\uDD6A",
    Yscr: "\uD835\uDCB4",
    yscr: "\uD835\uDCCE",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "\uD835\uDD37",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "\uD835\uDD6B",
    Zscr: "\uD835\uDCB5",
    zscr: "\uD835\uDCCF",
    zwj: "‍",
    zwnj: "‌"
  });
  exports.entityMap = exports.HTML_ENTITIES;
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS((exports) => {
  var conventions = require_conventions();
  var g = require_grammar();
  var errors = require_errors();
  var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
  var hasOwn = conventions.hasOwn;
  var NAMESPACE = conventions.NAMESPACE;
  var ParseError = errors.ParseError;
  var DOMException = errors.DOMException;
  var S_TAG = 0;
  var S_ATTR = 1;
  var S_ATTR_SPACE = 2;
  var S_EQ = 3;
  var S_ATTR_NOQUOT_VALUE = 4;
  var S_ATTR_END = 5;
  var S_TAG_SPACE = 6;
  var S_TAG_CLOSE = 7;
  function XMLReader() {}
  XMLReader.prototype = {
    parse: function(source, defaultNSMap, entityMap) {
      var domBuilder = this.domBuilder;
      domBuilder.startDocument();
      _copy(defaultNSMap, defaultNSMap = Object.create(null));
      parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
      domBuilder.endDocument();
    }
  };
  var ENTITY_REG = /&#?\w+;?/g;
  function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
    var isHTML = isHTMLMimeType(domBuilder.mimeType);
    if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
      errorHandler.warning("Unicode replacement character detected, source encoding issues?");
    }
    function fixedFromCharCode(code) {
      if (code > 65535) {
        code -= 65536;
        var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      } else {
        return String.fromCharCode(code);
      }
    }
    function entityReplacer(a2) {
      var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
      if (!isHTML && complete !== a2) {
        errorHandler.error("EntityRef: expecting ;");
        return a2;
      }
      var match = g.Reference.exec(complete);
      if (!match || match[0].length !== complete.length) {
        errorHandler.error("entity not matching Reference production: " + a2);
        return a2;
      }
      var k = complete.slice(1, -1);
      if (hasOwn(entityMap, k)) {
        return entityMap[k];
      } else if (k.charAt(0) === "#") {
        return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
      } else {
        errorHandler.error("entity not found:" + a2);
        return a2;
      }
    }
    function appendText(end2) {
      if (end2 > start) {
        var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
        locator && position(start);
        domBuilder.characters(xt, 0, end2 - start);
        start = end2;
      }
    }
    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /\r\n?|\n|$/g;
    var locator = domBuilder.locator;
    function position(p, m) {
      while (p >= lineEnd && (m = linePattern.exec(source))) {
        lineStart = lineEnd;
        lineEnd = m.index + m[0].length;
        locator.lineNumber++;
      }
      locator.columnNumber = p - lineStart + 1;
    }
    var parseStack = [{ currentNSMap: defaultNSMapCopy }];
    var unclosedTags = [];
    var start = 0;
    while (true) {
      try {
        var tagStart = source.indexOf("<", start);
        if (tagStart < 0) {
          if (!isHTML && unclosedTags.length > 0) {
            return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
          }
          if (!source.substring(start).match(/^\s*$/)) {
            var doc = domBuilder.doc;
            var text = doc.createTextNode(source.substring(start));
            if (doc.documentElement) {
              return errorHandler.error("Extra content at the end of the document");
            }
            doc.appendChild(text);
            domBuilder.currentElement = text;
          }
          return;
        }
        if (tagStart > start) {
          var fromSource = source.substring(start, tagStart);
          if (!isHTML && unclosedTags.length === 0) {
            fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
            fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
          }
          appendText(tagStart);
        }
        switch (source.charAt(tagStart + 1)) {
          case "/":
            var end = source.indexOf(">", tagStart + 2);
            var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : undefined);
            if (!tagNameRaw) {
              return errorHandler.fatalError("end tag name missing");
            }
            var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
            if (!tagNameMatch) {
              return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
            }
            if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
              return;
            }
            var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
            if (currentTagName !== tagNameMatch[1]) {
              var tagNameLower = tagNameMatch[1].toLowerCase();
              if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
              }
            }
            var config = parseStack.pop();
            unclosedTags.pop();
            var localNSMap = config.localNSMap;
            domBuilder.endElement(config.uri, config.localName, currentTagName);
            if (localNSMap) {
              for (var prefix in localNSMap) {
                if (hasOwn(localNSMap, prefix)) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }
            }
            end++;
            break;
          case "?":
            locator && position(tagStart);
            end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
            break;
          case "!":
            locator && position(tagStart);
            end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
            break;
          default:
            locator && position(tagStart);
            var el = new ElementAttributes;
            var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
            var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
            var len = el.length;
            if (!el.closed) {
              if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                el.closed = true;
              } else {
                unclosedTags.push(el.tagName);
              }
            }
            if (locator && len) {
              var locator2 = copyLocator(locator, {});
              for (var i = 0;i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.locator = copyLocator(locator, {});
              }
              domBuilder.locator = locator2;
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
              domBuilder.locator = locator;
            } else {
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
            }
            if (isHTML && !el.closed) {
              end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
            } else {
              end++;
            }
        }
      } catch (e) {
        if (e instanceof ParseError) {
          throw e;
        } else if (e instanceof DOMException) {
          throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
        }
        errorHandler.error("element parse error: " + e);
        end = -1;
      }
      if (end > start) {
        start = end;
      } else {
        appendText(Math.max(tagStart, start) + 1);
      }
    }
  }
  function copyLocator(f, t) {
    t.lineNumber = f.lineNumber;
    t.columnNumber = f.columnNumber;
    return t;
  }
  function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
    function addAttribute(qname, value2, startIndex) {
      if (hasOwn(el.attributeNames, qname)) {
        return errorHandler.fatalError("Attribute " + qname + " redefined");
      }
      if (!isHTML && value2.indexOf("<") >= 0) {
        return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
      }
      el.addValue(qname, value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer), startIndex);
    }
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG;
    while (true) {
      var c = source.charAt(p);
      switch (c) {
        case "=":
          if (s === S_ATTR) {
            attrName = source.slice(start, p);
            s = S_EQ;
          } else if (s === S_ATTR_SPACE) {
            s = S_EQ;
          } else {
            throw new Error("attribute equal must after attrName");
          }
          break;
        case "'":
        case '"':
          if (s === S_EQ || s === S_ATTR) {
            if (s === S_ATTR) {
              errorHandler.warning('attribute value must after "="');
              attrName = source.slice(start, p);
            }
            start = p + 1;
            p = source.indexOf(c, start);
            if (p > 0) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start - 1);
              s = S_ATTR_END;
            } else {
              throw new Error("attribute value no end '" + c + "' match");
            }
          } else if (s == S_ATTR_NOQUOT_VALUE) {
            value = source.slice(start, p);
            addAttribute(attrName, value, start);
            errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
            start = p + 1;
            s = S_ATTR_END;
          } else {
            throw new Error('attribute value must after "="');
          }
          break;
        case "/":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              s = S_TAG_CLOSE;
              el.closed = true;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              break;
            case S_ATTR_SPACE:
              el.closed = true;
              break;
            default:
              throw new Error("attribute invalid close char('/')");
          }
          break;
        case "":
          errorHandler.error("unexpected end of input");
          if (s == S_TAG) {
            el.setTagName(source.slice(start, p));
          }
          return p;
        case ">":
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));
            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              break;
            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
              value = source.slice(start, p);
              if (value.slice(-1) === "/") {
                el.closed = true;
                value = value.slice(0, -1);
              }
            case S_ATTR_SPACE:
              if (s === S_ATTR_SPACE) {
                value = attrName;
              }
              if (s == S_ATTR_NOQUOT_VALUE) {
                errorHandler.warning('attribute "' + value + '" missed quot(")!');
                addAttribute(attrName, value, start);
              } else {
                if (!isHTML) {
                  errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                }
                addAttribute(value, value, start);
              }
              break;
            case S_EQ:
              if (!isHTML) {
                return errorHandler.fatalError(`AttValue: ' or " expected`);
              }
          }
          return p;
        case "":
          c = " ";
        default:
          if (c <= " ") {
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
                s = S_TAG_SPACE;
                break;
              case S_ATTR:
                attrName = source.slice(start, p);
                s = S_ATTR_SPACE;
                break;
              case S_ATTR_NOQUOT_VALUE:
                var value = source.slice(start, p);
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                addAttribute(attrName, value, start);
              case S_ATTR_END:
                s = S_TAG_SPACE;
                break;
            }
          } else {
            switch (s) {
              case S_ATTR_SPACE:
                if (!isHTML) {
                  errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                }
                addAttribute(attrName, attrName, start);
                start = p;
                s = S_ATTR;
                break;
              case S_ATTR_END:
                errorHandler.warning('attribute space is required"' + attrName + '"!!');
              case S_TAG_SPACE:
                s = S_ATTR;
                start = p;
                break;
              case S_EQ:
                s = S_ATTR_NOQUOT_VALUE;
                start = p;
                break;
              case S_TAG_CLOSE:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
          }
      }
      p++;
    }
  }
  function appendElement(el, domBuilder, currentNSMap) {
    var tagName = el.tagName;
    var localNSMap = null;
    var i = el.length;
    while (i--) {
      var a = el[i];
      var qName = a.qName;
      var value = a.value;
      var nsp = qName.indexOf(":");
      if (nsp > 0) {
        var prefix = a.prefix = qName.slice(0, nsp);
        var localName = qName.slice(nsp + 1);
        var nsPrefix = prefix === "xmlns" && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === "xmlns" && "";
      }
      a.localName = localName;
      if (nsPrefix !== false) {
        if (localNSMap == null) {
          localNSMap = Object.create(null);
          _copy(currentNSMap, currentNSMap = Object.create(null));
        }
        currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
        a.uri = NAMESPACE.XMLNS;
        domBuilder.startPrefixMapping(nsPrefix, value);
      }
    }
    var i = el.length;
    while (i--) {
      a = el[i];
      if (a.prefix) {
        if (a.prefix === "xml") {
          a.uri = NAMESPACE.XML;
        }
        if (a.prefix !== "xmlns") {
          a.uri = currentNSMap[a.prefix];
        }
      }
    }
    var nsp = tagName.indexOf(":");
    if (nsp > 0) {
      prefix = el.prefix = tagName.slice(0, nsp);
      localName = el.localName = tagName.slice(nsp + 1);
    } else {
      prefix = null;
      localName = el.localName = tagName;
    }
    var ns = el.uri = currentNSMap[prefix || ""];
    domBuilder.startElement(ns, localName, tagName, el);
    if (el.closed) {
      domBuilder.endElement(ns, localName, tagName);
      if (localNSMap) {
        for (prefix in localNSMap) {
          if (hasOwn(localNSMap, prefix)) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      }
    } else {
      el.currentNSMap = currentNSMap;
      el.localNSMap = localNSMap;
      return true;
    }
  }
  function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
    var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
    if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
      var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
      var text = source.substring(elStartEnd + 1, elEndStart);
      if (isEscapableRaw) {
        text = text.replace(ENTITY_REG, entityReplacer);
      }
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
    }
    return elStartEnd + 1;
  }
  function _copy(source, target) {
    for (var n in source) {
      if (hasOwn(source, n)) {
        target[n] = source[n];
      }
    }
  }
  function parseUtils(source, start) {
    var index = start;
    function char(n) {
      n = n || 0;
      return source.charAt(index + n);
    }
    function skip(n) {
      n = n || 1;
      index += n;
    }
    function skipBlanks() {
      var blanks = 0;
      while (index < source.length) {
        var c = char();
        if (c !== " " && c !== `
` && c !== "\t" && c !== "\r") {
          return blanks;
        }
        blanks++;
        skip();
      }
      return -1;
    }
    function substringFromIndex() {
      return source.substring(index);
    }
    function substringStartsWith(text) {
      return source.substring(index, index + text.length) === text;
    }
    function substringStartsWithCaseInsensitive(text) {
      return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
    }
    function getMatch(args) {
      var expr = g.reg("^", args);
      var match = expr.exec(substringFromIndex());
      if (match) {
        skip(match[0].length);
        return match[0];
      }
      return null;
    }
    return {
      char,
      getIndex: function() {
        return index;
      },
      getMatch,
      getSource: function() {
        return source;
      },
      skip,
      skipBlanks,
      substringFromIndex,
      substringStartsWith,
      substringStartsWithCaseInsensitive
    };
  }
  function parseDoctypeInternalSubset(p, errorHandler) {
    function parsePI(p2, errorHandler2) {
      var match = g.PI.exec(p2.substringFromIndex());
      if (!match) {
        return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
      }
      if (match[1].toLowerCase() === "xml") {
        return errorHandler2.fatalError("xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex());
      }
      p2.skip(match[0].length);
      return match[0];
    }
    var source = p.getSource();
    if (p.char() === "[") {
      p.skip(1);
      var intSubsetStart = p.getIndex();
      while (p.getIndex() < source.length) {
        p.skipBlanks();
        if (p.char() === "]") {
          var internalSubset = source.substring(intSubsetStart, p.getIndex());
          p.skip(1);
          return internalSubset;
        }
        var current = null;
        if (p.char() === "<" && p.char(1) === "!") {
          switch (p.char(2)) {
            case "E":
              if (p.char(3) === "L") {
                current = p.getMatch(g.elementdecl);
              } else if (p.char(3) === "N") {
                current = p.getMatch(g.EntityDecl);
              }
              break;
            case "A":
              current = p.getMatch(g.AttlistDecl);
              break;
            case "N":
              current = p.getMatch(g.NotationDecl);
              break;
            case "-":
              current = p.getMatch(g.Comment);
              break;
          }
        } else if (p.char() === "<" && p.char(1) === "?") {
          current = parsePI(p, errorHandler);
        } else if (p.char() === "%") {
          current = p.getMatch(g.PEReference);
        } else {
          return errorHandler.fatalError("Error detected in Markup declaration");
        }
        if (!current) {
          return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
        }
      }
      return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
    }
  }
  function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
    var p = parseUtils(source, start);
    switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
      case "-":
        var comment = p.getMatch(g.Comment);
        if (comment) {
          domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
          return p.getIndex();
        } else {
          return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
        }
      case "[":
        var cdata = p.getMatch(g.CDSect);
        if (cdata) {
          if (!isHTML && !domBuilder.currentElement) {
            return errorHandler.fatalError("CDATA outside of element");
          }
          domBuilder.startCDATA();
          domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
          domBuilder.endCDATA();
          return p.getIndex();
        } else {
          return errorHandler.fatalError("Invalid CDATA starting at position " + start);
        }
      case "D": {
        if (domBuilder.doc && domBuilder.doc.documentElement) {
          return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
        }
        if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
          return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        p.skip(g.DOCTYPE_DECL_START.length);
        if (p.skipBlanks() < 1) {
          return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
        }
        var doctype = {
          name: undefined,
          publicId: undefined,
          systemId: undefined,
          internalSubset: undefined
        };
        doctype.name = p.getMatch(g.Name);
        if (!doctype.name)
          return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
        if (isHTML && doctype.name.toLowerCase() !== "html") {
          errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
        }
        p.skipBlanks();
        if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
          var match = g.ExternalID_match.exec(p.substringFromIndex());
          if (!match) {
            return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
          }
          if (match.groups.SystemLiteralOnly !== undefined) {
            doctype.systemId = match.groups.SystemLiteralOnly;
          } else {
            doctype.systemId = match.groups.SystemLiteral;
            doctype.publicId = match.groups.PubidLiteral;
          }
          p.skip(match[0].length);
        } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
          p.skip(g.SYSTEM.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
          }
          doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
          if (!doctype.systemId) {
            return errorHandler.fatalError("Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex());
          }
        }
        if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
          errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
        }
        if (!isHTML) {
          p.skipBlanks();
          doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
        }
        p.skipBlanks();
        if (p.char() !== ">") {
          return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
        }
        p.skip(1);
        domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
        domBuilder.endDTD();
        return p.getIndex();
      }
      default:
        return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
    }
  }
  function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
    var match = source.substring(start).match(g.PI);
    if (!match) {
      return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
    }
    if (match[1].toLowerCase() === "xml") {
      if (start > 0) {
        return errorHandler.fatalError("processing instruction at position " + start + " is an xml declaration which is only at the start of the document");
      }
      if (!g.XMLDecl.test(source.substring(start))) {
        return errorHandler.fatalError("xml declaration is not well-formed");
      }
    }
    domBuilder.processingInstruction(match[1], match[2]);
    return start + match[0].length;
  }
  function ElementAttributes() {
    this.attributeNames = Object.create(null);
  }
  ElementAttributes.prototype = {
    setTagName: function(tagName) {
      if (!g.QName_exact.test(tagName)) {
        throw new Error("invalid tagName:" + tagName);
      }
      this.tagName = tagName;
    },
    addValue: function(qName, value, offset) {
      if (!g.QName_exact.test(qName)) {
        throw new Error("invalid attribute:" + qName);
      }
      this.attributeNames[qName] = this.length;
      this[this.length++] = { qName, value, offset };
    },
    length: 0,
    getLocalName: function(i) {
      return this[i].localName;
    },
    getLocator: function(i) {
      return this[i].locator;
    },
    getQName: function(i) {
      return this[i].qName;
    },
    getURI: function(i) {
      return this[i].uri;
    },
    getValue: function(i) {
      return this[i].value;
    }
  };
  exports.XMLReader = XMLReader;
  exports.parseUtils = parseUtils;
  exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS((exports) => {
  var conventions = require_conventions();
  var dom = require_dom();
  var errors = require_errors();
  var entities = require_entities();
  var sax = require_sax();
  var DOMImplementation = dom.DOMImplementation;
  var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
  var isHTMLMimeType = conventions.isHTMLMimeType;
  var isValidMimeType = conventions.isValidMimeType;
  var MIME_TYPE = conventions.MIME_TYPE;
  var NAMESPACE = conventions.NAMESPACE;
  var ParseError = errors.ParseError;
  var XMLReader = sax.XMLReader;
  function normalizeLineEndings(input) {
    return input.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
  }
  function DOMParser(options) {
    options = options || {};
    if (options.locator === undefined) {
      options.locator = true;
    }
    this.assign = options.assign || conventions.assign;
    this.domHandler = options.domHandler || DOMHandler;
    this.onError = options.onError || options.errorHandler;
    if (options.errorHandler && typeof options.errorHandler !== "function") {
      throw new TypeError("errorHandler object is no longer supported, switch to onError!");
    } else if (options.errorHandler) {
      options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
    }
    this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
    this.locator = !!options.locator;
    this.xmlns = this.assign(Object.create(null), options.xmlns);
  }
  DOMParser.prototype.parseFromString = function(source, mimeType) {
    if (!isValidMimeType(mimeType)) {
      throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
    }
    var defaultNSMap = this.assign(Object.create(null), this.xmlns);
    var entityMap = entities.XML_ENTITIES;
    var defaultNamespace = defaultNSMap[""] || null;
    if (hasDefaultHTMLNamespace(mimeType)) {
      entityMap = entities.HTML_ENTITIES;
      defaultNamespace = NAMESPACE.HTML;
    } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
      defaultNamespace = NAMESPACE.SVG;
    }
    defaultNSMap[""] = defaultNamespace;
    defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
    var domBuilder = new this.domHandler({
      mimeType,
      defaultNamespace,
      onError: this.onError
    });
    var locator = this.locator ? {} : undefined;
    if (this.locator) {
      domBuilder.setDocumentLocator(locator);
    }
    var sax2 = new XMLReader;
    sax2.errorHandler = domBuilder;
    sax2.domBuilder = domBuilder;
    var isXml = !conventions.isHTMLMimeType(mimeType);
    if (isXml && typeof source !== "string") {
      sax2.errorHandler.fatalError("source is not a string");
    }
    sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
    if (!domBuilder.doc.documentElement) {
      sax2.errorHandler.fatalError("missing root element");
    }
    return domBuilder.doc;
  };
  function DOMHandler(options) {
    var opt = options || {};
    this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
    this.defaultNamespace = opt.defaultNamespace || null;
    this.cdata = false;
    this.currentElement = undefined;
    this.doc = undefined;
    this.locator = undefined;
    this.onError = opt.onError;
  }
  function position(locator, node) {
    node.lineNumber = locator.lineNumber;
    node.columnNumber = locator.columnNumber;
  }
  DOMHandler.prototype = {
    startDocument: function() {
      var impl = new DOMImplementation;
      this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
    },
    startElement: function(namespaceURI, localName, qName, attrs) {
      var doc = this.doc;
      var el = doc.createElementNS(namespaceURI, qName || localName);
      var len = attrs.length;
      appendElement(this, el);
      this.currentElement = el;
      this.locator && position(this.locator, el);
      for (var i = 0;i < len; i++) {
        var namespaceURI = attrs.getURI(i);
        var value = attrs.getValue(i);
        var qName = attrs.getQName(i);
        var attr = doc.createAttributeNS(namespaceURI, qName);
        this.locator && position(attrs.getLocator(i), attr);
        attr.value = attr.nodeValue = value;
        el.setAttributeNode(attr);
      }
    },
    endElement: function(namespaceURI, localName, qName) {
      this.currentElement = this.currentElement.parentNode;
    },
    startPrefixMapping: function(prefix, uri) {},
    endPrefixMapping: function(prefix) {},
    processingInstruction: function(target, data) {
      var ins = this.doc.createProcessingInstruction(target, data);
      this.locator && position(this.locator, ins);
      appendElement(this, ins);
    },
    ignorableWhitespace: function(ch, start, length) {},
    characters: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      if (chars) {
        if (this.cdata) {
          var charNode = this.doc.createCDATASection(chars);
        } else {
          var charNode = this.doc.createTextNode(chars);
        }
        if (this.currentElement) {
          this.currentElement.appendChild(charNode);
        } else if (/^\s*$/.test(chars)) {
          this.doc.appendChild(charNode);
        }
        this.locator && position(this.locator, charNode);
      }
    },
    skippedEntity: function(name) {},
    endDocument: function() {
      this.doc.normalize();
    },
    setDocumentLocator: function(locator) {
      if (locator) {
        locator.lineNumber = 0;
      }
      this.locator = locator;
    },
    comment: function(chars, start, length) {
      chars = _toString.apply(this, arguments);
      var comm = this.doc.createComment(chars);
      this.locator && position(this.locator, comm);
      appendElement(this, comm);
    },
    startCDATA: function() {
      this.cdata = true;
    },
    endCDATA: function() {
      this.cdata = false;
    },
    startDTD: function(name, publicId, systemId, internalSubset) {
      var impl = this.doc.implementation;
      if (impl && impl.createDocumentType) {
        var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
        this.locator && position(this.locator, dt);
        appendElement(this, dt);
        this.doc.doctype = dt;
      }
    },
    reportError: function(level, message) {
      if (typeof this.onError === "function") {
        try {
          this.onError(level, message, this);
        } catch (e) {
          throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
        }
      } else {
        console.error("[xmldom " + level + "]\t" + message, _locator(this.locator));
      }
    },
    warning: function(message) {
      this.reportError("warning", message);
    },
    error: function(message) {
      this.reportError("error", message);
    },
    fatalError: function(message) {
      this.reportError("fatalError", message);
      throw new ParseError(message, this.locator);
    }
  };
  function _locator(l) {
    if (l) {
      return `
@#[line:` + l.lineNumber + ",col:" + l.columnNumber + "]";
    }
  }
  function _toString(chars, start, length) {
    if (typeof chars == "string") {
      return chars.substr(start, length);
    } else {
      if (chars.length >= start + length || start) {
        return new java.lang.String(chars, start, length) + "";
      }
      return chars;
    }
  }
  "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
    DOMHandler.prototype[key] = function() {
      return null;
    };
  });
  function appendElement(handler, node) {
    if (!handler.currentElement) {
      handler.doc.appendChild(node);
    } else {
      handler.currentElement.appendChild(node);
    }
  }
  function onErrorStopParsing(level) {
    if (level === "error")
      throw "onErrorStopParsing";
  }
  function onWarningStopParsing() {
    throw "onWarningStopParsing";
  }
  exports.__DOMHandler = DOMHandler;
  exports.DOMParser = DOMParser;
  exports.normalizeLineEndings = normalizeLineEndings;
  exports.onErrorStopParsing = onErrorStopParsing;
  exports.onWarningStopParsing = onWarningStopParsing;
});

// node_modules/json5/dist/index.js
var require_dist = __commonJS((exports, module) => {
  (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.JSON5 = factory();
  })(exports, function() {
    function createCommonjsModule(fn, module2) {
      return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
    }
    var _global = createCommonjsModule(function(module2) {
      var global = module2.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
      if (typeof __g == "number") {
        __g = global;
      }
    });
    var _core = createCommonjsModule(function(module2) {
      var core = module2.exports = { version: "2.6.5" };
      if (typeof __e == "number") {
        __e = core;
      }
    });
    var _core_1 = _core.version;
    var _isObject = function(it) {
      return typeof it === "object" ? it !== null : typeof it === "function";
    };
    var _anObject = function(it) {
      if (!_isObject(it)) {
        throw TypeError(it + " is not an object!");
      }
      return it;
    };
    var _fails = function(exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
    var _descriptors = !_fails(function() {
      return Object.defineProperty({}, "a", { get: function() {
        return 7;
      } }).a != 7;
    });
    var document = _global.document;
    var is = _isObject(document) && _isObject(document.createElement);
    var _domCreate = function(it) {
      return is ? document.createElement(it) : {};
    };
    var _ie8DomDefine = !_descriptors && !_fails(function() {
      return Object.defineProperty(_domCreate("div"), "a", { get: function() {
        return 7;
      } }).a != 7;
    });
    var _toPrimitive = function(it, S) {
      if (!_isObject(it)) {
        return it;
      }
      var fn, val;
      if (S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
        return val;
      }
      if (typeof (fn = it.valueOf) == "function" && !_isObject(val = fn.call(it))) {
        return val;
      }
      if (!S && typeof (fn = it.toString) == "function" && !_isObject(val = fn.call(it))) {
        return val;
      }
      throw TypeError("Can't convert object to primitive value");
    };
    var dP = Object.defineProperty;
    var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      _anObject(O);
      P = _toPrimitive(P, true);
      _anObject(Attributes);
      if (_ie8DomDefine) {
        try {
          return dP(O, P, Attributes);
        } catch (e) {}
      }
      if ("get" in Attributes || "set" in Attributes) {
        throw TypeError("Accessors not supported!");
      }
      if ("value" in Attributes) {
        O[P] = Attributes.value;
      }
      return O;
    };
    var _objectDp = {
      f
    };
    var _propertyDesc = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
    var _hide = _descriptors ? function(object, key2, value) {
      return _objectDp.f(object, key2, _propertyDesc(1, value));
    } : function(object, key2, value) {
      object[key2] = value;
      return object;
    };
    var hasOwnProperty = {}.hasOwnProperty;
    var _has = function(it, key2) {
      return hasOwnProperty.call(it, key2);
    };
    var id = 0;
    var px = Math.random();
    var _uid = function(key2) {
      return "Symbol(".concat(key2 === undefined ? "" : key2, ")_", (++id + px).toString(36));
    };
    var _library = false;
    var _shared = createCommonjsModule(function(module2) {
      var SHARED = "__core-js_shared__";
      var store = _global[SHARED] || (_global[SHARED] = {});
      (module2.exports = function(key2, value) {
        return store[key2] || (store[key2] = value !== undefined ? value : {});
      })("versions", []).push({
        version: _core.version,
        mode: _library ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
      });
    });
    var _functionToString = _shared("native-function-to-string", Function.toString);
    var _redefine = createCommonjsModule(function(module2) {
      var SRC = _uid("src");
      var TO_STRING = "toString";
      var TPL = ("" + _functionToString).split(TO_STRING);
      _core.inspectSource = function(it) {
        return _functionToString.call(it);
      };
      (module2.exports = function(O, key2, val, safe) {
        var isFunction = typeof val == "function";
        if (isFunction) {
          _has(val, "name") || _hide(val, "name", key2);
        }
        if (O[key2] === val) {
          return;
        }
        if (isFunction) {
          _has(val, SRC) || _hide(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
        }
        if (O === _global) {
          O[key2] = val;
        } else if (!safe) {
          delete O[key2];
          _hide(O, key2, val);
        } else if (O[key2]) {
          O[key2] = val;
        } else {
          _hide(O, key2, val);
        }
      })(Function.prototype, TO_STRING, function toString() {
        return typeof this == "function" && this[SRC] || _functionToString.call(this);
      });
    });
    var _aFunction = function(it) {
      if (typeof it != "function") {
        throw TypeError(it + " is not a function!");
      }
      return it;
    };
    var _ctx = function(fn, that, length) {
      _aFunction(fn);
      if (that === undefined) {
        return fn;
      }
      switch (length) {
        case 1:
          return function(a) {
            return fn.call(that, a);
          };
        case 2:
          return function(a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function(a, b, c2) {
            return fn.call(that, a, b, c2);
          };
      }
      return function() {
        return fn.apply(that, arguments);
      };
    };
    var PROTOTYPE = "prototype";
    var $export = function(type, name, source2) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
      var exports2 = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
      var expProto = exports2[PROTOTYPE] || (exports2[PROTOTYPE] = {});
      var key2, own, out, exp;
      if (IS_GLOBAL) {
        source2 = name;
      }
      for (key2 in source2) {
        own = !IS_FORCED && target && target[key2] !== undefined;
        out = (own ? target : source2)[key2];
        exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == "function" ? _ctx(Function.call, out) : out;
        if (target) {
          _redefine(target, key2, out, type & $export.U);
        }
        if (exports2[key2] != out) {
          _hide(exports2, key2, exp);
        }
        if (IS_PROTO && expProto[key2] != out) {
          expProto[key2] = out;
        }
      }
    };
    _global.core = _core;
    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    $export.U = 64;
    $export.R = 128;
    var _export = $export;
    var ceil = Math.ceil;
    var floor = Math.floor;
    var _toInteger = function(it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
    var _defined = function(it) {
      if (it == undefined) {
        throw TypeError("Can't call method on  " + it);
      }
      return it;
    };
    var _stringAt = function(TO_STRING) {
      return function(that, pos2) {
        var s = String(_defined(that));
        var i = _toInteger(pos2);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) {
          return TO_STRING ? "" : undefined;
        }
        a = s.charCodeAt(i);
        return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
      };
    };
    var $at = _stringAt(false);
    _export(_export.P, "String", {
      codePointAt: function codePointAt2(pos2) {
        return $at(this, pos2);
      }
    });
    var codePointAt = _core.String.codePointAt;
    var max = Math.max;
    var min = Math.min;
    var _toAbsoluteIndex = function(index, length) {
      index = _toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
    var fromCharCode = String.fromCharCode;
    var $fromCodePoint = String.fromCodePoint;
    _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), "String", {
      fromCodePoint: function fromCodePoint2(x) {
        var arguments$1 = arguments;
        var res = [];
        var aLen = arguments.length;
        var i = 0;
        var code;
        while (aLen > i) {
          code = +arguments$1[i++];
          if (_toAbsoluteIndex(code, 1114111) !== code) {
            throw RangeError(code + " is not a valid code point");
          }
          res.push(code < 65536 ? fromCharCode(code) : fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320));
        }
        return res.join("");
      }
    });
    var fromCodePoint = _core.String.fromCodePoint;
    var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
    var unicode = {
      Space_Separator,
      ID_Start,
      ID_Continue
    };
    var util = {
      isSpaceSeparator: function isSpaceSeparator(c2) {
        return typeof c2 === "string" && unicode.Space_Separator.test(c2);
      },
      isIdStartChar: function isIdStartChar(c2) {
        return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
      },
      isIdContinueChar: function isIdContinueChar(c2) {
        return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "‌" || c2 === "‍" || unicode.ID_Continue.test(c2));
      },
      isDigit: function isDigit(c2) {
        return typeof c2 === "string" && /[0-9]/.test(c2);
      },
      isHexDigit: function isHexDigit(c2) {
        return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
      }
    };
    var source;
    var parseState;
    var stack;
    var pos;
    var line;
    var column;
    var token;
    var key;
    var root;
    var parse = function parse2(text, reviver) {
      source = String(text);
      parseState = "start";
      stack = [];
      pos = 0;
      line = 1;
      column = 0;
      token = undefined;
      key = undefined;
      root = undefined;
      do {
        token = lex();
        parseStates[parseState]();
      } while (token.type !== "eof");
      if (typeof reviver === "function") {
        return internalize({ "": root }, "", reviver);
      }
      return root;
    };
    function internalize(holder, name, reviver) {
      var value = holder[name];
      if (value != null && typeof value === "object") {
        if (Array.isArray(value)) {
          for (var i = 0;i < value.length; i++) {
            var key2 = String(i);
            var replacement = internalize(value, key2, reviver);
            if (replacement === undefined) {
              delete value[key2];
            } else {
              Object.defineProperty(value, key2, {
                value: replacement,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        } else {
          for (var key$1 in value) {
            var replacement$1 = internalize(value, key$1, reviver);
            if (replacement$1 === undefined) {
              delete value[key$1];
            } else {
              Object.defineProperty(value, key$1, {
                value: replacement$1,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
      }
      return reviver.call(holder, name, value);
    }
    var lexState;
    var buffer;
    var doubleQuote;
    var sign;
    var c;
    function lex() {
      lexState = "default";
      buffer = "";
      doubleQuote = false;
      sign = 1;
      for (;; ) {
        c = peek();
        var token2 = lexStates[lexState]();
        if (token2) {
          return token2;
        }
      }
    }
    function peek() {
      if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos));
      }
    }
    function read() {
      var c2 = peek();
      if (c2 === `
`) {
        line++;
        column = 0;
      } else if (c2) {
        column += c2.length;
      } else {
        column++;
      }
      if (c2) {
        pos += c2.length;
      }
      return c2;
    }
    var lexStates = {
      default: function default$1() {
        switch (c) {
          case "\t":
          case "\v":
          case "\f":
          case " ":
          case " ":
          case "\uFEFF":
          case `
`:
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            return;
          case "/":
            read();
            lexState = "comment";
            return;
          case undefined:
            read();
            return newToken("eof");
        }
        if (util.isSpaceSeparator(c)) {
          read();
          return;
        }
        return lexStates[parseState]();
      },
      comment: function comment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineComment";
            return;
          case "/":
            read();
            lexState = "singleLineComment";
            return;
        }
        throw invalidChar(read());
      },
      multiLineComment: function multiLineComment() {
        switch (c) {
          case "*":
            read();
            lexState = "multiLineCommentAsterisk";
            return;
          case undefined:
            throw invalidChar(read());
        }
        read();
      },
      multiLineCommentAsterisk: function multiLineCommentAsterisk() {
        switch (c) {
          case "*":
            read();
            return;
          case "/":
            read();
            lexState = "default";
            return;
          case undefined:
            throw invalidChar(read());
        }
        read();
        lexState = "multiLineComment";
      },
      singleLineComment: function singleLineComment() {
        switch (c) {
          case `
`:
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            lexState = "default";
            return;
          case undefined:
            read();
            return newToken("eof");
        }
        read();
      },
      value: function value() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
          case "n":
            read();
            literal("ull");
            return newToken("null", null);
          case "t":
            read();
            literal("rue");
            return newToken("boolean", true);
          case "f":
            read();
            literal("alse");
            return newToken("boolean", false);
          case "-":
          case "+":
            if (read() === "-") {
              sign = -1;
            }
            lexState = "sign";
            return;
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
          case '"':
          case "'":
            doubleQuote = read() === '"';
            buffer = "";
            lexState = "string";
            return;
        }
        throw invalidChar(read());
      },
      identifierNameStartEscape: function identifierNameStartEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        var u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
            break;
          default:
            if (!util.isIdStartChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      identifierName: function identifierName() {
        switch (c) {
          case "$":
          case "_":
          case "‌":
          case "‍":
            buffer += read();
            return;
          case "\\":
            read();
            lexState = "identifierNameEscape";
            return;
        }
        if (util.isIdContinueChar(c)) {
          buffer += read();
          return;
        }
        return newToken("identifier", buffer);
      },
      identifierNameEscape: function identifierNameEscape() {
        if (c !== "u") {
          throw invalidChar(read());
        }
        read();
        var u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
          case "‌":
          case "‍":
            break;
          default:
            if (!util.isIdContinueChar(u)) {
              throw invalidIdentifier();
            }
            break;
        }
        buffer += u;
        lexState = "identifierName";
      },
      sign: function sign$1() {
        switch (c) {
          case ".":
            buffer = read();
            lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read();
            lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read();
            lexState = "decimalInteger";
            return;
          case "I":
            read();
            literal("nfinity");
            return newToken("numeric", sign * Infinity);
          case "N":
            read();
            literal("aN");
            return newToken("numeric", NaN);
        }
        throw invalidChar(read());
      },
      zero: function zero() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
          case "x":
          case "X":
            buffer += read();
            lexState = "hexadecimal";
            return;
        }
        return newToken("numeric", sign * 0);
      },
      decimalInteger: function decimalInteger() {
        switch (c) {
          case ".":
            buffer += read();
            lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalPointLeading: function decimalPointLeading() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        throw invalidChar(read());
      },
      decimalPoint: function decimalPoint() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalFraction";
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalFraction: function decimalFraction() {
        switch (c) {
          case "e":
          case "E":
            buffer += read();
            lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalExponent: function decimalExponent() {
        switch (c) {
          case "+":
          case "-":
            buffer += read();
            lexState = "decimalExponentSign";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentSign: function decimalExponentSign() {
        if (util.isDigit(c)) {
          buffer += read();
          lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentInteger: function decimalExponentInteger() {
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      hexadecimal: function hexadecimal() {
        if (util.isHexDigit(c)) {
          buffer += read();
          lexState = "hexadecimalInteger";
          return;
        }
        throw invalidChar(read());
      },
      hexadecimalInteger: function hexadecimalInteger() {
        if (util.isHexDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      string: function string() {
        switch (c) {
          case "\\":
            read();
            buffer += escape();
            return;
          case '"':
            if (doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case "'":
            if (!doubleQuote) {
              read();
              return newToken("string", buffer);
            }
            buffer += read();
            return;
          case `
`:
          case "\r":
            throw invalidChar(read());
          case "\u2028":
          case "\u2029":
            separatorChar(c);
            break;
          case undefined:
            throw invalidChar(read());
        }
        buffer += read();
      },
      start: function start() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
        }
        lexState = "value";
      },
      beforePropertyName: function beforePropertyName() {
        switch (c) {
          case "$":
          case "_":
            buffer = read();
            lexState = "identifierName";
            return;
          case "\\":
            read();
            lexState = "identifierNameStartEscape";
            return;
          case "}":
            return newToken("punctuator", read());
          case '"':
          case "'":
            doubleQuote = read() === '"';
            lexState = "string";
            return;
        }
        if (util.isIdStartChar(c)) {
          buffer += read();
          lexState = "identifierName";
          return;
        }
        throw invalidChar(read());
      },
      afterPropertyName: function afterPropertyName() {
        if (c === ":") {
          return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforePropertyValue: function beforePropertyValue() {
        lexState = "value";
      },
      afterPropertyValue: function afterPropertyValue() {
        switch (c) {
          case ",":
          case "}":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforeArrayValue: function beforeArrayValue() {
        if (c === "]") {
          return newToken("punctuator", read());
        }
        lexState = "value";
      },
      afterArrayValue: function afterArrayValue() {
        switch (c) {
          case ",":
          case "]":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      end: function end() {
        throw invalidChar(read());
      }
    };
    function newToken(type, value) {
      return {
        type,
        value,
        line,
        column
      };
    }
    function literal(s) {
      for (var i = 0, list = s;i < list.length; i += 1) {
        var c2 = list[i];
        var p = peek();
        if (p !== c2) {
          throw invalidChar(read());
        }
        read();
      }
    }
    function escape() {
      var c2 = peek();
      switch (c2) {
        case "b":
          read();
          return "\b";
        case "f":
          read();
          return "\f";
        case "n":
          read();
          return `
`;
        case "r":
          read();
          return "\r";
        case "t":
          read();
          return "\t";
        case "v":
          read();
          return "\v";
        case "0":
          read();
          if (util.isDigit(peek())) {
            throw invalidChar(read());
          }
          return "\x00";
        case "x":
          read();
          return hexEscape();
        case "u":
          read();
          return unicodeEscape();
        case `
`:
        case "\u2028":
        case "\u2029":
          read();
          return "";
        case "\r":
          read();
          if (peek() === `
`) {
            read();
          }
          return "";
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          throw invalidChar(read());
        case undefined:
          throw invalidChar(read());
      }
      return read();
    }
    function hexEscape() {
      var buffer2 = "";
      var c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      c2 = peek();
      if (!util.isHexDigit(c2)) {
        throw invalidChar(read());
      }
      buffer2 += read();
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    function unicodeEscape() {
      var buffer2 = "";
      var count = 4;
      while (count-- > 0) {
        var c2 = peek();
        if (!util.isHexDigit(c2)) {
          throw invalidChar(read());
        }
        buffer2 += read();
      }
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    var parseStates = {
      start: function start() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforePropertyName: function beforePropertyName() {
        switch (token.type) {
          case "identifier":
          case "string":
            key = token.value;
            parseState = "afterPropertyName";
            return;
          case "punctuator":
            pop();
            return;
          case "eof":
            throw invalidEOF();
        }
      },
      afterPropertyName: function afterPropertyName() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        parseState = "beforePropertyValue";
      },
      beforePropertyValue: function beforePropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        push();
      },
      beforeArrayValue: function beforeArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        if (token.type === "punctuator" && token.value === "]") {
          pop();
          return;
        }
        push();
      },
      afterPropertyValue: function afterPropertyValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforePropertyName";
            return;
          case "}":
            pop();
        }
      },
      afterArrayValue: function afterArrayValue() {
        if (token.type === "eof") {
          throw invalidEOF();
        }
        switch (token.value) {
          case ",":
            parseState = "beforeArrayValue";
            return;
          case "]":
            pop();
        }
      },
      end: function end() {}
    };
    function push() {
      var value;
      switch (token.type) {
        case "punctuator":
          switch (token.value) {
            case "{":
              value = {};
              break;
            case "[":
              value = [];
              break;
          }
          break;
        case "null":
        case "boolean":
        case "numeric":
        case "string":
          value = token.value;
          break;
      }
      if (root === undefined) {
        root = value;
      } else {
        var parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
          parent.push(value);
        } else {
          Object.defineProperty(parent, key, {
            value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      if (value !== null && typeof value === "object") {
        stack.push(value);
        if (Array.isArray(value)) {
          parseState = "beforeArrayValue";
        } else {
          parseState = "beforePropertyName";
        }
      } else {
        var current = stack[stack.length - 1];
        if (current == null) {
          parseState = "end";
        } else if (Array.isArray(current)) {
          parseState = "afterArrayValue";
        } else {
          parseState = "afterPropertyValue";
        }
      }
    }
    function pop() {
      stack.pop();
      var current = stack[stack.length - 1];
      if (current == null) {
        parseState = "end";
      } else if (Array.isArray(current)) {
        parseState = "afterArrayValue";
      } else {
        parseState = "afterPropertyValue";
      }
    }
    function invalidChar(c2) {
      if (c2 === undefined) {
        return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
      }
      return syntaxError("JSON5: invalid character '" + formatChar(c2) + "' at " + line + ":" + column);
    }
    function invalidEOF() {
      return syntaxError("JSON5: invalid end of input at " + line + ":" + column);
    }
    function invalidIdentifier() {
      column -= 5;
      return syntaxError("JSON5: invalid identifier character at " + line + ":" + column);
    }
    function separatorChar(c2) {
      console.warn("JSON5: '" + formatChar(c2) + "' in strings is not valid ECMAScript; consider escaping");
    }
    function formatChar(c2) {
      var replacements = {
        "'": "\\'",
        '"': "\\\"",
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\v",
        "\x00": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c2]) {
        return replacements[c2];
      }
      if (c2 < " ") {
        var hexString = c2.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c2;
    }
    function syntaxError(message) {
      var err = new SyntaxError(message);
      err.lineNumber = line;
      err.columnNumber = column;
      return err;
    }
    var stringify = function stringify2(value, replacer, space) {
      var stack2 = [];
      var indent = "";
      var propertyList;
      var replacerFunc;
      var gap = "";
      var quote;
      if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
        space = replacer.space;
        quote = replacer.quote;
        replacer = replacer.replacer;
      }
      if (typeof replacer === "function") {
        replacerFunc = replacer;
      } else if (Array.isArray(replacer)) {
        propertyList = [];
        for (var i = 0, list = replacer;i < list.length; i += 1) {
          var v = list[i];
          var item = undefined;
          if (typeof v === "string") {
            item = v;
          } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
            item = String(v);
          }
          if (item !== undefined && propertyList.indexOf(item) < 0) {
            propertyList.push(item);
          }
        }
      }
      if (space instanceof Number) {
        space = Number(space);
      } else if (space instanceof String) {
        space = String(space);
      }
      if (typeof space === "number") {
        if (space > 0) {
          space = Math.min(10, Math.floor(space));
          gap = "          ".substr(0, space);
        }
      } else if (typeof space === "string") {
        gap = space.substr(0, 10);
      }
      return serializeProperty("", { "": value });
      function serializeProperty(key2, holder) {
        var value2 = holder[key2];
        if (value2 != null) {
          if (typeof value2.toJSON5 === "function") {
            value2 = value2.toJSON5(key2);
          } else if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key2);
          }
        }
        if (replacerFunc) {
          value2 = replacerFunc.call(holder, key2, value2);
        }
        if (value2 instanceof Number) {
          value2 = Number(value2);
        } else if (value2 instanceof String) {
          value2 = String(value2);
        } else if (value2 instanceof Boolean) {
          value2 = value2.valueOf();
        }
        switch (value2) {
          case null:
            return "null";
          case true:
            return "true";
          case false:
            return "false";
        }
        if (typeof value2 === "string") {
          return quoteString(value2, false);
        }
        if (typeof value2 === "number") {
          return String(value2);
        }
        if (typeof value2 === "object") {
          return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
        }
        return;
      }
      function quoteString(value2) {
        var quotes = {
          "'": 0.1,
          '"': 0.2
        };
        var replacements = {
          "'": "\\'",
          '"': "\\\"",
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "\t": "\\t",
          "\v": "\\v",
          "\x00": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        var product = "";
        for (var i2 = 0;i2 < value2.length; i2++) {
          var c2 = value2[i2];
          switch (c2) {
            case "'":
            case '"':
              quotes[c2]++;
              product += c2;
              continue;
            case "\x00":
              if (util.isDigit(value2[i2 + 1])) {
                product += "\\x00";
                continue;
              }
          }
          if (replacements[c2]) {
            product += replacements[c2];
            continue;
          }
          if (c2 < " ") {
            var hexString = c2.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
            continue;
          }
          product += c2;
        }
        var quoteChar = quote || Object.keys(quotes).reduce(function(a, b) {
          return quotes[a] < quotes[b] ? a : b;
        });
        product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
        return quoteChar + product + quoteChar;
      }
      function serializeObject(value2) {
        if (stack2.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack2.push(value2);
        var stepback = indent;
        indent = indent + gap;
        var keys = propertyList || Object.keys(value2);
        var partial = [];
        for (var i2 = 0, list2 = keys;i2 < list2.length; i2 += 1) {
          var key2 = list2[i2];
          var propertyString = serializeProperty(key2, value2);
          if (propertyString !== undefined) {
            var member = serializeKey(key2) + ":";
            if (gap !== "") {
              member += " ";
            }
            member += propertyString;
            partial.push(member);
          }
        }
        var final;
        if (partial.length === 0) {
          final = "{}";
        } else {
          var properties;
          if (gap === "") {
            properties = partial.join(",");
            final = "{" + properties + "}";
          } else {
            var separator = `,
` + indent;
            properties = partial.join(separator);
            final = `{
` + indent + properties + `,
` + stepback + "}";
          }
        }
        stack2.pop();
        indent = stepback;
        return final;
      }
      function serializeKey(key2) {
        if (key2.length === 0) {
          return quoteString(key2, true);
        }
        var firstChar = String.fromCodePoint(key2.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
          return quoteString(key2, true);
        }
        for (var i2 = firstChar.length;i2 < key2.length; i2++) {
          if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i2)))) {
            return quoteString(key2, true);
          }
        }
        return key2;
      }
      function serializeArray(value2) {
        if (stack2.indexOf(value2) >= 0) {
          throw TypeError("Converting circular structure to JSON5");
        }
        stack2.push(value2);
        var stepback = indent;
        indent = indent + gap;
        var partial = [];
        for (var i2 = 0;i2 < value2.length; i2++) {
          var propertyString = serializeProperty(String(i2), value2);
          partial.push(propertyString !== undefined ? propertyString : "null");
        }
        var final;
        if (partial.length === 0) {
          final = "[]";
        } else {
          if (gap === "") {
            var properties = partial.join(",");
            final = "[" + properties + "]";
          } else {
            var separator = `,
` + indent;
            var properties$1 = partial.join(separator);
            final = `[
` + indent + properties$1 + `,
` + stepback + "]";
          }
        }
        stack2.pop();
        indent = stepback;
        return final;
      }
    };
    var JSON5 = {
      parse,
      stringify
    };
    var lib = JSON5;
    var es5 = lib;
    return es5;
  });
});

// node_modules/@mapbox/vector-tile/node_modules/@mapbox/point-geometry/index.js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype = {
  clone() {
    return new Point(this.x, this.y);
  },
  add(p) {
    return this.clone()._add(p);
  },
  sub(p) {
    return this.clone()._sub(p);
  },
  multByPoint(p) {
    return this.clone()._multByPoint(p);
  },
  divByPoint(p) {
    return this.clone()._divByPoint(p);
  },
  mult(k) {
    return this.clone()._mult(k);
  },
  div(k) {
    return this.clone()._div(k);
  },
  rotate(a) {
    return this.clone()._rotate(a);
  },
  rotateAround(a, p) {
    return this.clone()._rotateAround(a, p);
  },
  matMult(m) {
    return this.clone()._matMult(m);
  },
  unit() {
    return this.clone()._unit();
  },
  perp() {
    return this.clone()._perp();
  },
  round() {
    return this.clone()._round();
  },
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  equals(other) {
    return this.x === other.x && this.y === other.y;
  },
  dist(p) {
    return Math.sqrt(this.distSqr(p));
  },
  distSqr(p) {
    const dx = p.x - this.x, dy = p.y - this.y;
    return dx * dx + dy * dy;
  },
  angle() {
    return Math.atan2(this.y, this.x);
  },
  angleTo(b) {
    return Math.atan2(this.y - b.y, this.x - b.x);
  },
  angleWith(b) {
    return this.angleWithSep(b.x, b.y);
  },
  angleWithSep(x, y) {
    return Math.atan2(this.x * y - this.y * x, this.x * x + this.y * y);
  },
  _matMult(m) {
    const x = m[0] * this.x + m[1] * this.y, y = m[2] * this.x + m[3] * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _add(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  },
  _sub(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  },
  _mult(k) {
    this.x *= k;
    this.y *= k;
    return this;
  },
  _div(k) {
    this.x /= k;
    this.y /= k;
    return this;
  },
  _multByPoint(p) {
    this.x *= p.x;
    this.y *= p.y;
    return this;
  },
  _divByPoint(p) {
    this.x /= p.x;
    this.y /= p.y;
    return this;
  },
  _unit() {
    this._div(this.mag());
    return this;
  },
  _perp() {
    const y = this.y;
    this.y = this.x;
    this.x = -y;
    return this;
  },
  _rotate(angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle), x = cos * this.x - sin * this.y, y = sin * this.x + cos * this.y;
    this.x = x;
    this.y = y;
    return this;
  },
  _rotateAround(angle, p) {
    const cos = Math.cos(angle), sin = Math.sin(angle), x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y), y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
    this.x = x;
    this.y = y;
    return this;
  },
  _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },
  constructor: Point
};
Point.convert = function(p) {
  if (p instanceof Point) {
    return p;
  }
  if (Array.isArray(p)) {
    return new Point(+p[0], +p[1]);
  }
  if (p.x !== undefined && p.y !== undefined) {
    return new Point(+p.x, +p.y);
  }
  throw new Error("Expected [x, y] or {x, y} point format");
};

// node_modules/@mapbox/vector-tile/index.js
class VectorTileFeature {
  constructor(pbf, end, extent, keys, values) {
    this.properties = {};
    this.extent = extent;
    this.type = 0;
    this.id = undefined;
    this._pbf = pbf;
    this._geometry = -1;
    this._keys = keys;
    this._values = values;
    pbf.readFields(readFeature, this, end);
  }
  loadGeometry() {
    const pbf = this._pbf;
    pbf.pos = this._geometry;
    const end = pbf.readVarint() + pbf.pos;
    const lines = [];
    let line;
    let cmd = 1;
    let length = 0;
    let x = 0;
    let y = 0;
    while (pbf.pos < end) {
      if (length <= 0) {
        const cmdLen = pbf.readVarint();
        cmd = cmdLen & 7;
        length = cmdLen >> 3;
      }
      length--;
      if (cmd === 1 || cmd === 2) {
        x += pbf.readSVarint();
        y += pbf.readSVarint();
        if (cmd === 1) {
          if (line)
            lines.push(line);
          line = [];
        }
        if (line)
          line.push(new Point(x, y));
      } else if (cmd === 7) {
        if (line) {
          line.push(line[0].clone());
        }
      } else {
        throw new Error(`unknown command ${cmd}`);
      }
    }
    if (line)
      lines.push(line);
    return lines;
  }
  bbox() {
    const pbf = this._pbf;
    pbf.pos = this._geometry;
    const end = pbf.readVarint() + pbf.pos;
    let cmd = 1, length = 0, x = 0, y = 0, x1 = Infinity, x2 = -Infinity, y1 = Infinity, y2 = -Infinity;
    while (pbf.pos < end) {
      if (length <= 0) {
        const cmdLen = pbf.readVarint();
        cmd = cmdLen & 7;
        length = cmdLen >> 3;
      }
      length--;
      if (cmd === 1 || cmd === 2) {
        x += pbf.readSVarint();
        y += pbf.readSVarint();
        if (x < x1)
          x1 = x;
        if (x > x2)
          x2 = x;
        if (y < y1)
          y1 = y;
        if (y > y2)
          y2 = y;
      } else if (cmd !== 7) {
        throw new Error(`unknown command ${cmd}`);
      }
    }
    return [x1, y1, x2, y2];
  }
  toGeoJSON(x, y, z) {
    const size = this.extent * Math.pow(2, z), x0 = this.extent * x, y0 = this.extent * y, vtCoords = this.loadGeometry();
    function projectPoint(p) {
      return [
        (p.x + x0) * 360 / size - 180,
        360 / Math.PI * Math.atan(Math.exp((1 - (p.y + y0) * 2 / size) * Math.PI)) - 90
      ];
    }
    function projectLine(line) {
      return line.map(projectPoint);
    }
    let geometry;
    if (this.type === 1) {
      const points = [];
      for (const line of vtCoords) {
        points.push(line[0]);
      }
      const coordinates = projectLine(points);
      geometry = points.length === 1 ? { type: "Point", coordinates: coordinates[0] } : { type: "MultiPoint", coordinates };
    } else if (this.type === 2) {
      const coordinates = vtCoords.map(projectLine);
      geometry = coordinates.length === 1 ? { type: "LineString", coordinates: coordinates[0] } : { type: "MultiLineString", coordinates };
    } else if (this.type === 3) {
      const polygons = classifyRings(vtCoords);
      const coordinates = [];
      for (const polygon of polygons) {
        coordinates.push(polygon.map(projectLine));
      }
      geometry = coordinates.length === 1 ? { type: "Polygon", coordinates: coordinates[0] } : { type: "MultiPolygon", coordinates };
    } else {
      throw new Error("unknown feature type");
    }
    const result = {
      type: "Feature",
      geometry,
      properties: this.properties
    };
    if (this.id != null) {
      result.id = this.id;
    }
    return result;
  }
}
VectorTileFeature.types = ["Unknown", "Point", "LineString", "Polygon"];
function readFeature(tag, feature, pbf) {
  if (tag === 1)
    feature.id = pbf.readVarint();
  else if (tag === 2)
    readTag(pbf, feature);
  else if (tag === 3)
    feature.type = pbf.readVarint();
  else if (tag === 4)
    feature._geometry = pbf.pos;
}
function readTag(pbf, feature) {
  const end = pbf.readVarint() + pbf.pos;
  while (pbf.pos < end) {
    const key = feature._keys[pbf.readVarint()];
    const value = feature._values[pbf.readVarint()];
    feature.properties[key] = value;
  }
}
function classifyRings(rings) {
  const len = rings.length;
  if (len <= 1)
    return [rings];
  const polygons = [];
  let polygon, ccw;
  for (let i = 0;i < len; i++) {
    const area = signedArea(rings[i]);
    if (area === 0)
      continue;
    if (ccw === undefined)
      ccw = area < 0;
    if (ccw === area < 0) {
      if (polygon)
        polygons.push(polygon);
      polygon = [rings[i]];
    } else if (polygon) {
      polygon.push(rings[i]);
    }
  }
  if (polygon)
    polygons.push(polygon);
  return polygons;
}
function signedArea(ring) {
  let sum = 0;
  for (let i = 0, len = ring.length, j = len - 1, p1, p2;i < len; j = i++) {
    p1 = ring[i];
    p2 = ring[j];
    sum += (p2.x - p1.x) * (p1.y + p2.y);
  }
  return sum;
}

class VectorTileLayer {
  constructor(pbf, end) {
    this.version = 1;
    this.name = "";
    this.extent = 4096;
    this.length = 0;
    this._pbf = pbf;
    this._keys = [];
    this._values = [];
    this._features = [];
    pbf.readFields(readLayer, this, end);
    this.length = this._features.length;
  }
  feature(i) {
    if (i < 0 || i >= this._features.length)
      throw new Error("feature index out of bounds");
    this._pbf.pos = this._features[i];
    const end = this._pbf.readVarint() + this._pbf.pos;
    return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
  }
}
function readLayer(tag, layer, pbf) {
  if (tag === 15)
    layer.version = pbf.readVarint();
  else if (tag === 1)
    layer.name = pbf.readString();
  else if (tag === 5)
    layer.extent = pbf.readVarint();
  else if (tag === 2)
    layer._features.push(pbf.pos);
  else if (tag === 3)
    layer._keys.push(pbf.readString());
  else if (tag === 4)
    layer._values.push(readValueMessage(pbf));
}
function readValueMessage(pbf) {
  let value = null;
  const end = pbf.readVarint() + pbf.pos;
  while (pbf.pos < end) {
    const tag = pbf.readVarint() >> 3;
    value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
  }
  if (value == null) {
    throw new Error("unknown feature value");
  }
  return value;
}

class VectorTile {
  constructor(pbf, end) {
    this.layers = pbf.readFields(readTile, {}, end);
  }
}
function readTile(tag, layers, pbf) {
  if (tag === 3) {
    const layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
    if (layer.length)
      layers[layer.name] = layer;
  }
}

// node_modules/pbf/index.js
var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
var TEXT_DECODER_MIN_LENGTH = 12;
var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
var PBF_VARINT = 0;
var PBF_FIXED64 = 1;
var PBF_BYTES = 2;
var PBF_FIXED32 = 5;

class Pbf {
  constructor(buf = new Uint8Array(16)) {
    this.buf = ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf);
    this.dataView = new DataView(this.buf.buffer);
    this.pos = 0;
    this.type = 0;
    this.length = this.buf.length;
  }
  readFields(readField, result, end = this.length) {
    while (this.pos < end) {
      const val = this.readVarint(), tag = val >> 3, startPos = this.pos;
      this.type = val & 7;
      readField(tag, result, this);
      if (this.pos === startPos)
        this.skip(val);
    }
    return result;
  }
  readMessage(readField, result) {
    return this.readFields(readField, result, this.readVarint() + this.pos);
  }
  readFixed32() {
    const val = this.dataView.getUint32(this.pos, true);
    this.pos += 4;
    return val;
  }
  readSFixed32() {
    const val = this.dataView.getInt32(this.pos, true);
    this.pos += 4;
    return val;
  }
  readFixed64() {
    const val = this.dataView.getUint32(this.pos, true) + this.dataView.getUint32(this.pos + 4, true) * SHIFT_LEFT_32;
    this.pos += 8;
    return val;
  }
  readSFixed64() {
    const val = this.dataView.getUint32(this.pos, true) + this.dataView.getInt32(this.pos + 4, true) * SHIFT_LEFT_32;
    this.pos += 8;
    return val;
  }
  readFloat() {
    const val = this.dataView.getFloat32(this.pos, true);
    this.pos += 4;
    return val;
  }
  readDouble() {
    const val = this.dataView.getFloat64(this.pos, true);
    this.pos += 8;
    return val;
  }
  readVarint(isSigned) {
    const buf = this.buf;
    let val, b;
    b = buf[this.pos++];
    val = b & 127;
    if (b < 128)
      return val;
    b = buf[this.pos++];
    val |= (b & 127) << 7;
    if (b < 128)
      return val;
    b = buf[this.pos++];
    val |= (b & 127) << 14;
    if (b < 128)
      return val;
    b = buf[this.pos++];
    val |= (b & 127) << 21;
    if (b < 128)
      return val;
    b = buf[this.pos];
    val |= (b & 15) << 28;
    return readVarintRemainder(val, isSigned, this);
  }
  readVarint64() {
    return this.readVarint(true);
  }
  readSVarint() {
    const num = this.readVarint();
    return num % 2 === 1 ? (num + 1) / -2 : num / 2;
  }
  readBoolean() {
    return Boolean(this.readVarint());
  }
  readString() {
    const end = this.readVarint() + this.pos;
    const pos = this.pos;
    this.pos = end;
    if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
      return utf8TextDecoder.decode(this.buf.subarray(pos, end));
    }
    return readUtf8(this.buf, pos, end);
  }
  readBytes() {
    const end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
    this.pos = end;
    return buffer;
  }
  readPackedVarint(arr = [], isSigned) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readVarint(isSigned));
    return arr;
  }
  readPackedSVarint(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readSVarint());
    return arr;
  }
  readPackedBoolean(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readBoolean());
    return arr;
  }
  readPackedFloat(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readFloat());
    return arr;
  }
  readPackedDouble(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readDouble());
    return arr;
  }
  readPackedFixed32(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readFixed32());
    return arr;
  }
  readPackedSFixed32(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readSFixed32());
    return arr;
  }
  readPackedFixed64(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readFixed64());
    return arr;
  }
  readPackedSFixed64(arr = []) {
    const end = this.readPackedEnd();
    while (this.pos < end)
      arr.push(this.readSFixed64());
    return arr;
  }
  readPackedEnd() {
    return this.type === PBF_BYTES ? this.readVarint() + this.pos : this.pos + 1;
  }
  skip(val) {
    const type = val & 7;
    if (type === PBF_VARINT)
      while (this.buf[this.pos++] > 127) {}
    else if (type === PBF_BYTES)
      this.pos = this.readVarint() + this.pos;
    else if (type === PBF_FIXED32)
      this.pos += 4;
    else if (type === PBF_FIXED64)
      this.pos += 8;
    else
      throw new Error(`Unimplemented type: ${type}`);
  }
  writeTag(tag, type) {
    this.writeVarint(tag << 3 | type);
  }
  realloc(min) {
    let length = this.length || 16;
    while (length < this.pos + min)
      length *= 2;
    if (length !== this.length) {
      const buf = new Uint8Array(length);
      buf.set(this.buf);
      this.buf = buf;
      this.dataView = new DataView(buf.buffer);
      this.length = length;
    }
  }
  finish() {
    this.length = this.pos;
    this.pos = 0;
    return this.buf.subarray(0, this.length);
  }
  writeFixed32(val) {
    this.realloc(4);
    this.dataView.setInt32(this.pos, val, true);
    this.pos += 4;
  }
  writeSFixed32(val) {
    this.realloc(4);
    this.dataView.setInt32(this.pos, val, true);
    this.pos += 4;
  }
  writeFixed64(val) {
    this.realloc(8);
    this.dataView.setInt32(this.pos, val & -1, true);
    this.dataView.setInt32(this.pos + 4, Math.floor(val * SHIFT_RIGHT_32), true);
    this.pos += 8;
  }
  writeSFixed64(val) {
    this.realloc(8);
    this.dataView.setInt32(this.pos, val & -1, true);
    this.dataView.setInt32(this.pos + 4, Math.floor(val * SHIFT_RIGHT_32), true);
    this.pos += 8;
  }
  writeVarint(val) {
    val = +val || 0;
    if (val > 268435455 || val < 0) {
      writeBigVarint(val, this);
      return;
    }
    this.realloc(4);
    this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
    if (val <= 127)
      return;
    this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
    if (val <= 127)
      return;
    this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
    if (val <= 127)
      return;
    this.buf[this.pos++] = val >>> 7 & 127;
  }
  writeSVarint(val) {
    this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
  }
  writeBoolean(val) {
    this.writeVarint(+val);
  }
  writeString(str) {
    str = String(str);
    this.realloc(str.length * 4);
    this.pos++;
    const startPos = this.pos;
    this.pos = writeUtf8(this.buf, str, this.pos);
    const len = this.pos - startPos;
    if (len >= 128)
      makeRoomForExtraLength(startPos, len, this);
    this.pos = startPos - 1;
    this.writeVarint(len);
    this.pos += len;
  }
  writeFloat(val) {
    this.realloc(4);
    this.dataView.setFloat32(this.pos, val, true);
    this.pos += 4;
  }
  writeDouble(val) {
    this.realloc(8);
    this.dataView.setFloat64(this.pos, val, true);
    this.pos += 8;
  }
  writeBytes(buffer) {
    const len = buffer.length;
    this.writeVarint(len);
    this.realloc(len);
    for (let i = 0;i < len; i++)
      this.buf[this.pos++] = buffer[i];
  }
  writeRawMessage(fn, obj) {
    this.pos++;
    const startPos = this.pos;
    fn(obj, this);
    const len = this.pos - startPos;
    if (len >= 128)
      makeRoomForExtraLength(startPos, len, this);
    this.pos = startPos - 1;
    this.writeVarint(len);
    this.pos += len;
  }
  writeMessage(tag, fn, obj) {
    this.writeTag(tag, PBF_BYTES);
    this.writeRawMessage(fn, obj);
  }
  writePackedVarint(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedVarint, arr);
  }
  writePackedSVarint(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedSVarint, arr);
  }
  writePackedBoolean(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedBoolean, arr);
  }
  writePackedFloat(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedFloat, arr);
  }
  writePackedDouble(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedDouble, arr);
  }
  writePackedFixed32(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedFixed32, arr);
  }
  writePackedSFixed32(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedSFixed32, arr);
  }
  writePackedFixed64(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedFixed64, arr);
  }
  writePackedSFixed64(tag, arr) {
    if (arr.length)
      this.writeMessage(tag, writePackedSFixed64, arr);
  }
  writeBytesField(tag, buffer) {
    this.writeTag(tag, PBF_BYTES);
    this.writeBytes(buffer);
  }
  writeFixed32Field(tag, val) {
    this.writeTag(tag, PBF_FIXED32);
    this.writeFixed32(val);
  }
  writeSFixed32Field(tag, val) {
    this.writeTag(tag, PBF_FIXED32);
    this.writeSFixed32(val);
  }
  writeFixed64Field(tag, val) {
    this.writeTag(tag, PBF_FIXED64);
    this.writeFixed64(val);
  }
  writeSFixed64Field(tag, val) {
    this.writeTag(tag, PBF_FIXED64);
    this.writeSFixed64(val);
  }
  writeVarintField(tag, val) {
    this.writeTag(tag, PBF_VARINT);
    this.writeVarint(val);
  }
  writeSVarintField(tag, val) {
    this.writeTag(tag, PBF_VARINT);
    this.writeSVarint(val);
  }
  writeStringField(tag, str) {
    this.writeTag(tag, PBF_BYTES);
    this.writeString(str);
  }
  writeFloatField(tag, val) {
    this.writeTag(tag, PBF_FIXED32);
    this.writeFloat(val);
  }
  writeDoubleField(tag, val) {
    this.writeTag(tag, PBF_FIXED64);
    this.writeDouble(val);
  }
  writeBooleanField(tag, val) {
    this.writeVarintField(tag, +val);
  }
}
function readVarintRemainder(l, s, p) {
  const buf = p.buf;
  let h, b;
  b = buf[p.pos++];
  h = (b & 112) >> 4;
  if (b < 128)
    return toNum(l, h, s);
  b = buf[p.pos++];
  h |= (b & 127) << 3;
  if (b < 128)
    return toNum(l, h, s);
  b = buf[p.pos++];
  h |= (b & 127) << 10;
  if (b < 128)
    return toNum(l, h, s);
  b = buf[p.pos++];
  h |= (b & 127) << 17;
  if (b < 128)
    return toNum(l, h, s);
  b = buf[p.pos++];
  h |= (b & 127) << 24;
  if (b < 128)
    return toNum(l, h, s);
  b = buf[p.pos++];
  h |= (b & 1) << 31;
  if (b < 128)
    return toNum(l, h, s);
  throw new Error("Expected varint not more than 10 bytes");
}
function toNum(low, high, isSigned) {
  return isSigned ? high * 4294967296 + (low >>> 0) : (high >>> 0) * 4294967296 + (low >>> 0);
}
function writeBigVarint(val, pbf) {
  let low, high;
  if (val >= 0) {
    low = val % 4294967296 | 0;
    high = val / 4294967296 | 0;
  } else {
    low = ~(-val % 4294967296);
    high = ~(-val / 4294967296);
    if (low ^ 4294967295) {
      low = low + 1 | 0;
    } else {
      low = 0;
      high = high + 1 | 0;
    }
  }
  if (val >= 18446744073709552000 || val < -18446744073709552000) {
    throw new Error("Given varint doesn't fit into 10 bytes");
  }
  pbf.realloc(10);
  writeBigVarintLow(low, high, pbf);
  writeBigVarintHigh(high, pbf);
}
function writeBigVarintLow(low, high, pbf) {
  pbf.buf[pbf.pos++] = low & 127 | 128;
  low >>>= 7;
  pbf.buf[pbf.pos++] = low & 127 | 128;
  low >>>= 7;
  pbf.buf[pbf.pos++] = low & 127 | 128;
  low >>>= 7;
  pbf.buf[pbf.pos++] = low & 127 | 128;
  low >>>= 7;
  pbf.buf[pbf.pos] = low & 127;
}
function writeBigVarintHigh(high, pbf) {
  const lsb = (high & 7) << 4;
  pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
  if (!high)
    return;
  pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
  if (!high)
    return;
  pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
  if (!high)
    return;
  pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
  if (!high)
    return;
  pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
  if (!high)
    return;
  pbf.buf[pbf.pos++] = high & 127;
}
function makeRoomForExtraLength(startPos, len, pbf) {
  const extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
  pbf.realloc(extraLen);
  for (let i = pbf.pos - 1;i >= startPos; i--)
    pbf.buf[i + extraLen] = pbf.buf[i];
}
function writePackedVarint(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeVarint(arr[i]);
}
function writePackedSVarint(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeSVarint(arr[i]);
}
function writePackedFloat(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeFloat(arr[i]);
}
function writePackedDouble(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeDouble(arr[i]);
}
function writePackedBoolean(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeBoolean(arr[i]);
}
function writePackedFixed32(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeFixed32(arr[i]);
}
function writePackedSFixed32(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeSFixed32(arr[i]);
}
function writePackedFixed64(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeFixed64(arr[i]);
}
function writePackedSFixed64(arr, pbf) {
  for (let i = 0;i < arr.length; i++)
    pbf.writeSFixed64(arr[i]);
}
function readUtf8(buf, pos, end) {
  let str = "";
  let i = pos;
  while (i < end) {
    const b0 = buf[i];
    let c = null;
    let bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
    if (i + bytesPerSequence > end)
      break;
    let b1, b2, b3;
    if (bytesPerSequence === 1) {
      if (b0 < 128) {
        c = b0;
      }
    } else if (bytesPerSequence === 2) {
      b1 = buf[i + 1];
      if ((b1 & 192) === 128) {
        c = (b0 & 31) << 6 | b1 & 63;
        if (c <= 127) {
          c = null;
        }
      }
    } else if (bytesPerSequence === 3) {
      b1 = buf[i + 1];
      b2 = buf[i + 2];
      if ((b1 & 192) === 128 && (b2 & 192) === 128) {
        c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
        if (c <= 2047 || c >= 55296 && c <= 57343) {
          c = null;
        }
      }
    } else if (bytesPerSequence === 4) {
      b1 = buf[i + 1];
      b2 = buf[i + 2];
      b3 = buf[i + 3];
      if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
        c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
        if (c <= 65535 || c >= 1114112) {
          c = null;
        }
      }
    }
    if (c === null) {
      c = 65533;
      bytesPerSequence = 1;
    } else if (c > 65535) {
      c -= 65536;
      str += String.fromCharCode(c >>> 10 & 1023 | 55296);
      c = 56320 | c & 1023;
    }
    str += String.fromCharCode(c);
    i += bytesPerSequence;
  }
  return str;
}
function writeUtf8(buf, str, pos) {
  for (let i = 0, c, lead;i < str.length; i++) {
    c = str.charCodeAt(i);
    if (c > 55295 && c < 57344) {
      if (lead) {
        if (c < 56320) {
          buf[pos++] = 239;
          buf[pos++] = 191;
          buf[pos++] = 189;
          lead = c;
          continue;
        } else {
          c = lead - 55296 << 10 | c - 56320 | 65536;
          lead = null;
        }
      } else {
        if (c > 56319 || i + 1 === str.length) {
          buf[pos++] = 239;
          buf[pos++] = 191;
          buf[pos++] = 189;
        } else {
          lead = c;
        }
        continue;
      }
    } else if (lead) {
      buf[pos++] = 239;
      buf[pos++] = 191;
      buf[pos++] = 189;
      lead = null;
    }
    if (c < 128) {
      buf[pos++] = c;
    } else {
      if (c < 2048) {
        buf[pos++] = c >> 6 | 192;
      } else {
        if (c < 65536) {
          buf[pos++] = c >> 12 | 224;
        } else {
          buf[pos++] = c >> 18 | 240;
          buf[pos++] = c >> 12 & 63 | 128;
        }
        buf[pos++] = c >> 6 & 63 | 128;
      }
      buf[pos++] = c & 63 | 128;
    }
  }
  return pos;
}

// modules/data/parsers/OsmJSONParser.ts
class OsmJSONParser {
  _seen;
  types;
  constructor() {
    this._seen = new Set;
    this._parseNode = this._parseNode.bind(this);
    this._parseWay = this._parseWay.bind(this);
    this._parseRelation = this._parseRelation.bind(this);
    this._parseChangeset = this._parseChangeset.bind(this);
    this._parseNote = this._parseNote.bind(this);
    this._parseComments = this._parseComments.bind(this);
    this._parseUser = this._parseUser.bind(this);
    this._parseUserBlock = this._parseUserBlock.bind(this);
    this._parsePreferences = this._parsePreferences.bind(this);
    this._parseApi = this._parseApi.bind(this);
    this._parsePolicy = this._parsePolicy.bind(this);
    this._parseBounds = this._parseBounds.bind(this);
    this.types = new Set([
      "node",
      "way",
      "relation",
      "changeset",
      "note",
      "user",
      "user_block",
      "preferences",
      "api",
      "policy",
      "bounds"
    ]);
  }
  reset() {
    this._seen.clear();
  }
  parse(content, options = {}) {
    if (!content) {
      throw new Error("No content");
    }
    const skipSeen = options.skipSeen ?? true;
    let filter;
    if (options.filter instanceof Set) {
      filter = options.filter;
    } else if (Array.isArray(options.filter)) {
      filter = new Set(options.filter);
    } else {
      filter = this.types;
    }
    const results = { osm: {}, data: [], seenIDs: new Set };
    const json = typeof content === "string" ? JSON.parse(content) : content;
    if (!isObject(json)) {
      throw new Error("No JSON");
    }
    let notes;
    if (json.type === "Feature") {
      notes = [json];
    } else if (json.type === "FeatureCollection" && Array.isArray(json.features)) {
      notes = json.features;
    }
    if (notes) {
      if (filter.has("note")) {
        for (const note of notes) {
          const parsed = this._parseNote(note);
          if (parsed) {
            results.data.push(parsed);
          }
        }
      }
      return results;
    }
    for (const prop of ["version", "generator", "copyright", "attribution", "license"]) {
      if (Object.hasOwn(json, prop)) {
        results.osm[prop] = unstringify(json[prop]);
      }
    }
    if (isObject(json.api) && filter.has("api")) {
      const parsed = this._parseApi(json.api);
      if (parsed) {
        results.data.push(parsed);
      }
    }
    if (isObject(json.policy) && filter.has("policy")) {
      const parsed = this._parsePolicy(json.policy);
      if (parsed) {
        results.data.push(parsed);
      }
    }
    if (isObject(json.bounds) && filter.has("bounds")) {
      const parsed = this._parseBounds(json.bounds);
      if (parsed) {
        results.data.push(parsed);
      }
    }
    const elements = json.elements || [];
    if (elements.length) {
      const errElement = elements.find((obj) => obj.type === "error");
      if (errElement) {
        const message = errElement.message || "unknown error";
        throw new Error(`Partial Response: ${message}`);
      }
      for (const obj of elements) {
        let parser;
        let id;
        if (obj.type === "node" && filter.has("node")) {
          id = "n" + obj.id;
          results.seenIDs.add(id);
          parser = this._parseNode;
        } else if (obj.type === "way" && filter.has("way")) {
          id = "w" + obj.id;
          results.seenIDs.add(id);
          parser = this._parseWay;
        } else if (obj.type === "relation" && filter.has("relation")) {
          id = "r" + obj.id;
          results.seenIDs.add(id);
          parser = this._parseRelation;
        }
        if (!parser || !id)
          continue;
        if (skipSeen) {
          if (this._seen.has(id))
            continue;
          this._seen.add(id);
        }
        const parsed = parser(obj, id);
        if (parsed) {
          results.data.push(parsed);
        }
      }
    }
    const changesets = (json.changeset ? [json.changeset] : json.changesets) || [];
    if (changesets.length && filter.has("changeset")) {
      for (const obj of changesets) {
        const id = "c" + obj.id;
        if (skipSeen) {
          if (this._seen.has(id))
            continue;
          this._seen.add(id);
        }
        const parsed = this._parseChangeset(obj, id);
        if (parsed) {
          results.data.push(parsed);
        }
      }
    }
    const users = (json.user ? [json.user] : json.users) || [];
    if (users.length && filter.has("user")) {
      for (const obj of users) {
        const id = "user" + obj.id;
        if (skipSeen) {
          if (this._seen.has(id))
            continue;
          this._seen.add(id);
        }
        const parsed = this._parseUser(obj, id);
        if (parsed) {
          results.data.push(parsed);
        }
      }
    }
    const user_blocks = (json.user_block ? [json.user_block] : json.user_blocks) || [];
    if (user_blocks.length && filter.has("user_block")) {
      for (const obj of user_blocks) {
        const parsed = this._parseUserBlock(obj);
        if (parsed) {
          results.data.push(parsed);
        }
      }
    }
    if (isObject(json.preferences) && filter.has("preferences")) {
      const parsed = this._parsePreferences(json.preferences);
      if (parsed) {
        results.data.push(parsed);
      }
    }
    return results;
  }
  _parseNode(obj, id) {
    const props = {
      type: "node",
      id,
      visible: obj.visible ?? true,
      tags: obj.tags || {},
      loc: [obj.lon, obj.lat]
    };
    copyProps(props, obj);
    delete props.lon;
    delete props.lat;
    return props;
  }
  _parseWay(obj, id) {
    const props = {
      type: "way",
      id,
      visible: obj.visible ?? true,
      tags: obj.tags || {},
      nodes: (obj.nodes || []).map((nodeId) => `n${nodeId}`)
    };
    copyProps(props, obj);
    return props;
  }
  _parseRelation(obj, id) {
    const props = {
      type: "relation",
      id,
      visible: obj.visible ?? true,
      tags: obj.tags || {},
      members: (obj.members || []).map((member) => {
        return {
          id: member.type[0] + member.ref,
          type: member.type,
          role: member.role
        };
      })
    };
    copyProps(props, obj);
    return props;
  }
  _parseChangeset(obj, id) {
    const props = {
      type: "changeset",
      id,
      tags: obj.tags || {}
    };
    if (Array.isArray(obj.comments)) {
      props.comments = this._parseComments(obj.comments);
    }
    copyProps(props, obj);
    return props;
  }
  _parseNote(obj) {
    const props = {
      type: "note",
      loc: obj.geometry.coordinates
    };
    if (Array.isArray(obj.properties.comments)) {
      props.comments = this._parseComments(obj.properties.comments);
    }
    copyProps(props, obj.properties);
    return props;
  }
  _parseComments(comments) {
    return comments.map((obj) => {
      const props = {
        visible: obj.visible ?? true
      };
      copyProps(props, obj);
      return props;
    });
  }
  _parseUser(obj, id) {
    const props = { type: "user" };
    copyProps(props, obj);
    if (!props.roles) {
      props.roles = [];
    }
    return props;
  }
  _parseUserBlock(obj) {
    const props = { type: "user_block" };
    copyProps(props, obj);
    if (!props.reason) {
      props.reason = "";
    }
    return props;
  }
  _parsePreferences(obj) {
    const props = {
      type: "preferences",
      preferences: obj
    };
    return props;
  }
  _parseApi(obj) {
    const props = { type: "api" };
    copyProps(props, obj);
    return props;
  }
  _parsePolicy(obj) {
    const props = { type: "policy" };
    const blacklist = obj?.imagery?.blacklist;
    if (Array.isArray(blacklist)) {
      props.imagery = { blacklist: [] };
      for (const item of blacklist) {
        const regex = item.regex;
        if (typeof regex === "string") {
          try {
            props.imagery.blacklist.push(new RegExp(regex));
          } catch (e) {}
        }
      }
    }
    return props;
  }
  _parseBounds(obj) {
    return Object.assign({ type: "bounds" }, obj);
  }
}
function isObject(val) {
  return val?.constructor?.name === "Object";
}
function copyProps(dst, src) {
  for (const [k, v] of Object.entries(src)) {
    if (Object.hasOwn(dst, k))
      continue;
    if (k === "id" || k === "uid") {
      dst[k] = v.toString();
    } else {
      dst[k] = unstringify(v);
    }
  }
  return dst;
}
function unstringify(val) {
  if (isObject(val)) {
    for (const [k, v] of Object.entries(val)) {
      if (k === "id" || k === "uid") {
        val[k] = v.toString();
      } else {
        val[k] = unstringify(v);
      }
    }
  }
  if (typeof val !== "string") {
    return val;
  }
  const s = val.trim();
  if (/^[+-]?\d+$/.test(s)) {
    return parseInt(s, 10);
  } else if (/^[+-]?\d*\.\d*([Ee][+-]?\d+)?$/.test(s) && s !== ".") {
    return parseFloat(s);
  } else if (/^true$/i.test(s)) {
    return true;
  } else if (/^false$/i.test(s)) {
    return false;
  } else if (/^null$/i.test(s)) {
    return null;
  } else if (/^undefined$/i.test(s)) {
    return;
  } else if (/^\d{4}/.test(s)) {
    const d = new Date(s);
    if (isFinite(d.getTime())) {
      return d;
    }
  }
  return s;
}
// node_modules/@xmldom/xmldom/lib/index.js
var conventions = require_conventions();
var $assign = conventions.assign;
var $hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
var $isHTMLMimeType = conventions.isHTMLMimeType;
var $isValidMimeType = conventions.isValidMimeType;
var $MIME_TYPE = conventions.MIME_TYPE;
var $NAMESPACE = conventions.NAMESPACE;
var errors = require_errors();
var $DOMException = errors.DOMException;
var $DOMExceptionName = errors.DOMExceptionName;
var $ExceptionCode = errors.ExceptionCode;
var $ParseError = errors.ParseError;
var dom = require_dom();
var $Attr = dom.Attr;
var $CDATASection = dom.CDATASection;
var $CharacterData = dom.CharacterData;
var $Comment = dom.Comment;
var $Document = dom.Document;
var $DocumentFragment = dom.DocumentFragment;
var $DocumentType = dom.DocumentType;
var $DOMImplementation = dom.DOMImplementation;
var $Element = dom.Element;
var $Entity = dom.Entity;
var $EntityReference = dom.EntityReference;
var $LiveNodeList = dom.LiveNodeList;
var $NamedNodeMap = dom.NamedNodeMap;
var $Node = dom.Node;
var $NodeList = dom.NodeList;
var $Notation = dom.Notation;
var $ProcessingInstruction = dom.ProcessingInstruction;
var $Text = dom.Text;
var $XMLSerializer = dom.XMLSerializer;
var domParser = require_dom_parser();
var $DOMParser = domParser.DOMParser;
var $normalizeLineEndings = domParser.normalizeLineEndings;
var $onErrorStopParsing = domParser.onErrorStopParsing;
var $onWarningStopParsing = domParser.onWarningStopParsing;

// modules/data/parsers/OsmXMLParser.ts
class OsmXMLParser {
  _seen;
  types;
  constructor() {
    this._seen = new Set;
    this._parseNode = this._parseNode.bind(this);
    this._parseWay = this._parseWay.bind(this);
    this._parseRelation = this._parseRelation.bind(this);
    this._parseChangeset = this._parseChangeset.bind(this);
    this._parseNote = this._parseNote.bind(this);
    this._parseComments = this._parseComments.bind(this);
    this._parseUser = this._parseUser.bind(this);
    this._parseUserBlock = this._parseUserBlock.bind(this);
    this._parsePreferences = this._parsePreferences.bind(this);
    this._parseApi = this._parseApi.bind(this);
    this._parsePolicy = this._parsePolicy.bind(this);
    this._parseBounds = this._parseBounds.bind(this);
    this._getTags = this._getTags.bind(this);
    this.types = new Set([
      "node",
      "way",
      "relation",
      "changeset",
      "note",
      "user",
      "user_block",
      "preferences",
      "api",
      "policy",
      "bounds"
    ]);
  }
  reset() {
    this._seen.clear();
  }
  parse(content, options = {}) {
    if (!content) {
      throw new Error("No content");
    }
    const skipSeen = options.skipSeen ?? true;
    let filter;
    if (options.filter instanceof Set) {
      filter = options.filter;
    } else if (Array.isArray(options.filter)) {
      filter = new Set(options.filter);
    } else {
      filter = this.types;
    }
    const results = { osm: {}, data: [], seenIDs: new Set };
    const xml = typeof content === "string" ? new $DOMParser().parseFromString(content.trimStart(), "application/xml") : content;
    if (!xml?.childNodes) {
      throw new Error("No XML");
    }
    const osmElement = Array.from(xml.childNodes).find((child) => child.nodeName === "osm");
    if (!osmElement?.childNodes) {
      throw new Error("No OSM Element");
    }
    Object.assign(results.osm, getCleanAttributes(osmElement));
    const children = getChildNodes(osmElement);
    const errElement = children.find((child) => child.nodeName === "error");
    if (errElement) {
      const message = errElement.textContent || "unknown error";
      throw new Error(`Partial Response: ${message}`);
    }
    for (const child of children) {
      let parser;
      let id;
      if (child.nodeName === "node" && filter.has("node")) {
        id = "n" + child.getAttribute("id");
        results.seenIDs.add(id);
        parser = this._parseNode;
      } else if (child.nodeName === "way" && filter.has("way")) {
        id = "w" + child.getAttribute("id");
        results.seenIDs.add(id);
        parser = this._parseWay;
      } else if (child.nodeName === "relation" && filter.has("relation")) {
        id = "r" + child.getAttribute("id");
        results.seenIDs.add(id);
        parser = this._parseRelation;
      } else if (child.nodeName === "changeset" && filter.has("changeset")) {
        id = "c" + child.getAttribute("id");
        results.seenIDs.add(id);
        parser = this._parseChangeset;
      } else if (child.nodeName === "note" && filter.has("note")) {
        id = "note" + child.getElementsByTagName("id")[0]?.textContent;
        parser = this._parseNote;
      } else if (child.nodeName === "user" && filter.has("user")) {
        id = "user" + child.getAttribute("id");
        parser = this._parseUser;
      } else if (child.nodeName === "user_block" && filter.has("user_block")) {
        parser = this._parseUserBlock;
      } else if (child.nodeName === "preferences" && filter.has("preferences")) {
        parser = this._parsePreferences;
      } else if (child.nodeName === "api" && filter.has("api")) {
        parser = this._parseApi;
      } else if (child.nodeName === "policy" && filter.has("policy")) {
        parser = this._parsePolicy;
      } else if (child.nodeName === "bounds" && filter.has("bounds")) {
        parser = this._parseBounds;
      }
      if (!parser)
        continue;
      if (skipSeen && id !== undefined) {
        if (this._seen.has(id))
          continue;
        this._seen.add(id);
      }
      const parsed = parser(child, id ?? "");
      if (parsed) {
        results.data.push(parsed);
      }
    }
    return results;
  }
  _parseNode(xml, id) {
    const attrs = getCleanAttributes(xml);
    const props = {
      type: "node",
      id,
      visible: attrs.visible ?? true,
      tags: this._getTags(xml),
      loc: [attrs.lon, attrs.lat]
    };
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "lon" || k === "lat" || Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    return props;
  }
  _parseWay(xml, id) {
    const attrs = getCleanAttributes(xml);
    const props = {
      type: "way",
      id,
      visible: attrs.visible ?? true,
      tags: this._getTags(xml)
    };
    for (const [k, v] of Object.entries(attrs)) {
      if (Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    const elems = Array.from(xml.getElementsByTagName("nd"));
    props.nodes = elems.map((elem) => "n" + elem.getAttribute("ref"));
    return props;
  }
  _parseRelation(xml, id) {
    const attrs = getCleanAttributes(xml);
    const props = {
      type: "relation",
      id,
      visible: attrs.visible ?? true,
      tags: this._getTags(xml)
    };
    for (const [k, v] of Object.entries(attrs)) {
      if (Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    const elems = Array.from(xml.getElementsByTagName("member"));
    props.members = elems.map((elem) => {
      const memberType = elem.getAttribute("type") || "";
      const memberRef = elem.getAttribute("ref") || "";
      const memberRole = elem.getAttribute("role") || "";
      return {
        id: memberType[0] + memberRef,
        type: memberType,
        role: memberRole
      };
    });
    return props;
  }
  _parseChangeset(xml, id) {
    const attrs = getCleanAttributes(xml);
    const props = {
      type: "changeset",
      id,
      tags: this._getTags(xml)
    };
    for (const [k, v] of Object.entries(attrs)) {
      if (Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    const discussion = xml.getElementsByTagName("discussion")[0];
    if (discussion) {
      props.comments = this._parseComments(discussion);
    }
    return props;
  }
  _parseNote(xml) {
    const attrs = getCleanAttributes(xml);
    const props = {
      type: "note",
      loc: [attrs.lon, attrs.lat]
    };
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "lon" || k === "lat" || Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    const childNodes = getChildNodes(xml);
    for (const node of childNodes) {
      const nodeName = node.nodeName;
      if (nodeName === "#text")
        continue;
      if (nodeName === "comments") {
        props.comments = this._parseComments(node);
      } else if (!Object.hasOwn(props, nodeName)) {
        if (/date/.test(nodeName)) {
          props[nodeName] = unstringify2(node.textContent || "");
        } else {
          props[nodeName] = node.textContent;
        }
      }
    }
    return props;
  }
  _parseComments(xml) {
    const results = [];
    const comments = Array.from(xml.getElementsByTagName("comment"));
    for (const comment of comments) {
      const attrs = getCleanAttributes(comment);
      const props = {
        visible: attrs.visible ?? true
      };
      for (const [k, v] of Object.entries(attrs)) {
        props[k] = v;
      }
      for (const node of getChildNodes(comment)) {
        const nodeName = node.nodeName;
        if (nodeName === "#text")
          continue;
        if (/date/.test(nodeName)) {
          props[nodeName] = unstringify2(node.textContent || "");
        } else {
          props[nodeName] = node.textContent;
        }
      }
      if (Object.keys(props).length) {
        results.push(props);
      }
    }
    return results;
  }
  _parseUser(xml) {
    const props = { type: "user" };
    const attrs = getCleanAttributes(xml);
    for (const [k, v] of Object.entries(attrs)) {
      if (Object.hasOwn(props, k))
        continue;
      props[k] = v;
    }
    const description = xml.getElementsByTagName("description")[0];
    if (description) {
      props.description = description.textContent;
    }
    const contributor_terms = xml.getElementsByTagName("contributor-terms")[0];
    if (contributor_terms) {
      props.contributor_terms = getCleanAttributes(contributor_terms);
    }
    const img = xml.getElementsByTagName("img")[0];
    if (img) {
      props.img = getCleanAttributes(img);
    }
    const roles = xml.getElementsByTagName("roles")[0];
    if (roles) {
      props.roles = getChildNodes(roles).map((child) => {
        return child.nodeName !== "#text" ? child.nodeName : null;
      }).filter(Boolean);
    } else {
      props.roles = [];
    }
    const changesets = xml.getElementsByTagName("changesets")[0];
    if (changesets) {
      props.changesets = getCleanAttributes(changesets);
    }
    const traces = xml.getElementsByTagName("traces")[0];
    if (traces) {
      props.traces = getCleanAttributes(traces);
    }
    const blocks = xml.getElementsByTagName("blocks")[0];
    if (blocks) {
      props.blocks = {};
      const received = blocks.getElementsByTagName("received")[0];
      if (received) {
        props.blocks.received = getCleanAttributes(received);
      }
    }
    const home = xml.getElementsByTagName("home")[0];
    if (home) {
      props.home = getCleanAttributes(home);
    }
    const languages = xml.getElementsByTagName("languages")[0];
    if (languages) {
      const langs = Array.from(languages.getElementsByTagName("lang"));
      props.languages = langs.map((lang) => lang.textContent).filter(Boolean);
    }
    const messages = xml.getElementsByTagName("messages")[0];
    if (messages) {
      props.messages = {};
      const received = messages.getElementsByTagName("received")[0];
      if (received) {
        props.messages.received = getCleanAttributes(received);
      }
      const sent = messages.getElementsByTagName("sent")[0];
      if (sent) {
        props.messages.sent = getCleanAttributes(sent);
      }
    }
    return props;
  }
  _parseUserBlock(xml) {
    const props = { type: "user_block" };
    const attrs = getCleanAttributes(xml);
    for (const [k, v] of Object.entries(attrs)) {
      props[k] = v;
    }
    const user = xml.getElementsByTagName("user")[0];
    if (user) {
      props.user = getCleanAttributes(user);
    }
    const creator = xml.getElementsByTagName("creator")[0];
    if (creator) {
      props.creator = getCleanAttributes(creator);
    }
    const revoker = xml.getElementsByTagName("revoker")[0];
    if (revoker) {
      props.revoker = getCleanAttributes(revoker);
    }
    const reason = xml.getElementsByTagName("reason")[0];
    if (reason) {
      props.reason = reason.textContent;
    } else {
      props.reason = "";
    }
    return props;
  }
  _parsePreferences(xml) {
    const props = {
      type: "preferences",
      preferences: {}
    };
    const elems = Array.from(xml.getElementsByTagName("preference"));
    for (const elem of elems) {
      const k = (elem.getAttribute("k") ?? "").trim();
      const v = (elem.getAttribute("v") ?? "").trim();
      if (k) {
        props.preferences[k] = v;
      }
    }
    return props;
  }
  _parseApi(xml) {
    const props = { type: "api" };
    for (const node of getChildNodes(xml)) {
      if (node.nodeName === "#text")
        continue;
      props[node.nodeName] = getCleanAttributes(node);
    }
    return props;
  }
  _parsePolicy(xml) {
    const props = { type: "policy" };
    const imagery = xml.getElementsByTagName("imagery")[0];
    if (imagery) {
      props.imagery = { blacklist: [] };
      for (const element of Array.from(imagery.getElementsByTagName("blacklist"))) {
        const regexString = element.getAttribute("regex");
        if (regexString) {
          try {
            props.imagery.blacklist.push(new RegExp(regexString));
          } catch (e) {}
        }
      }
    }
    return props;
  }
  _parseBounds(xml) {
    return Object.assign({ type: "bounds" }, getCleanAttributes(xml));
  }
  _getTags(xml) {
    const elems = Array.from(xml.getElementsByTagName("tag"));
    const tags = {};
    for (const elem of elems) {
      const k = (elem.getAttribute("k") ?? "").trim();
      const v = (elem.getAttribute("v") ?? "").trim();
      if (k) {
        tags[k] = v;
      }
    }
    return tags;
  }
}
function getCleanAttributes(node) {
  const result = {};
  if (!node?.attributes)
    return result;
  for (const attr of Array.from(node.attributes)) {
    const k = attr.nodeName;
    if (k === "id" || k === "uid") {
      result[attr.nodeName] = attr.nodeValue;
    } else {
      result[attr.nodeName] = unstringify2(attr.nodeValue || "");
    }
  }
  return result;
}
function getChildNodes(node) {
  if (!node?.childNodes)
    return [];
  return Array.from(node.childNodes);
}
function unstringify2(s) {
  if (typeof s !== "string") {
    return s;
  }
  s = s.trim();
  if (/^[+-]?\d+$/.test(s)) {
    return parseInt(s, 10);
  } else if (/^[+-]?\d*\.\d*([Ee][+-]?\d+)?$/.test(s) && s !== ".") {
    return parseFloat(s);
  } else if (/^true$/i.test(s)) {
    return true;
  } else if (/^false$/i.test(s)) {
    return false;
  } else if (/^null$/i.test(s)) {
    return null;
  } else if (/^undefined$/i.test(s)) {
    return;
  } else if (/^\d{4}/.test(s)) {
    const d = new Date(s);
    if (isFinite(d.getTime())) {
      return d;
    }
  }
  return s;
}
// modules/util/fetch_response.ts
var import_json5 = __toESM(require_dist(), 1);

class FetchError extends Error {
  status;
  statusText;
  response;
  body;
  constructor(init) {
    if (init instanceof Response) {
      super(init.status + " " + init.statusText);
      this.status = init.status;
      this.statusText = init.statusText;
      this.response = init;
    } else {
      super(init.message ?? init.status + " " + init.statusText);
      this.status = init.status;
      this.statusText = init.statusText;
      this.body = init.body;
    }
    this.name = "FetchError";
  }
}
async function fetchEnvelope(fetchFn, url, init, parse) {
  const response = await fetchFn(url, init);
  if (!response.ok) {
    let body = "";
    try {
      body = await response.text();
    } catch {}
    return {
      ok: false,
      status: response.status,
      statusText: response.statusText,
      message: `${response.status} ${response.statusText}`,
      body
    };
  }
  return { ok: true, status: response.status, value: await parse(response) };
}
function utilFetchResponse(response, domParser2) {
  if (!response.ok) {
    throw new FetchError(response);
  }
  let contentType = (response.headers.get("content-type") || "").split(";")[0];
  if (!contentType) {
    const url = new URL(response.url);
    const filename = url.pathname.split("/").at(-1) || "";
    const extension = filename.toLowerCase().split(".").at(-1) || "";
    switch (extension) {
      case "geojson":
      case "json":
        contentType = "application/json";
        break;
      case "json5":
        contentType = "application/json5";
        break;
      case "jsonc":
        contentType = "application/jsonc";
        break;
      case "htm":
      case "html":
        contentType = "text/html";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
      case "gpx":
      case "kml":
      case "xml":
        contentType = "application/xml";
        break;
      case "mvt":
      case "pb":
      case "pbf":
      case "pmtiles":
      case "proto":
        contentType = "application/protobuf";
        break;
      default:
        contentType = "text/plain";
    }
  }
  switch (contentType) {
    case "application/geo+json":
    case "application/json":
    case "application/vnd.geo+json":
    case "text/x-json":
      if (response.status === 204 || response.status === 205)
        return;
      return response.json();
    case "application/jsonc":
    case "application/json5":
      if (response.status === 204 || response.status === 205)
        return;
      return response.text().then((text) => import_json5.default.parse(text));
    case "application/xhtml+xml":
    case "application/xml":
    case "image/svg+xml":
    case "text/html":
    case "text/xml":
      return response.text().then((txt) => {
        if (!domParser2)
          domParser2 = new $DOMParser;
        return domParser2.parseFromString(txt.trimStart(), contentType);
      });
    case "application/octet-stream":
    case "application/protobuf":
    case "application/vnd.google.protobuf":
    case "application/vnd.mapbox-vector-tile":
    case "application/x-protobuf":
      return response.arrayBuffer();
    default:
      return response.text();
  }
}

// modules/core/NetworkSystem.worker.ts
var osmJsonParser = new OsmJSONParser;
var osmXmlParser = new OsmXMLParser;
function decodeMVT(buffer, x, y, z) {
  if (!buffer)
    return [];
  const vt = new VectorTile(new Pbf(buffer));
  const results = [];
  for (const [layerID, vtLayer] of Object.entries(vt.layers)) {
    if (!vtLayer)
      continue;
    const min = 0;
    const max = vtLayer.extent;
    for (let i = 0;i < vtLayer.length; i++) {
      const vtFeature = vtLayer.feature(i);
      const [left, top, right, bottom] = vtFeature.bbox();
      if (left > max || top > max || right < min || bottom < min)
        continue;
      const feature = vtFeature.toGeoJSON(x, y, z);
      if (!feature)
        continue;
      results.push({ layerID, origID: vtFeature.id, feature });
    }
  }
  return results;
}
async function fetchAndParse(data, signal) {
  const { url, init } = data;
  return fetchEnvelope(fetch, url, { ...init, signal }, utilFetchResponse);
}
async function fetchAndParseOsmJson(data, signal) {
  const { url, init, parserOptions } = data;
  return fetchEnvelope(fetch, url, { ...init, signal }, async (response) => osmJsonParser.parse(await utilFetchResponse(response), parserOptions));
}
async function fetchAndParseOsmXml(data, signal) {
  const { url, init, parserOptions } = data;
  return fetchEnvelope(fetch, url, { ...init, signal }, async (response) => osmXmlParser.parse(await utilFetchResponse(response), parserOptions));
}
async function fetchAndParseMVT(data, signal) {
  const { url, init, tileXYZ } = data;
  const [x, y, z] = tileXYZ;
  return fetchEnvelope(fetch, url, { ...init, signal }, async (response) => decodeMVT(await utilFetchResponse(response), x, y, z));
}
function reset(_data, _signal) {
  osmJsonParser.reset();
  osmXmlParser.reset();
}
var networkListeners = {
  "network:fetchAndParse": fetchAndParse,
  "network:fetchAndParseMVT": fetchAndParseMVT,
  "network:fetchAndParseOsmJson": fetchAndParseOsmJson,
  "network:fetchAndParseOsmXml": fetchAndParseOsmXml,
  "network:reset": reset
};

// modules/core/index.worker.ts
var coreListeners = {
  ...networkListeners
};

// modules/services/OsmService.worker.ts
var osmJsonParser2 = new OsmJSONParser;
var osmXmlParser2 = new OsmXMLParser;
async function fetchAndParse2(data, signal) {
  const { url, init, format, parserOptions } = data;
  const parser = format === "json" ? osmJsonParser2 : osmXmlParser2;
  return fetchEnvelope(fetch, url, { ...init, signal }, async (response) => parser.parse(await utilFetchResponse(response), parserOptions));
}
function reset2(_data, _signal) {
  osmJsonParser2.reset();
  osmXmlParser2.reset();
}
var osmServiceListeners = {
  "osmService:fetchAndParse": fetchAndParse2,
  "osmService:reset": reset2
};

// modules/services/index.worker.ts
var serviceListeners = {
  ...osmServiceListeners
};

// modules/worker.ts
var listeners = new Map;
var activeControllers = new Map;
function registerListener(listenerID, listener) {
  listeners.set(listenerID, listener);
}
registerListener("ping", (data) => data);
var available = { ...coreListeners, ...serviceListeners };
for (const [listenerID, listener] of Object.entries(available)) {
  registerListener(listenerID, listener);
}
self.onmessage = async (event) => {
  const msg = event.data;
  if (msg.type === "cancel") {
    const controller2 = activeControllers.get(msg.id);
    if (controller2)
      controller2.abort();
    activeControllers.delete(msg.id);
    return;
  }
  const { id, listenerID, data } = msg;
  const controller = new AbortController;
  activeControllers.set(id, controller);
  const listener = listeners.get(listenerID);
  if (!listener) {
    activeControllers.delete(id);
    self.postMessage({ id, error: `Unknown listener: '${listenerID}'` });
    return;
  }
  try {
    const result = await listener(data, controller.signal);
    self.postMessage({ id, result });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    self.postMessage({ id, error: message });
  } finally {
    activeControllers.delete(id);
  }
};

//# debugId=8D418AB349729D2B64756E2164756E21
//# sourceMappingURL=rapid-worker.js.map
