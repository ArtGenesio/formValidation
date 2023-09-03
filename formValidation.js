class FormValidator {
    constructor() {
        this.formFields = []

        this.form = document.getElementById("form")
        /*this.addFormField("#username", {minLength: 4, maxLength: 20})
        this.addFormField("#email", {minLength: 4, maxLength: 64})
        this.addFormField("#password", {minLength: 4, maxLength: 26})
        this.addFormField("#password2", {minLength: 4, maxLength: 26, matchWithPasswordId: "#password"})*/
        this.processForm()
        console.log(this.formFields)
        this.init()
    }

    processForm = () => {
        this.form.querySelectorAll("input").forEach(e => {
            let minLength = e.getAttribute("minlength")
            if(!minLength) minLength = undefined //aby działała min wartosć domyślna
            let maxLength = e.getAttribute("maxlength")
            if(!maxLength) maxLength = undefined
            let matchWithPasswordId = e.getAttribute("dataMatchWitchPasswordId")
            if(!matchWithPasswordId) matchWithPasswordId = undefined
            
            this.addFormField(`#${e.id}`, {minLength: minLength, maxLength: maxLength, matchWithPasswordId: matchWithPasswordId})
           
        })
    }

    addFormField = (cssSelector, options) => {
        const formField = new FormField(cssSelector, options)
        this.formFields.push(formField)
    }

    init() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault()

            this.validateForm()
        })
    }

    validateForm = () => {
        const formResults = this.formFields.map( f => f.validate() )

        if(formResults.includes(false)) {
            console.log("Błąd w formularzu")
        }else {
            console.log('Formularz zwalidowany.')
        }
    }
}