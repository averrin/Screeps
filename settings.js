module.exports = {
    
    MODE: "tech", //"survival", "tech"
    
    INIT_HARVESTERS:    3,
    INIT_GUARDIANS:     2,
    ROADS:              false,
    MAX_SOURCES:        2,
    TIER1_CREEPS:       12,
    TIER2_CREEPS:       12,
    TIER3_CREEPS:       12,
    
    MINER_BODY1:         [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
    MINER_BODY2:         [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
    MINER_BODY3:         [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
    MINER_BODY4:         [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.MOVE],
    
    BUILDER_BODY1:         [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY],
    BUILDER_BODY2:         [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK],
    BUILDER_BODY3:         [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK, Game.WORK],
    BUILDER_BODY4:         [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK, Game.WORK, Game.WORK],
    
    TRANSPORTER_BODY1:   [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
    TRANSPORTER_BODY2:   [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
    TRANSPORTER_BODY3:   [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE],
    TRANSPORTER_BODY4:   [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
    
    GUARD_BODY_MELEE1:   [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE],
    GUARD_BODY_MELEE2:   [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK],
    GUARD_BODY_MELEE3:   [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK,Game.TOUGH],
    GUARD_BODY_MELEE4:   [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK,Game.TOUGH,Game.TOUGH],
    
    GUARD_BODY_RANGE1:   [Game.MOVE,Game.RANGED_ATTACK,Game.MOVE,Game.MOVE,Game.TOUGH],
    GUARD_RANGE_TIER1:  12,
    GUARD_BODY_RANGE2:  [Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.MOVE,Game.MOVE,Game.TOUGH,Game.MOVE],
    GUARD_BODY_RANGE3:  [Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.MOVE,Game.MOVE,Game.TOUGH,Game.MOVE,Game.RANGED_ATTACK],
    GUARD_BODY_RANGE4:  [Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.MOVE,Game.MOVE,Game.TOUGH,Game.MOVE,Game.RANGED_ATTACK,Game.HEAL],
    
    HEALER_BODY1:        [Game.HEAL,Game.MOVE,Game.MOVE,Game.TOUGH,Game.TOUGH],
    HEALER_BODY2:        [Game.HEAL,Game.MOVE,Game.MOVE,Game.TOUGH,Game.TOUGH,Game.MOVE],
    HEALER_BODY3:        [Game.HEAL,Game.MOVE,Game.MOVE,Game.TOUGH,Game.TOUGH,Game.MOVE, Game.HEAL],
    HEALER_BODY4:        [Game.HEAL,Game.MOVE,Game.MOVE,Game.TOUGH,Game.TOUGH,Game.MOVE, Game.HEAL, Game.HEAL],
    HEALER_RANGE:       4,
    
    body_cost: function(body){ return body.reduce(function(p, c) { return Game.BODYPART_COST[c] + p; }, 0)}
}