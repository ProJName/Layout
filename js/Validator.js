class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            password: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
            zipCode:/^\d{6}$/,
            adress: /^[a-zа-яё]+$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            password: 'Пароль должен содержать буквы Верхнего и нижнего регистра,цифры, а так же спец символы',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            zipCode:'Должен содержать 6 цифр, почтовый индекс',
            adress:'Должен содержать только символы (адрес)'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value) {
        regexp.test(value)
    }

    _validateForm() {
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors) {
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validate(field);
        }
        if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
            this.valid = true;
        }
    }
    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _watchField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMsg(field);
                }
            }
        })
    }
}









