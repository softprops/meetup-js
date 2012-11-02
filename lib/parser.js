var EventEmitter = require('events').EventEmitter;

var Parser = module.exports = function Parser() {
    EventEmitter.call(this);
    this.buffer = '';
    return this;
};

Parser.prototype = Object.create(EventEmitter.prototype);
Parser.END = '\n';
Parser.END_LENGTH = Parser.END.length;

Parser.prototype.receive = function receive(buffer) {
    console.log("receive")
    this.buffer += buffer.toString('utf8');
    var index, json;
    while ((index = this.buffer.indexOf(Parser.END)) > -1) {
        json = this.buffer.slice(0, index);
        this.buffer = this.buffer.slice(index + Parser.END_LENGTH);
        if (json.length > 0) {
            console.log("emitting ")
            try { this.emit('data', JSON.parse(json)); }
            catch (e) { console.log("error in parse of " + json + " " + e); this.emit('error', e); }
        } else {
            console.log("buffering " + this.buffer)
        }
    }
}
