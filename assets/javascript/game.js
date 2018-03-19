class Jedi {
  //object template for jedi
  constructor(name, value, src, health, baseAttack, counterAttack) {
    this.name = name;
    this.value = value;
    this.health = health;
    this.baseHealth = health;
    this.attack = baseAttack;
    this.baseAttack = baseAttack;
    this.counterAttack = counterAttack;
    this.src = src;
    this.createElement()
  }

  createElement() {
    //jedi element creation for html
    //container element
    this.element = $("<button>");
    this.element.addClass("col-3 justify-content-center heroBox");
    this.element.attr("value", this.value);
    //character title
    this.title = $("<h3>");
    this.title.addClass("heroT w-100");
    this.title.text(this.name);
    this.element.append(this.title);
    //image placement
    this.image = $("<img>");
    this.image.attr("src", this.src);
    this.image.attr("alt", this.name);
    this.image.addClass("pic ");
    this.element.append(this.image);
    //text content holder
    this.content = $("<div>");
    this.content.addClass(".holder");
    this.element.append(this.content);
    //character status
    this.status = $("<h4>");
    this.status.addClass("heroS");
    this.status.text("health: " + this.health);
    this.content.append(this.status)
  }

  updateStatus() {
    //to be used frequently during battle
    this.status.text(this.health)
  }

  reset() {
    // reset object to origional status
    this.health = this.baseHealth;
    this.attack = this.baseAttack;
  }
}

window.gameEnv = {
  //main game enviroment
  //frequently used $ objects and counters
  heroBoxes: $(".heroBox"),
  instructionText: $("#instructions"),
  secondRow: $("#secondRow"),
  thirdRow: $("#thirdRow"),
  fourthRow: $("#fourthRow"),
  wins: 0,
  losses: 0,
  phase: 0,

  activeSet: {},

  characters: {
    //base character declaration
    luke: new Jedi("Luke Skywalker", "luke", "#", 100, 100, 100),
    obi: new Jedi("Obi-Wan Kenobi", "obi", "#", 100, 100, 100),
    maul: new Jedi("Darth Maul", "maul", "#", 100, 100, 100),
    sidious: new Jedi("Darth Sidious", "sidious", "#", 100, 100, 100),
  },

  displaySet: [
    //contains functions as display templates, linked with this.phase

    function() {
      //phase 0, choose character
      gameEnv.instructionText.text("Choose your character");
      gameEnv.secondRow.append(gameEnv.createHeader("Characters"));
      gameEnv.thirdRow.append(gameEnv.createHeader("   "));
      let i = 0;
      $.each(gameEnv.characters, function (key, value) {
        if( i < 2) {
          $("#secondRow").append(value.element);
        }
        else {
          $("#thirdRow").append(value.element);
        }
        i++
      });
    },

    function () {
      //phase 1, choose opponent
      gameEnv.instructionText.text("Choose your opponent");
      gameEnv.secondRow.append(gameEnv.createHeader("You Chose:"));
      gameEnv.thirdRow.append(gameEnv.createHeader("Opponents:"));
      gameEnv.fourthRow.append(gameEnv.createHeader("Defeated:"));
      gameEnv.secondRow.append(gameEnv.activeSet.player.element);
      $.each(gameEnv.activeSet.standby, function (index, obj) {
        gameEnv.thirdRow.append(obj.element);
      });
      $.each(gameEnv.activeSet.dead, function (index, obj) {
        gameEnv.thirdRow.append(obj.element);
      });
    },

    function() {
      gameEnv.secondRow.append(gameEnv.createHeader("Fight!"));
      gameEnv.thirdRow.append(gameEnv.createHeader("Spectating:"));
      gameEnv.fourthRow.append(gameEnv.createHeader("Defeated:"));
      gameEnv.secondRow.append([
          gameEnv.activeSet.player.element,
          gameEnv.attackButton(),
          gameEnv.activeSet.opponent.element,
        ]);
      $.each(gameEnv.activeSet.standby, function(index, obj) {
        gameEnv.thirdRow.append(obj.element);
      });
      $.each(gameEnv.activeSet.dead, function(index, obj) {
        gameEnv.thirdRow.append(obj.element);
      });
    }
  ],

  createHeader: function(text) {
    //creates h5 header for simple changes
    let header = $("<h5>");
    header.addClass("col-12");
    header.text(text);
    return header;
  },

  attackButton: function() {
    let button = $("<button>");
    button.addClass("atk-btn btn btn-danger col-3 heroBox");
    button.attr("value", "atk");
    button.text("Attack");
    return button;
  },

  chooseCharacter: function(val){
    //creates list for active character orientation [[jedi, status], ...]
    console.log(val);
    this.activeSet.standby = [];
    this.activeSet.dead = [];
    $.each(this.characters, function (key, obj) {
      if (key === val) {
        gameEnv.activeSet.player = obj;
      }
      else {
        gameEnv.activeSet.standby.push(obj)
      }
    });
    this.phase = 1;
    this.initialize();
  },

  chooseEnemy: function(val) {
    $.each(this.characters, function (key, obj) {
      console.log("here");

      console.log(gameEnv.activeSet.standby.indexOf(obj));
      if (
        val === key
        && gameEnv.activeSet.standby.indexOf(obj) !== -1
      ) {
        gameEnv.activeSet.opponent = obj;
        gameEnv.activeSet.standby.splice(
          gameEnv.activeSet.standby.indexOf(obj), 1
        );
        gameEnv.phase = 2;
      }
    });
    if(this.phase === 2) {
      this.initialize()
    }
  },

  boxClick: function(val) {
    // conditional logic for heroBox click events
    switch (this.phase) {
      case 0:
        this.chooseCharacter(val);
        break;
      case 1:
        this.chooseEnemy(val);
        break;
    }

  },

  initialize: function () {
    //sets initial enviroment on dom load
    $(".envo").empty();
    this.displaySet[this.phase]();
    $(".heroBox").click(function () {
      let value = $(this).val();
      console.log(value);
      gameEnv.boxClick(value);
    });
  }
};

$(document).ready(function () {
  gameEnv.initialize();
});
