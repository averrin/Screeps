module.exports = function (tier) {
    var settings = require('settings');
    var _ = require('lodash');
    var initRoom = Game.getRoom("1-1");
    var Spawn1 = Game.spawns.Spawn1;
    
    if(!Memory.at_war){
    if(tier == 1 && Memory.counts.tier1 >= settings.TIER1_CREEPS && Memory.counts.builders < tier){
        Memory.sources.count = tier + 2;
        var types = _.pluck(initRoom.lookAt(Spawn1.pos.x + 2, Spawn1.pos.y), "type");
        if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
            initRoom.createConstructionSite(Spawn1.pos.x + 2, Spawn1.pos.y, Game.STRUCTURE_EXTENSION);
        }
        
        Memory.spawn_order = {
            "body": settings["BUILDER_BODY"+tier],
            "memory": {
                "role": "builder",
                "tier": tier,
            }
        };
        return;
    }
    if(tier == 2 && Memory.counts.tier2 >= settings.TIER2_CREEPS && Memory.counts.builders < tier){
        Memory.sources.count = tier + 2;
        var types = _.pluck(initRoom.lookAt(Spawn1.pos.x - 2, Spawn1.pos.y), "type");
        if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
            initRoom.createConstructionSite(Spawn1.pos.x - 2, Spawn1.pos.y, Game.STRUCTURE_EXTENSION);
        }
        
        Memory.spawn_order = {
            "body": settings["BUILDER_BODY"+tier],
            "memory": {
                "role": "builder",
                "tier": tier,
            }
        };
        return;
    }
    if(tier == 3 && Memory.counts.tier3 >= settings.TIER3_CREEPS && Memory.counts.builders < tier && Memory.counts.dying_creeps < 2){
        Memory.sources.count = tier + 2;
        var types = _.pluck(initRoom.lookAt(Spawn1.pos.x, Spawn1.pos.y + 2), "type");
        if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
            initRoom.createConstructionSite(Spawn1.pos.x, Spawn1.pos.y + 2, Game.STRUCTURE_EXTENSION);
        }
        
        Memory.spawn_order = {
            "body": settings["BUILDER_BODY"+tier],
            "memory": {
                "role": "builder",
                "tier": tier,
            }
        };
        return;
    }
    var miners = initRoom.find(Game.MY_CREEPS, {filter: function(c){ return c.memory.role == "miner" && !!c.memory.source}});
    if(_.size(miners)){
        var tc = miners.reduce(function(s, m){
            return s + m.memory.transport_count;
        }, 0)
    }

    if(Memory.counts.miners < Memory.sources.count || Memory.counts.transporters < tc){
        var sources = _.pluck(_.sortBy(initRoom.find(Game.SOURCES, {filter: function(s){
            return !(s.pos.x == 35 && s.pos.y == 2)
        }}), function(s){
            return s.pos.findPathTo(Spawn1).length;
        }), "id")
        _.forEach(miners, function(m){
            if(_.contains(sources, m.memory.source)){
                sources = _.rest(sources, function(s){return s == m.memory.source})
            }
        })
        if(!_.size(sources) && Memory.counts.miners < Memory.sources.count) return;
        
        if(Memory.counts.miners < Memory.sources.count){
            tc = Math.round(( Game.getObjectById(sources[0]).pos.findPathTo(Spawn1).length * 16) / 100)
            if(tc > 5) tc = 5;
            Memory.spawn_order = {
                "body": settings["MINER_BODY"+tier],
                "memory": {
                    "role": "miner",
                    "tier": tier,
                    "status": "transport",
                    "source": sources[0],
                    "transport_count": tc
                }
            };
        }

        if(Memory.counts.transporters < tc){
            var miner = require("lone_miners")(initRoom);
            
            Memory.spawn_order = {
                "body": settings["TRANSPORTER_BODY"+tier],
                "memory": {
                    "role": "transporter",
                    "tier": tier,
                    "status": "transport",
                    "miner": miner
                }
            };
            return;
        }
        return;
    }
    }
    return require("buildorder_survival")(tier);

}