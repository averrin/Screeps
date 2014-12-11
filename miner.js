module.exports = function (creep) {
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
        creep.harvest(source);
    }
    return;
}