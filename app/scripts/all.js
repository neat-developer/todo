"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoAppClass =
/*#__PURE__*/
function () {
  function TodoAppClass(options) {
    _classCallCheck(this, TodoAppClass);

    this.options = options;
    this.localStorageKey = 'todo-list-items-' + this.options.id;
    this.items = this.getItems();
    this.elements = {
      'addBtn': findElementInsideId(this.options.id, "todo-field-add-button"),
      'addField': findElementInsideId(this.options.id, "todo-field-add"),
      'list': findElementInsideId(this.options.id, "todo-app-list"),
      'total': findElementInsideId(this.options.id, "todo-app-total-value")
    };
    this.init();
  }

  _createClass(TodoAppClass, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.elements.addField.addEventListener('keydown', function (e) {
        if (e.keyCode == '13') {
          _this.addNewItemToList();
        }
      });
      this.elements.addBtn.addEventListener('click', function (e) {
        _this.addNewItemToList();
      });
      this.updateElements();
    }
  }, {
    key: "addNewItemToList",
    value: function addNewItemToList() {
      if (!this.getValueField()) return false;
      this.items.push(this.generateNewItem(this.getValueField()));
      this.clearValueField();
      this.saveListToLocalStorage();
      this.updateElements();
    }
  }, {
    key: "getValueField",
    value: function getValueField() {
      return this.elements.addField.value;
    }
  }, {
    key: "clearValueField",
    value: function clearValueField() {
      this.elements.addField.value = "";
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }
  }, {
    key: "saveListToLocalStorage",
    value: function saveListToLocalStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
    }
  }, {
    key: "generateNewItem",
    value: function generateNewItem(name) {
      return {
        name: name,
        id: this.items.length,
        status: 'unchecked'
      };
    }
  }, {
    key: "removeElement",
    value: function removeElement(el) {
      this.items = this.items.filter(function (item) {
        return item.id !== el.id;
      });
      this.saveListToLocalStorage();
      this.updateElements();
    }
  }, {
    key: "updateStatusElement",
    value: function updateStatusElement(el) {
      var availableStatuses = {
        'checked': 'unchecked',
        'unchecked': 'checked'
      };
      el.status = availableStatuses[el.status];
      this.saveListToLocalStorage();
      this.updateElements();
    } // Draw methods

  }, {
    key: "updateElements",
    value: function updateElements() {
      var _this2 = this;

      this.clearAllItemsTemplate();
      this.items.forEach(function (item) {
        _this2.elements.list.appendChild(_this2.getItemTemplate(item));
      });
      this.updateTotalValue();
    }
  }, {
    key: "updateTotalValue",
    value: function updateTotalValue() {
      this.elements.total.innerHTML = this.items.length;
    }
  }, {
    key: "clearAllItemsTemplate",
    value: function clearAllItemsTemplate() {
      this.elements.list.innerHTML = '';
    }
  }, {
    key: "getItemTemplate",
    value: function getItemTemplate(el) {
      var _this3 = this;

      var element = document.createElement('li');
      element.setAttribute('class', "todo-app-list-item");
      element.innerHTML = "<div>\n          <div class=\"inline-block todo-app-list-item-status\">\n            <span class=\"fa ".concat(el.status === 'checked' ? 'fa-check-circle-o' : 'fa-circle-thin', "\"></span>\n          </div>\n          <div class=\"inline-block todo-app-list-item-name ").concat(el.status === 'checked' && 'todo-app-list-item-checked', "\">\n            ").concat(el.name, "\n          </div>\n          <div class=\"inline-block todo-app-list-item-remove\">\n            <span class=\"fa fa-times\"></span>\n          </div></div>");
      element.getElementsByClassName("todo-app-list-item-remove")[0].addEventListener('click', function (e) {
        _this3.removeElement(el);
      });
      element.getElementsByClassName("todo-app-list-item-status")[0].addEventListener('click', function (e) {
        _this3.updateStatusElement(el);
      });
      return element;
    }
  }]);

  return TodoAppClass;
}();

(function () {
  new TodoAppClass({
    id: "todo-app"
  });
})();

function findElementInsideId(id, className) {
  return document.getElementById(id).getElementsByClassName(className)[0];
}
"use strict";