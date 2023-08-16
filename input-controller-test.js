import { dopActivityList } from './plugin-settings.js'
import { inputController } from "./input-controller.js"
import { KeyBoard } from "./keyboard-plugin.js"
import { Mouse } from "./mouse-plugin.js"


const target = document.querySelector('.Car');

const keyBoard = new KeyBoard();
const mouse = new Mouse();

inputController.setTarget(target);
inputController.pluginsAdd(keyBoard, mouse);

let x = 50;
let y = 50;

const actionActivatedEvent = () => {
    if (inputController.isActionActive('right')) {
        if (keyBoard.isActionActive('right') || mouse.isActionActive('right')) {
            x += 0.2;
            target.style.left = `${x}%`;
        }
    }
    if (inputController.isActionActive('left')) {
        if (keyBoard.isActionActive('left') || mouse.isActionActive('left')) {
            x -= 0.2;
            target.style.left = `${x}%`;
        }
    }
    if (inputController.isActionActive('up')) {
        if (keyBoard.isActionActive('up')) {
            y -= 0.2;
            target.style.top = `${y}%`;
        }
    }
    if (inputController.isActionActive('down')) {
        if (keyBoard.isActionActive('down')) {
            y += 0.2;
            target.style.top = `${y}%`;
        }
    }
    if (inputController.isActionActive('jump')) {
        if (keyBoard.isActionActive('jump')) {
            target.style.backgroundColor = 'blue'
        } 
    }
}
const actionDeactivatedEvent = () => {
    if (!inputController.isActionActive('right')) {
        if (!keyBoard.isActionActive('right') || !mouse.isActionActive('right')) {
            target.style.left = `${x}%`;
        }
    }
    if (!inputController.isActionActive('left')) {
        if (!keyBoard.isActionActive('left') || !mouse.isActionActive('left')) {
            target.style.left = `${x}%`;
        }
    }
    if (!inputController.isActionActive('up')) {
        if (!keyBoard.isActionActive('up')) {
            target.style.top = `${y}%`;
        }
    }
    if (!inputController.isActionActive('down')) {
        if (!keyBoard.isActionActive('down')) {
            target.style.top = `${y}%`;
        }
    }
    if (!inputController.isActionActive('jump')) {
        if (!keyBoard.isActionActive('jump')) {
            target.style.backgroundColor = 'green';
        }
    }
}
const addEvents = () => {
    document.addEventListener(inputController.ACTION_ACTIVATED, actionActivatedEvent);
    document.addEventListener(inputController.ACTION_DEACTIVATED, actionDeactivatedEvent);
}
addEvents();


const attach = document.querySelector('.Attach');
attach.onclick = () => {
    inputController.attach(target, false);
};

const detach = document.querySelector('.Detach');
detach.onclick = () => {
    inputController.detach();
};

const jumbBind = document.querySelector('.Jumpbind');
jumbBind.onclick = () => {
    inputController.bindActions(dopActivityList);
};
