module.exports = function (tier, spawn) {
    var settings = require('settings');
    var _ = require('lodash');
    var initRoom = Game.getRoom("1-1");
    
    // if(tier > 1 && (Memory.counts.guards < 8 || Memory.counts.miners < Memory.sources.count*settings.MAGIC.SOURCE_COUNT_MULT )){
    //     tier = tier -1;
    // }
    
    // if((!Memory.at_war && tier == 1) || (!Memory.at_war && Game.time % 200 > 50 && tier > 2)){
        if(!Memory.at_war){

            if(initRoom.find(Game.CONSTRUCTION_SITES).length && !Memory.counts.builders){
                spawn.memory.spawn_order = {
                    "body": settings.BODY.BUILDER[tier],
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

            if(Memory.counts.miners < Memory.sources.count*settings.MAGIC.SOURCE_COUNT_MULT || Memory.counts.transporters < tc){
                var sr = initRoom.find(Game.SOURCES, {filter: function(s){
                    return !(s.pos.x == 35 && s.pos.y == 2); //TODO: move blacklisted sources to settings
                }});
                sr = sr.concat(sr);
                var sources = _.pluck(_.sortBy(sr, function(s){
                    return s.pos.findPathTo(spawn).length;
                }), "id")
                _.forEach(miners, function(m){
                    if(_.contains(sources, m.memory.source)){
                        sources.splice(_.indexOf(sources, m.memory.source), 1)
                    }
                })
                if(!_.size(sources) && Memory.counts.miners < Memory.sources.count) return;
                
                if(Memory.counts.miners < Memory.sources.count){
                    tc = Math.round(( Game.getObjectById(sources[0]).pos.findPathTo(spawn).length * settings.MAGIC.SOURCE_PATH_WEIGHT) / 100)
                    if(tc > 5) tc = 5;
                    spawn.memory.spawn_order = {
                        "body": settings.BODY.MINER[tier],
                        "memory": {
                            "role": "miner",
                            "tier": tier,
                            "status": "transport",
                            "source": sources[0],
                            "transport_count": tc
                        }
                    };
                    return;
                }

                if(Memory.counts.transporters < tc){
                    // var miner = require("lone_miners")(initRoom);
                    
                    spawn.memory.spawn_order = {
                        "body": settings.BODY.TRANSPORTER[tier],
                        "memory": {
                            "role": "transporter",
                            "tier": tier,
                            "status": "transport",
                            // "miner": miner
                        }
                    };
                    return;
                }
            }

            if(tier == 1 && Memory.counts.tier1 >= settings.TIER1_CREEPS && Memory.counts.builders < tier){
            Memory.sources.count = tier + 2;
            var types = _.pluck(initRoom.lookAt(spawn.pos.x + 2, spawn.pos.y), "type");
            if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
                initRoom.createConstructionSite(spawn.pos.x + 2, spawn.pos.y, Game.STRUCTURE_EXTENSION);
            }
            
            spawn.memory.spawn_order = {
                "body": settings.BODY.BUILDER[tier],
                "memory": {
                    "role": "builder",
                    "tier": tier,
                }
            };
            return;
        }
        if(tier == 2 && Memory.counts.tier2 >= settings.TIER2_CREEPS && Memory.counts.builders < tier){
            Memory.sources.count = tier + 2;
            var types = _.pluck(initRoom.lookAt(spawn.pos.x - 2, spawn.pos.y), "type");
            if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
                initRoom.createConstructionSite(spawn.pos.x - 2, spawn.pos.y, Game.STRUCTURE_EXTENSION);
            }
            
            spawn.memory.spawn_order = {
                "body": settings.BODY.BUILDER[tier],
                "memory": {
                    "role": "builder",
                    "tier": tier,
                }
            };
            return;
        }
        if(tier == 3 && Memory.counts.tier3 >= settings.TIER3_CREEPS && Memory.counts.builders < tier && Memory.counts.dying_creeps < 2){
            Memory.sources.count = tier + 2;
            var types = _.pluck(initRoom.lookAt(spawn.pos.x, spawn.pos.y + 2), "type");
            if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
                initRoom.createConstructionSite(spawn.pos.x, spawn.pos.y + 2, Game.STRUCTURE_EXTENSION);
            }
            
            spawn.memory.spawn_order = {
                "body": settings.BODY.BUILDER[tier],
                "memory": {
                    "role": "builder",
                    "tier": tier,
                }
            };
            return;
        }
    }
    return require("buildorder_survival")(tier, spawn);

}