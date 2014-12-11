module.exports = function (creep) {
    
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
        filter: function(object) {
            return object.getActiveBodyparts(Game.HEAL) > 0 && object.getActiveBodyparts(Game.MOVE) > 0;
        }
    });
    if(!target){
        target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(Game.ATTACK) > 0 && object.getActiveBodyparts(Game.MOVE) > 0;
            }
        });
    }
    if(!target){
        target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    }

    return target;
};