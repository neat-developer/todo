class TodoAppClass {
    constructor(options) {
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

    init() {
        this.elements.addField.addEventListener('keydown', e => {
            if (e.keyCode == '13') {
                this.addNewItemToList();
            }
        });

        this.elements.addBtn.addEventListener('click', e => {
            this.addNewItemToList();
        });
        this.updateElements();
    }

    addNewItemToList() {
        if (!this.getValueField()) return false;
        this.items.push(this.generateNewItem(this.getValueField()));
        this.clearValueField();
        this.saveListToLocalStorage();
        this.updateElements();
    }

    getValueField() {
        return this.elements.addField.value;
    }

    clearValueField() {
        this.elements.addField.value = "";
    }

    getItems() {
        return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }


    saveListToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
    }


    generateNewItem(name) {
        return {
            name,
            id: this.items.length,
            status: 'unchecked'
        }
    }

    removeElement(el) {
        this.items = this.items.filter(item => item.id !== el.id);
        this.saveListToLocalStorage();
        this.updateElements();
    }

    updateStatusElement(el) {
        let availableStatuses = {
            'checked': 'unchecked',
            'unchecked': 'checked'
        };
        el.status = availableStatuses[el.status];
        this.saveListToLocalStorage();
        this.updateElements();
    }


    // Draw methods
    updateElements() {
        this.clearAllItemsTemplate();
        this.items.forEach(item => {
            this.elements.list.appendChild(this.getItemTemplate(item));
        });
        this.updateTotalValue();
    }

    updateTotalValue() {
        this.elements.total.innerHTML = this.items.length;
    }

    clearAllItemsTemplate() {
        this.elements.list.innerHTML = '';
    }

    getItemTemplate(el) {
        let element = document.createElement('li');
        element.setAttribute('class', "todo-app-list-item");
        element.innerHTML = `<div>
          <div class="inline-block todo-app-list-item-status">
            <span class="fa ${el.status === 'checked' ? 'fa-check-circle-o' : 'fa-circle-thin'}"></span>
          </div>
          <div class="inline-block todo-app-list-item-name ${el.status === 'checked' && 'todo-app-list-item-checked'}">
            ${el.name}
          </div>
          <div class="inline-block todo-app-list-item-remove">
            <span class="fa fa-times"></span>
          </div></div>`;

        element.getElementsByClassName("todo-app-list-item-remove")[0].addEventListener('click', e => {
            this.removeElement(el);
        });


        element.getElementsByClassName("todo-app-list-item-status")[0].addEventListener('click', e => {
            this.updateStatusElement(el);
        });


        return element;
    }

}


(function () {
    new TodoAppClass({
        id: "todo-app"
    });
})();


function findElementInsideId(id, className) {
    return document.getElementById(id).getElementsByClassName(className)[0];
}