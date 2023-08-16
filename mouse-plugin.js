import { activityList } from './plugin-settings.js'
export class Mouse {

    constructor() {
        this.btnsPressed = {};

        this.mousePressHandler = this.mousePressHandler.bind(this);
        this.mouseWringHandler = this.mouseWringHandler.bind(this);
        this.activityList = activityList;
    }

    attachPlugin() {
        document.addEventListener('mousedown', this.mousePressHandler);
        document.addEventListener('mouseup', this.mouseWringHandler);
    }

    detachPlugin() {
        document.removeEventListener('mousedown', this.mousePressHandler);
        document.removeEventListener('mouseup', this.mouseWringHandler);
    }

    mousePressHandler(props) {
         this.btnsPressed[props.button] = props.button;
    }

    mouseWringHandler(props) {
        delete this.btnsPressed[props.button];
    }


    isKeyPressed(keyCode) {
        return this.btnsPressed.hasOwnProperty(keyCode);
    }

    isActionActive(action) {
        if (this.activityList.hasOwnProperty(action)
            && this.activityList[action].enabled) {
            return this.activityList[action].click.some((item) => this.isKeyPressed(item));
        } return false
    }
}