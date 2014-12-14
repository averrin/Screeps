module.exports = function () {

    var miner = function(){};

    miner.main = function(creep){

        var source = Game.getObjectById(creep.memory.source);
        if(creep.memory.status == "transport"){
            if(!creep.pos.isNearTo(source)){
                creep.moveTo(source);
                return;
            }else{
                creep.memory.status = "harvesting";
            }
        }
        if(creep.memory.status == "harvesting"){
            if(creep.energy == creep.energyCapacity){
                if(creep.pos.findInRange(Game.CONSTRUCTION_SITES, 1).length){
                    creep.build(creep.pos.findNearest(Game.CONSTRUCTION_SITES));
                }else{
                    var ee = creep.pos.findInRange(Game.CONSTRUCTION_SITES, 1, {filter: function(e){
                        return e.energy < e.energyCapacity;
                    }})
                    if(ee.length){
                        creep.transferEnergy(ee[0]);
                    }else{
                        creep.dropEnergy();
                    }
                }
            }else{
                creep.harvest(source);
            }
        }
        return;
    }
    return miner;
}