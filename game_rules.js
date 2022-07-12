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
  water_state: false,

  attack_slots: 1,
};

let character_decision_template = {
  character: hero_character_variable,
  target:"enemy",
  attack_choices:{fire:1,earth:1,water:1}
};




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
function elementsCombinations(){

}
function targetEqualsHimselfRules(character,attack_choices){

}
function targetDiffThanHimselfRules(character,attack_choices){
  
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
    character: hero_character_variable,
    target:"hero",
    attack_choices:{fire:1,earth:1,water:1}
  }
}
output: returns same json from input but with character variables updated
*/
function GameRules(characters_state_decisions){
  
  Object.keys(characters_state_decisions).forEach(key => {
    let target=characters_state_decisions[key].target
    let character=characters_state_decisions[target].character
    let attack_choices=characters_state_decisions[key].attack_choices
    //if target is himself
    if(target==key){
      //alterar estado da personagem
      targetEqualsHimselfRules(character,attack_choices)
      /*
      character.health+=1
      character.defense+=1
      characters_state_decisions[target].character=character
      */
      
    }
    //if target is the adversary
    else{
      //alterar estado da personagem
      targetDiffThanHimselfRules(character,attack_choices)
      /*
      character.health-=1
      character.defense-=1
      character.burned+=0.1
      characters_state_decisions[target].character=character
      */
     
    }

  })
  return characters_state_decisions
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

    this.attack_slots = character_data.attack_slots;
  }
  update_state = (character_data) => {
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
console.log(hero.health);
