const default_character_data = {
  health: 30,
  attack: 1,
  defense: 0,
  speed: 1.0,

  //states
  burned: 0.0,
  frozen: 0.0,
  rooted: 0.0,
  electrified: 0.0,
  water_state: 0,
  blind: 0.0,

  attack_slots: 1,
};

/* let character_decision_template = {
  character: hero_character_variable,
  target: "enemy",
  attack_choices: { fire: 1, earth: 1, water: 1 },
}; */
// let elements = [
//   "fire",
//   "water",
//   "earth",
//   "wind",
//   "electricity",
//   "tree",
//   "vapor",
//   "ice",
//   "ice_vapor",
//   "ice_tree",
//   "lava",
//   "blue_fire",
//   "blue_lava",
//   "sand_storm"
// ];
/*
input: attack choices
output: string with element combination
example:
  input:{fire:1,earth:1,water:1}
  output: "eletricity"
  ----
  input:{fire:3}
  output: "fire"
*/
function elementsCombinations(elements_input) {
  let element_array = [];
  Object.keys(elements_input).forEach((element) => {
    element_array.push(element);
  });
  let elements_input_string = element_array.sort().join(" "); //['earth', 'fire', 'water', 'wind']
  let elements_combinations_results = {
    earth: "earth",
    fire: "fire",
    water: "water",
    wind: "wind",
    "earth fire": "lava",
    "earth water": "tree",
    "earth wind": "sand_storm",
    "earth fire water": "electricity",
    "earth fire wind": "blue_lava",
    "earth water wind": "ice_tree",
    "fire water": "vapor",
    "fire wind": "blue_fire",
    "fire water wind": "ice_vapor",
    "water wind": "ice",
    "earth fire water wind": "all_elements",
  };
  return elements_combinations_results[elements_input_string];
}
function targetEqualsHimselfRules(character, attack_choices) {
  apply_rules = {
    fire: () => {
      character.attack += attack_choices["fire"];
      character.water_state -= attack_choices["fire"];
      character.water_state = Math.max(character.water_state, 0);
    },
    water: () => {
      character.water_state += attack_choices["water"];
      character.burned -= attack_choices["water"] * 0.1;
      character.burned = Math.max(character.burned, 0.0);
    },
    earth: () => {
      character.defense += attack_choices["earth"];
      character.electrified -= attack_choices["earth"] * 0.1;
      character.electrified = Math.max(character.electrified, 0.0);
    },
    wind: () => {
      character.speed += attack_choices["wind"];
      character.burned += attack_choices["wind"] * 0.1;
      character.burned = Math.min(character.burned, 1.0);
    },
    electricity: () => {
      character.attack +=
        attack_choices["fire"] +
        attack_choices["water"] +
        attack_choices["earth"];
      character.speed +=
        attack_choices["fire"] +
        attack_choices["water"] +
        attack_choices["earth"];
    },
    tree: () => {
      character.health += attack_choices["water"] + attack_choices["earth"];
    },
    all_elements: () => {
      character.attack += attack_choices["fire"];
      character.defense += attack_choices["earth"];
      character.speed += attack_choices["wind"];
      let elements = ["fire", "water", "earth", "wind", "electricity", "tree"];
      apply_rules[elements[Math.floor(Math.random() * elements.length)]];
    },
  };
  result_element = elementsCombinations(attack_choices);
  if (apply_rules[result_element] == null) {
    Object.keys(attack_choices).forEach((element) => {
      apply_rules[element];
    });
  } else {
    apply_rules[result_element]();
  }
  return character;
}
function targetDiffThanHimselfRules(character, attack_choices) {
  apply_rules = {
    fire: () => {
      character.health -= attack_choices["fire"];
      character.water_state = Math.max(
        character.water_state - attack_choices["fire"] * 0.1,
        0
      );
      character.burned = Math.min(
        character.burned + attack_choices["fire"] * 0.1,
        1.0
      );
    },
    water: () => {
      character.health -= attack_choices["water"];
      character.water_state += attack_choices["water"];
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.burned = Math.max(
        character.burned - attack_choices["water"] * 0.1,
        0.0
      );
    },
    earth: () => {
      character.health -= attack_choices["earth"];
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
    },
    wind: () => {
      character.health -= attack_choices["wind"];
      character.speed = Math.max(character.speed - attack_choices["wind"], 0.0);
      if (character.burned >= 0.1) {
        character.burned = Math.min(
          character.burned + attack_choices["wind"] * 0.1,
          1.0
        );
      }
    },
    //water+wind
    ice: () => {
      character.health -= attack_choices["water"] + attack_choices["wind"];
      //character.water_state += attack_choices["water"];
      character.speed = Math.max(
        character.speed - attack_choices["wind"] * 0.1,
        0.0
      );
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.burned = Math.max(
        character.burned - attack_choices["water"] * 0.1,
        0.0
      );
      character.frozen = Math.min(
        character.frozen +
          (attack_choices["water"] + attack_choices["wind"]) * 0.1,
        1.0
      );
    },
    //water+fire+earth
    electricity: () => {
      character.health -=
        attack_choices["fire"] +
        attack_choices["water"] +
        attack_choices["earth"];
      character.electrified = Math.min(
        character.electrified +
          (attack_choices["fire"] +
            attack_choices["water"] +
            attack_choices["earth"]) *
            0.1,
        1.0
      );
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
    },
    //water+earth
    tree: () => {
      character.health -= attack_choices["water"] + attack_choices["earth"];
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.rooted = Math.min(
        character.rooted +
          (attack_choices["water"] + attack_choices["earth"]) * 0.1,
        1.0
      );
    },
    //fire + earth
    lava: () => {
      character.health -= attack_choices["fire"] + attack_choices["earth"];
      character.water_state = Math.max(
        character.water_state - attack_choices["fire"] * 0.1,
        0
      );
      character.burned = Math.min(
        character.burned + attack_choices["fire"] * 0.1,
        1.0
      );
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
    },
    //water + fire
    vapor: () => {
      character.health -= attack_choices["water"] + attack_choices["fire"];
      character.blind = Math.min(
        character.blind +
          (attack_choices["water"] + attack_choices["fire"]) * 0.1,
        1.0
      );
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
    },
    //earth + wind
    sand_storm: () => {
      character.health -= attack_choices["wind"] + attack_choices["earth"];
      character.speed = Math.max(character.speed - attack_choices["wind"], 0.0);
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
    },
    //fire + wind
    blue_fire: () => {
      character.health -= attack_choices["fire"] + attack_choices["wind"];
      character.water_state = Math.max(
        character.water_state -
          (attack_choices["fire"] + attack_choices["wind"]) * 0.1,
        0
      );
      character.burned = Math.min(
        character.burned +
          (attack_choices["fire"] + attack_choices["wind"]) * 0.1,
        1.0
      );
    },
    //fire + wind + earth
    blue_lava: () => {
      character.health -= attack_choices["fire"] + attack_choices["wind"];
      character.water_state = Math.max(
        character.water_state -
          (attack_choices["fire"] + attack_choices["wind"]) * 0.1,
        0
      );
      character.burned = Math.min(
        character.burned +
          (attack_choices["fire"] + attack_choices["wind"]) * 0.1,
        1.0
      );
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
    },
    //water+fire+wind
    ice_vapor: () => {
      character.health -=
        attack_choices["water"] +
        attack_choices["fire"] +
        attack_choices["wind"];
      character.blind = Math.min(
        character.blind +
          (attack_choices["water"] + attack_choices["fire"]) * 0.1,
        1.0
      );
      character.speed = Math.max(character.speed - attack_choices["wind"]*0.1, 0.0);
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.burned = Math.max(
        character.burned - attack_choices["water"] * 0.1,
        0.0
      );
      character.frozen = Math.min(
        character.frozen +
          (attack_choices["water"] + attack_choices["wind"]) * 0.1,
        1.0
      );
    },
    //water + earth + wind
    ice_tree: () => {
      character.health -= attack_choices["water"] + attack_choices["earth"];
      character.defense = Math.max(
        character.defense - attack_choices["earth"],
        0
      );
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.rooted = Math.min(
        character.rooted +
          (attack_choices["water"] + attack_choices["earth"]) * 0.1,
        1.0
      );
      character.speed = Math.max(character.speed - attack_choices["wind"]*0.1, 0.0);
      character.attack = Math.max(
        character.attack - attack_choices["water"],
        1
      );
      character.burned = Math.max(
        character.burned - attack_choices["water"] * 0.1,
        0.0
      );
      character.frozen = Math.min(
        character.frozen +
          (attack_choices["water"] + attack_choices["wind"]) * 0.1,
        1.0
      );
    },
    all_elements: () => {
      character.health -=
        attack_choices["water"] +
        attack_choices["fire"] +
        attack_choices["wind"] +
        attack_choices["earth"];
      character.attack = Math.max(character.attack-attack_choices["water"],1);
      character.defense = Math.max(character.defense-attack_choices["earth"],0);
      character.speed = Math.max(character.speed-attack_choices["wind"]*0.1,0.0);
      let elements = [
        "fire",
        "water",
        "earth",
        "wind",
        "electricity",
        "tree",
        "vapor",
        "ice",
        "ice_vapor",
        "ice_tree",
        "lava",
        "blue_fire",
        "blue_lava",
        "sand_storm",
      ];
      apply_rules[elements[Math.floor(Math.random() * elements.length)]]();
    },
  };
  result_element = elementsCombinations(attack_choices);
  apply_rules[result_element]();

  return character;
}
/*
input: json with both characters hero and enemy decisions (like character_decision_template)
input example:
{
  hero:{
    character: hero_character_variable,
    target:"enemy",
    attack_choices:{fire:1,earth:1,water:1}
  },
  enemy:{
    character: enemy_character_variable,
    target:"hero",
    attack_choices:{fire:1,earth:1,water:1}
  }
}
output: returns same json from input but with character variables updated
*/
function GameRules(characters_state_decisions) {
  Object.keys(characters_state_decisions).forEach((key) => {
    let target = characters_state_decisions[key].target;
    let character = characters_state_decisions[target].character;
    let attack_choices = characters_state_decisions[key].attack_choices;
    //if target is himself
    if (target == key) {
      //alterar estado da personagem
      characters_state_decisions[target].character = targetEqualsHimselfRules(
        character,
        attack_choices
      );
      /*
      character.health+=1
      character.defense+=1
      characters_state_decisions[target].character=character
      */
    }
    //if target is the adversary
    else {
      //alterar estado da personagem
      characters_state_decisions[target].character = targetDiffThanHimselfRules(
        character,
        attack_choices
      );
      /*
      character.health-=1
      character.defense-=1
      character.burned+=0.1
      characters_state_decisions[target].character=character
      */
    }
  });
  return characters_state_decisions;
}

class Character {
  constructor(character_data) {
    this.health = character_data.health;
    this.attack = character_data.attack;
    this.defense = character_data.defense;
    this.speed = character_data.speed;

    //states
    this.burned = character_data.burned;
    this.frozen = character_data.frozen;
    this.rooted = character_data.rooted;
    this.electrified = character_data.electrified;
    this.water_state = character_data.water_state;
    this.blind = character_data.blind;

    this.attack_slots = character_data.attack_slots;
  }
  update_state = (character_data) => {
    this.health = character_data.health;
    this.attack = character_data.attack;
    this.defense = character_data.defense;
    this.speed = character_data.speed;
    this.blind = character_data.blind;

    //states
    this.burned = character_data.burned;
    this.frozen = character_data.frozen;
    this.rooted = character_data.rooted;
    this.electrified = character_data.electrified;
    this.water_state = character_data.water_state;

    this.attack_slots = character_data.attack_slots;
  };
  show_state = () => {
    return {
      health: this.health,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,

      //states
      burned: this.burned,
      frozen: this.frozen,
      rooted: this.rooted,
      electrified: this.electrified,
      water_state: this.water_state,
      blind: this.blind,

      attack_slots: this.attack_slots,
    };
  };
  /* execute = (state) => {
      this.dt = (new Date().getTime() - this.time) * 1e-3;
      this.real_time+=this.dt
      state_machine[state].play();
      this.state = state_machine[state].next();
      this.time= new Date().getTime()  
    };
    start = () => {
      this.run()
    };
    run = () => {
      this.execute(this.state);
      requestAnimationFrame(this.run);
    }; */
}

let hero = new Character(default_character_data);
let enemy = new Character(default_character_data);
console.log(hero.health);
let first_state = {
  hero: {
    character: hero,
    target: "enemy",
    attack_choices: { fire: 1, earth: 1, water: 1 ,wind:1},
  },
  enemy: {
    character: enemy,
    target: "hero",
    attack_choices: { fire: 1, water: 1 },
  },
};
let next_state = {
  hero: {
    character: new Character(hero.show_state()),
    target: "enemy",
    attack_choices: { fire: 1, earth: 1, water: 1 ,wind:1},
  },
  enemy: {
    character: new Character(enemy.show_state()),
    target: "hero",
    attack_choices: { fire: 1, water: 1 },
  },
};
console.log(first_state);
console.log(GameRules(next_state));
