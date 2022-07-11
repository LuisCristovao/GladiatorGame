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
  attack_slots:{fire:1,earth:1,water:1}
};

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
