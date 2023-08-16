export class InputController {
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

        this.plugins = [];
        this.enabled = false;
    }

    bindActions(actionsToBind) {
        this.activityList = Object.assign(this.activityList, actionsToBind);
    }

    enableAction(actionName) {
        if (!this.enabled) {
            this.activityList[actionName].enabled = true;
        }
    }

    disableAction(actionName) {
        if (this.enabled) {
            this.activityList[actionName].enabled = false;
        }
    }

    attach(target, dontEnable) {
        if (dontEnable) {
            this.enabled = false;
            this.target = null;
        } else {
            this.enabled = true;
            this.target = target;
            this.plugins.forEach((plugin) => {
                plugin.attachPlugin();
            })
        }
    }

    detach() {
        this.target = null;
        this.enabled = false;
        this.plugins.forEach((plugin) => {
            plugin.detachPlugin();
        })
    }

    //--------------------------------------------------------------------

    pluginsAdd() {
        this.plugins.push(...argumens);
    }

}
