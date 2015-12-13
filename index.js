var lightcontrol = require("lightcontrol")
var Service, Characteristic;

function LightControlAccessory(log, config) {
    this.log = log;
    this.name = config["name"];
    this.port = config["port"];
    this.group = parseInt(config["group"]);
    this.plug = parseInt(config["plug"]);
    this.state = false;

    this.service = new Service.Lightbulb(this.name);
    this.controller = new lightcontrol.Controller(this.port);
    this.ready = false;

    this.controller.on("open", (function() {
       this.ready = true;
    }).bind(this));

    var onCharacteristic = this.service.getCharacteristic(Characteristic.On);
    onCharacteristic.on('get', this.getState.bind(this));
    onCharacteristic.on('set', this.setState.bind(this));
}

LightControlAccessory.prototype.getState = function(callback) {
    callback(null, this.state);
};

LightControlAccessory.prototype.setState = function(state, callback) {
    if (!this.ready) {
        callback(new Error("Not ready"));
        return;
    }

    this.controller.set(this.group, this.plug, state);
    this.state = state;

    callback(null);
};

LightControlAccessory.prototype.getServices = function() {
    return [ this.service ];
};

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-lightcontrol", "lightcontrol", LightControlAccessory);
};
