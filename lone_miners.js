module.exports = function(room){
    var _ = require('lodash');
    var settings = require('settings');
    var Spawn1 = Game.spawns.Spawn1;

    var transporters = room.find(Game.MY_CREEPS, {filter: function(c){ return c.memory.role == "transporter" && !!c.memory.miner}});
    var raw_miners = _.sortBy(room.find(Game.MY_CREEPS, {filter: function(c){ return c.memory.role == "miner"}}), function(s){
        return s.pos.findPathTo(Spawn1).length;
    });
    var miners = [];
    _.forEach(raw_miners, function(m){
        for (var i = 0; i < m.memory.transport_count; i++) {
            miners.push(m.id)
        }
    })
    _.forEach(transporters, function(t){
        if(_.contains(miners, t.memory.miner)){
            miners.splice(_.indexOf(miners, t.memory.miner), 1)
        }
    })
    return miners[0];
}
