import { activityList } from './plugin-settings.js'
import { inputController } from "./input-controller.js"

export class Mouse {

    constructor() {
        this.btnsPressed = {};

        this.mousePressHandler = this.mousePressHandler.bind(this);
        this.mouseWringHandler = this.mouseWringHandler.bind(this);
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
        for (let activityList in inputController.actionsToBind) {
            if (inputController.actionsToBind[activityList].click.includes(props.button)) {
                inputController.actionsToBind[activityList].active = true;
                document.dispatchEvent(inputController.actionActivated);

            }
        }
    }

    mouseWringHandler(props) {
        delete this.btnsPressed[props.button];
        for (let activityList in inputController.actionsToBind) {
            if (inputController.actionsToBind[activityList].click.includes(props.button)) {
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
            return activityList[action].click.some((item) => this.isKeyPressed(item));
        } return false
    }
}