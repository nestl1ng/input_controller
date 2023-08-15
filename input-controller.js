class InputController {
    enabled;
    focused;
    ACTION_ACTIVATED = "input-controller:action-activated";
    ACTION_DEACTIVATED = "input-controller:action-deactivated";

    activityList;
    target;
    btnsPressed;

    constructor(actionsToBind, target) {
        this.activityList = actionsToBind;
        this.target = target;

        this.pressHandler = this.pressHandler.bind(this);
        this.wringHandler = this.wringHandler.bind(this);
        this.enabled = false;
        this.btnsPressed = {};
    }

    bindActions(actionsToBind) {
        this.activityList = Object.assign(this.activityList, actionsToBind);
    }

    enableAction(actionName) {
        this.activityList[actionName].enabled = true;
    }

    disableAction(actionName) {
        this.activityList[actionName].enabled = false;
    }

    attach(target, dontEnable) {
        if (dontEnable) {
            this.enabled = false;
            this.target = null;
        } else {
            this.enabled = true;
            this.target = target;
            document.addEventListener('keydown', this.pressHandler);
            document.addEventListener('keyup', this.wringHandler);
        }
    }

    detach() {
        this.target = null;
        this.enabled = false;
        document.removeEventListener('keydown', this.pressHandler);
        document.removeEventListener('keyup', this.wringHandler);
    }

    isActionActive(action) {
        if (this.activityList.hasOwnProperty(action)
            && this.enabled
            && this.activityList[action].hasOwnProperty('keys')
            && this.activityList[action].enabled) {
            return this.activityList[action].keys.some((item) => this.isKeyPressed(item));
        } return false
    }

    isKeyPressed(keyCode) {
        return this.btnsPressed.hasOwnProperty(keyCode);
    }

    //--------------------------------------------------------------------

    pressHandler(props) {
        this.btnsPressed[props.keyCode] = props.keyCode;
        console.log(this.btnsPressed);
    }

    wringHandler(props) {
        delete this.btnsPressed[props.keyCode];
        console.log(this.btnsPressed);
    }

}

