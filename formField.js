class FormField {
    constructor(formFieldSelector, {minLength = 3, maxLength=64, errorMsgSelector, matchWithPasswordId}) {
        this.formFieldSelector = document.querySelector(formFieldSelector)
        this.type = this.formFieldSelector.type
        this.minLength = +minLength
        this.maxLength = +maxLength //zamiana z str na number
        if(!errorMsgSelector) errorMsgSelector = `${formFieldSelector} + span`
        this.errorMsgEl = document.querySelector(errorMsgSelector)
        this.matchWithPasswordId = matchWithPasswordId
    }

    validate = () => {
        switch(this.type) {
            case "password":
                if(!this.checkTextLength()) return false
                if(!this.checkValidPassword()) return false
                return true
                break;
            case "text":
                if(!this.checkTextLength()) return false
                return true
                break;
            case "email":
                if(!this.checkEmail()) return false
                return true
                break;
            case "tel":
                if(!this.checkPhone()) return false
                return true
                break;
        }

        return false
    }

    checkTextLength = () => {
        if(this.formFieldSelector.value.length < this.minLength) {
            this.showError(`Wymagane minimum znaków: ${this.minLength}`)
            return false
        }else if(this.formFieldSelector.value.length > this.maxLength) {
            this.showError(`Maksymalna liczba znaków: ${this.maxLength}`)
            return false
        } else {
            this.showSuccess()
            return true
        }
    }

    checkEmail = () => {
        const re = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        if(re.test(this.formFieldSelector.value.trim())) {
            this.showSuccess()
            return true
        }else {
            this.showError("Wpisz prawidłowy email")
            return false
        }
    }

    checkValidPassword = () => {
        if(!this.matchWithPasswordId) {
            return true
        
        }

        const matchWith = document.querySelector(this.matchWithPasswordId)

        if(this.formFieldSelector.value.length > 0 && this.formFieldSelector.value === matchWith.value) {
            this.showSuccess()
            return true
        }else {
            this.showError("Hasła muszą być identyczne!")
            return false
        }
    }

    checkPhone = () => {
        const re = /^\+?[1-9][0-9]{8,14}$/
        if(re.test(this.formFieldSelector.value.trim())) {
            console.warn(this.formFieldSelector.value.trim())
            this.showSuccess()
            return true
        }else {
            this.showError("Niepoprawny format numeru telefonu")
            return false
        }
    }

    showError = (msg) => {
        this.errorMsgEl.innerHTML = msg
        this.errorMsgEl.classList.add("error")
        this.formFieldSelector.classList.add("error")
        this.errorMsgEl.classList.remove("success")
        this.formFieldSelector.classList.remove("success")
    }

    showSuccess = () => {
        this.errorMsgEl.innerHTML = ""
        this.errorMsgEl.classList.remove("error")
        this.formFieldSelector.classList.remove("error")
        this.errorMsgEl.classList.add("success")
        this.formFieldSelector.classList.add("success")
    }
}