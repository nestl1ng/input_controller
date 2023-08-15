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

        this.attachFlag = false;
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
            this.attachFlag = false;
            this.target = null;
        } else {
            this.attachFlag = true;
            this.target = target;
        }
    }

    detach() {
        this.target = null;
        this.attachFlag = false;
    }

    isActionActive(action) {
        if (this.activityList.hasOwnProperty(action) && this.attachFlag && this.activityList[action].hasOwnProperty('keys')) {
            for (let i = 0; i < this.activityList[action].keys.length; i++) {
                if (this.isKeyPressed(this.activityList[action].keys[i])) {
                    return this.activityList[action].enabled;
                }
            }
        }
    }

    isKeyPressed(keyCode) {
        return this.btnsPressed.hasOwnProperty(keyCode);
    }

    //--------------------------------------------------------------------

    activation() {
        document.addEventListener('keydown', this.PressHandler.bind(this));
        document.addEventListener('keyup', this.WringHandler.bind(this));
    }

    deactivation() {
        document.removeEventListener('keydown', this.PressHandler);
        document.removeEventListener('keyup', this.WringHandler);
    }

    PressHandler(props) {
        if (!this.btnsPressed.hasOwnProperty(props.keyCode)) {
            this.btnsPressed[props.keyCode] = props.keyCode;
        }
    }

    WringHandler(props) {
        delete this.btnsPressed[props.keyCode];
    }

}
