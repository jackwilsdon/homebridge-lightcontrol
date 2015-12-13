var Service, Characteristic;

function LightControlAccessory(log, config) {
    this.log = log;
    this.name = config["name"];

    this.service = new Service.Lightbulb(this.name);

    var onCharacteristic = this.service.getCharacteristic(Characteristic.On);
    onCharacteristic.on('get', this.getState.bind(this));
    onCharacteristic.on('set', this.setState.bind(this));
}

LightControlAccessory.prototype.getState = function(callback) {
    this.log("Getting light control state...");

    callback(null, false);
};

LightControlAccessory.prototype.setState = function(state, callback) {
    this.log("Setting light control state to " + state);

    callback(null);
};

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-lightcontrol", "lightcontrol", LightControlAccessory);
}
