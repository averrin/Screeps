module.exports = function () {
    var _ = require('lodash');
    var settings = require('settings');
    
    var initRoom = Game.getRoom("1-1");
    var sources = initRoom.find(Game.SOURCES);
    Memory.sources = {};
    Memory.sources.count = _.size(sources);
    if(Memory.sources.count > settings.MAX_SOURCES) Memory.sources.count = settings.MAX_SOURCES;
    
    Memory.flag.x = Game.spawns.Spawn1.pos.x + 10;
    Memory.flag.y = Game.spawns.Spawn1.pos.y;
    
    console.log("Tech mode inited");
}