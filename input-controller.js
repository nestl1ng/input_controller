class InputController {
    enabled;
    focused;
    ACTION_ACTIVATED = "input-controller:action-activated";
    ACTION_DEACTIVATED = "input-controller:action-deactivated";

    activityList;
    target;
    btnsPresed;

    constructor(actionsToBind, target) {
        this.attachFlag = false;
        this.activityList = actionsToBind;
        this.target = target;
        this.btnsPresed = {};
    }

    bindActions(actionsToBind) {

    }

    enableAction(actionName) {

    }

    disableAction(actionName) {

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
        if (this.attachFlag) {
            for (let i = 0; i < activityList[action].keys.length; i++) {
                if (this.isKeyPressed(activityList[action].keys[i])) {
                    return this.activityList[action].enabled;
                }
            }
        }
    }

    isKeyPressed(keyCode) {
        return this.btnsPresed.hasOwnProperty(keyCode);
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

    PressHandler(e) {
        if (!this.btnsPresed.hasOwnProperty(e.keyCode)) {
            this.btnsPresed[e.keyCode] = e.keyCode;
        }
        console.log(this.btnsPresed);
    }

    WringHandler(e) {
        delete this.btnsPresed[e.keyCode];
        console.log(this.btnsPresed);
    }

}
