class Cs142TemplateProcessor {
    constructor(template) {
        this.template = template;
    }
    fillIn(directory) {
        let string = this.template;
        for (let key in directory) {
            string = string.replace("{{" + String(key) + "}}", directory[key]);
        }
        return string;
    }
}
window.Cs142TemplateProcessor = Cs142TemplateProcessor;