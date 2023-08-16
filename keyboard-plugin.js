import { activityList } from './plugin-settings.js'
import { inputController } from "./input-controller.js"

export class KeyBoard {

    constructor() {
        this.btnsPressed = {};

        this.pressHandler = this.pressHandler.bind(this);
        this.wringHandler = this.wringHandler.bind(this);
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
        for (let activityList in inputController.actionsToBind) {
            if (inputController.actionsToBind[activityList].keys.includes(props.keyCode)) {
                inputController.actionsToBind[activityList].active = true;
                document.dispatchEvent(inputController.actionActivated);
            }
        }
    }

    wringHandler(props) {
        delete this.btnsPressed[props.keyCode];
        for (let activityList in inputController.actionsToBind) {
            if (inputController.actionsToBind[activityList].keys.includes(props.keyCode)) {
                inputController.actionsToBind[activityList].active = false;
                document.dispatchEvent(inputController.actionDeactivated);
            }
        }
    }


    isKeyPressed(keyCode) {
        return this.btnsPressed.hasOwnProperty(keyCode);
    }

    isActionActive(action) {
        if (activityList.hasOwnProperty(action)
            && activityList[action].enabled) {
            return activityList[action].keys.some((item) => this.isKeyPressed(item));
        } return false
    }
}