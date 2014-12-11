module.exports = function () {
    var _ = require('lodash');
    var initRoom = Game.getRoom("1-1");
    var Spawn1 = Game.spawns.Spawn1;

    var a = -10;
	var e = initRoom.createFlag(Game.spawns.Spawn1.pos.x + a, Game.spawns.Spawn1.pos.y, "Flag1")
	if(e == -10){
	    a = -10;
	    console.log(initRoom.createFlag(Game.spawns.Spawn1.pos.x + a, Game.spawns.Spawn1.pos.y, "Flag1"));
	}
	e = initRoom.createFlag(Game.spawns.Spawn1.pos.x + a/2, Game.spawns.Spawn1.pos.y - 1, "Flag2")
	if(e == -10){
	    initRoom.createFlag(Game.spawns.Spawn1.pos.x + a/2, Game.spawns.Spawn1.pos.y + 1, "Flag2")
	}
	var s = Spawn1.pos.findNearest(Game.SOURCES_ACTIVE, {heuristicWeight: 1});
	Memory.Source = s.id;
	
    var types = _.pluck(initRoom.lookAt(Spawn1.pos.x + 2, Spawn1.pos.y), "type");
    if(!_.contains(types, "extension") && !_.contains(types, "constructionSite")){
        initRoom.createConstructionSite(Spawn1.pos.x + 2, Spawn1.pos.y, Game.STRUCTURE_EXTENSION);
    }
	
    console.log("Survival mode inited");
}