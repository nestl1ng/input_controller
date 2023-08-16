import { activityList } from './plugin-settings.js'
export class KeyBoard {

    constructor() {
        this.btnsPressed = {};

        this.pressHandler = this.pressHandler.bind(this);
        this.wringHandler = this.wringHandler.bind(this);
        this.activityList = activityList;
    }

    attachPlugin() {
        document.addEventListener('keydown', this.pressHandler);
        document.addEventListener('keyup', this.wringHandler);
    }

    detachPlugin() {
        document.removeEventListener('keydown', this.pressHandler);
        document.removeEventListener('keyup', this.wringHandler);
    }

    pressHandler(props) {
        this.btnsPressed[props.keyCode] = props.keyCode;
    }

    wringHandler(props) {
        delete this.btnsPressed[props.keyCode];
    }


    isKeyPressed(keyCode) {
        return this.btnsPressed.hasOwnProperty(keyCode);
    }

    isActionActive(action) {
        if (this.activityList.hasOwnProperty(action)
            && this.activityList[action].enabled) {
            return this.activityList[action].keys.some((item) => this.isKeyPressed(item));
        } return false
    }
}