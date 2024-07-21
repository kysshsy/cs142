"use strict";

class Cs142TemplateProcessor {
    template: string;

    constructor(template: string) {
        this.template = template;
    }

    fillIn(directory: { [key: string]: string }): string {
        let string = this.template;
        for (const key in directory) {
            if (directory.hasOwnProperty(key)) {
                string = string.replace(`{{${key}}}`, directory[key]);
            }
        }
        return string;
    }
}


(window as any).Cs142TemplateProcessor = Cs142TemplateProcessor;