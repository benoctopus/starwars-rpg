class Jedi {
  //object template for jedi
  constructor(name, src, health, baseAttack, counterAttack) {
    this.name = name;
    this.health = health;
    this.baseAttack = baseAttack;
    this.currentAttack = this.baseAttack;
    this.counterAttack = counterAttack;
    this.src = src;
    this.createElement()
  }

  createElement() {
    //jedi element creation for html
    //container element
    this.element = $("<button>");
    this.element.addClass(".heroBox col-3 card");
    this.element.attr("value", this.name);
    //character title
    this.title = $("<h3>");
    this.title.addClass(".heroT card-header w-100");
    this.title.text(this.name);
    this.element.append(this.title);
    //image placement
    this.image = $("<img>");
    this.image.attr("src", this.src);
    this.image.attr("alt", this.name);
    this.image.addClass("pic card-image-top");
    this.element.append(this.image);
    //text content holder
    this.content = $("<div>");
    this.content.addClass("card-body");
    this.element.append(this.content);
    //character status
    this.status = $("<h4>");
    this.status.addClass(".heroS");
    this.status.text("health: " + this.health);
    this.content.append(this.status)
  }

  updateStatus() {
    this.status.text(this.health)
  }


}

window.gameEnv = {
  listener: $(".heroBox"),
  wins: 0,
  losses: 0,

  createJedi: function () {
    // create all jedi
    this.characters = {};
    this.characters.luke = new Jedi("Luke Skywalker", "#", 100, 100, 100);
    this.characters.obi = new Jedi("Obi-Wan Kenobi", "#", 100, 100, 100);
    this.characters.maul = new Jedi("Darth Maul", "#", 100, 100, 100);
    this.characters.sidious = new Jedi("Darth Sidious", "#", 100, 100, 100);
    this.initialDisplay()
  },

  initialDisplay: function(){
    $.each(this.characters, function(key, value) {
      $("#firstRow").append(value.element);
    })
  },

  // dispatcher: function(val) {
  //   switch (this.state) {
  //     case "pre":
  //       this.chooseJedi(val);
  //       break;
  //     case "chooseOpponent":
  //       this.chooseOpponent(val);
  //       break;
  //   }
  // },

  initialize: function () {
    this.createJedi();
    this.state = "pre";
  }
};

$(document).ready(function () {
  gameEnv.initialize();
  gameEnv.listener.on("click", function (event) {
    let val = gameEnv.listener.val();
    console.log(val);
    // gameEnv.dispatcher(this.val());
  });
});
