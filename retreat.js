module.exports = function (creep, enemy) {
    
    var tx = creep.pos.x - (enemy.pos.x - creep.pos.x);
    var ty = creep.pos.y - (enemy.pos.y - creep.pos.y);
    var res = creep.moveTo(tx, ty);
    if(res !== 0){
        creep.moveTo(Memory.flag.x, Memory.flag.y);
    }
	return;
};