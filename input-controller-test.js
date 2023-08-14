const activityList = {
    "left": {
        keys: [37, 65],
        enabled: true
    },
    "right": {
        keys: [39, 68],
        enabled: true
    },
    "up": {
        keys: [38, 87],
        enabled: true
    },
    "down": {
        keys: [40, 83],
        enabled: true
    },
}

const target = document.querySelector('.Car');
const controller = new InputController(activityList, target);

window.requestAnimationFrame(Move);
let x = 50;
let y = 50;
function Move() {
    if (controller.isActionActive('right')) {
        x += 0.2;
        target.style.left = `${x}%`;
    }
    if (controller.isActionActive('left')) {
        x -= 0.2;
        target.style.left = `${x}%`;
    }
    if (controller.isActionActive('up')) {
        y -= 0.2;
        target.style.top = `${y}%`;
    }
    if (controller.isActionActive('down')) {
        y += 0.2;
        target.style.top = `${y}%`;
    }
    window.requestAnimationFrame(Move)
}

const activation = document.querySelector('.Activation');
activation.onclick = () => {
    controller.activation();
};

const deactivation = document.querySelector('.Deactivation');
deactivation.onclick = () => {
    controller.deactivation();
};

const attach = document.querySelector('.Attach');
attach.onclick = () => {
    controller.attach(target, false);
};

const detach = document.querySelector('.Detach');
detach.onclick = () => {
    controller.detach();
};

