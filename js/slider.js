import { tns } from "../node_modules/tiny-slider/src/tiny-slider.js";
// Exportem classe slider
export class Slider {
    // tipus (id del div)
    constructor(type = ".openAi") {
        this.type = type;
        this.create()
    }
    // check de si existeix
    check() {
        if (this.slider != undefined) {
            return true
        }
        return false
    }
    // Creem slider
    create(type = this.type) {
        if (!this.check()) {
            this.slider = tns({
                container: type,
                autoplayButtonOutput: false,
                controls: false,
                rewind: true,
                items: 1,
                autoplay: true
            });
        }
    }
    // eliminem slider
    delete() {
        if (this.check()) {
            this.slider.destroy()
        }
    }
}