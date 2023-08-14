class InputController {
    enabled;
    focused;
    ACTION_ACTIVATED = "input-controller:action-activated";
    ACTION_DEACTIVATED = "input-controller:action-deactivated";

    activityList;
    target;
    btnsPresed;

    constructor(actionsToBind, target) {
        this.PressHandler = this.PressHandler.bind(this);
        this.WringHandler = this.WringHandler.bind(this);

        this.attachFlag = false;
        this.activityList = actionsToBind;
        this.target = target;
        this.btnsPresed = [];
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
        if (this.attachFlag !== false) {
            for (let i = 0; i < activityList[action].keys.length; i++) {
                if (this.isKeyPressed(activityList[action].keys[i])) {
                    return this.activityList[action].enabled;
                }
            }
        }
    }

    isKeyPressed(keyCode) {
        return this.btnsPresed.includes(keyCode);
    }

    //--------------------------------------------------------------------

    activation() {
        document.addEventListener('keydown', this.PressHandler);
        document.addEventListener('keyup', this.WringHandler);
    }

    deactivation() {
        document.removeEventListener('keydown', this.PressHandler);
        document.removeEventListener('keyup', this.WringHandler);
    }

    PressHandler(e) {
        if (!this.btnsPresed.includes(e.keyCode)) {
            this.btnsPresed.push(e.keyCode);
        }
        console.log(this.btnsPresed);
    }

    WringHandler(e) {
        this.btnsPresed.splice(this.btnsPresed.indexOf(e.keyCode), 1);
        console.log(this.btnsPresed);
    }

}
