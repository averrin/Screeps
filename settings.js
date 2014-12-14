module.exports = {
    
    MODE: "tech", //"survival", "tech"
    
    INIT_HARVESTERS:    3,
    INIT_GUARDIANS:     2,
    ROADS:              false,
    MAX_SOURCES:        3,
    HEALER_RANGE:       4,
    TIER1_CREEPS:       8,
    TIER2_CREEPS:       8,
    TIER3_CREEPS:       8,
    GUARD_RANGE_TIER1:  6,

    MAGIC: {
        SOURCE_COUNT_MULT: 1.5,
        SOURCE_PATH_WEIGHT: 16,
        GUARD_DIST: 15,
        SPAWN_HOSTILE_RANGE: 6,
    },

    BODY: {
    
        MINER:          ["",
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.WORK, Game.WORK],
                        [Game.MOVE, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.WORK, Game.WORK, Game.MOVE],
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
                        [Game.TOUGH, Game.MOVE,Game.MOVE,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.MOVE],
                        [Game.MOVE,  Game.MOVE,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK, Game.MOVE],
                        [Game.MOVE,  Game.MOVE,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK,Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE],
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