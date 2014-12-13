module.exports = {
    
    MODE: "tech", //"survival", "tech"
    
    INIT_HARVESTERS:    3,
    INIT_GUARDIANS:     2,
    ROADS:              false,
    MAX_SOURCES:        2,
    HEALER_RANGE:       4,
    TIER1_CREEPS:       12,
    TIER2_CREEPS:       12,
    TIER3_CREEPS:       12,
    GUARD_RANGE_TIER1:  12,

    BODY: {
    
        MINER:          ["",
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.MOVE],
        ],
        
        BUILDER:        ["",
                        [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.WORK, Game.WORK, Game.WORK],
        ],
        
        TRANSPORTER:    ["",
                        [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
                        [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
                        [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE],
                        [Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE, Game.CARRY],
        ],
        
        GUARD_MELEE:    ["",
                        [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE],
                        [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK],
                        [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK,Game.TOUGH],
                        [Game.ATTACK, Game.ATTACK,Game.TOUGH,Game.MOVE,Game.MOVE,Game.ATTACK,Game.TOUGH,Game.TOUGH],
        ],
        
        GUARD_RANGE:    ["",
                        [Game.TOUGH, Game.MOVE,Game.MOVE,Game.MOVE, Game.RANGED_ATTACK],
                        [Game.TOUGH, Game.MOVE,Game.MOVE,Game.MOVE, Game.RANGED_ATTACK,Game.RANGED_ATTACK],
                        [Game.MOVE,  Game.MOVE,Game.MOVE,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK],
                        [Game.MOVE,  Game.MOVE,Game.MOVE,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK, Game.RANGED_ATTACK],
        ],
        
        HEALER:         ["",
                        [Game.TOUGH, Game.HEAL,Game.MOVE,Game.MOVE],
                        [Game.TOUGH,Game.TOUGH,Game.MOVE,Game.MOVE,Game.MOVE, Game.HEAL],
                        [Game.TOUGH,Game.TOUGH,Game.MOVE,Game.MOVE,Game.MOVE, Game.HEAL, Game.HEAL],
                        [Game.TOUGH,Game.TOUGH,Game.MOVE,Game.MOVE,Game.MOVE, Game.HEAL, Game.HEAL, Game.HEAL],
        ],
    },
    
    body_cost: function(body){ return body.reduce(function(p, c) { return Game.BODYPART_COST[c] + p; }, 0)}
}