function Shikitori() {
  this.list = [];

  this.play = (word) => {
    let new_list = [...this.list];
    let last;
    let last_character = "";
    let first_character = "";
    let game_over = false;
    let game_over_message = "";
    let insideLoop = false;

    if (this.list.length !== 0) {
      new_list = [...this.list];
      last = new_list.pop();
      last_character = last[last.length - 1];
      first_character = word[0];

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] == word) {
          game_over = true;
          insideLoop = true;
          game_over_message = "SAME WORD REPEATED ";
          // return;
        }
      }

      if (insideLoop === false) {
        if (last_character == first_character) {
          console.log(
            `${last.toUpperCase()} to ${last_character} and ${first_character} from ${word.toUpperCase()} does match`
          );
          this.list.push(word);
        } else {
          console.log(
            `${last} to ${last_character} and ${first_character} from ${word} doesnot match`
          );
          game_over = true;
          game_over_message = "LAST AND FIRST LETTER DONT MATCH";
          this.list = [];
          // return;
        }
      } else {
        console.log(word + " already exist in our list");
        game_over = true;
        game_over_message = "SAME WORD REPEATED ";
        this.list = [];
      }
    } else {
      this.list.push(word);
    }

    return [game_over, game_over_message];
    // console.log("after this ", this.list);
  };
}

let game = new Shikitori();

// let error = true;
// let error_message = "";

// to get ID easy
function getId(id) {
  return document.getElementById(id);
}

// to start the game
let btn_start = getId("start_game");

// to restart the game
let btn_restart = getId("show_exit");
let display_game = getId("display_game");
let rules = getId("rules");
//for words
let display_words = getId("display_words");
let add_word = getId("add_word");
let input_word = getId("input_word");

btn_restart.addEventListener("click", function () {
  display_game.style.display = "none";
  btn_start.style.display = "inline-block";
  rules.style.display = "block";
  btn_restart.style.display = "none";
});

btn_start.addEventListener("click", function () {
  display_game.style.display = "block";
  rules.style.display = "none";
  btn_start.style.display = "none";
  btn_restart.style.display = "inline-block";
});

add_word.addEventListener("click", function () {
  add_list();
});

function reset() {
  input_word.value = "";
  display_words.innerHTML = "";
}

function add_list() {
  let o = input_word.value;
  let [game_over, game_over_message] = game.play(o);
  console.log(game_over, game_over_message);
  if (game_over === true) {
    message_show(game_over_message);
    return;
  }
  let k = game.list;
  // k.push(o);
  let insideWords = "";
  k.forEach((item) => {
    // let li = document.createElement("li");
    // li.textContent = item;
    // display_words.appendChild(li);
    insideWords += "<li>" + item + "</li>";
  });
  console.log(insideWords);
  display_words.innerHTML = insideWords;
  input_word.value = "";
}

function message_exit() {
  reset();
  let display_model = getId("display_model");
  display_model.style.display = "none";
}

function message_show(msg) {
  let display_model = getId("display_model");
  let message_display = getId("message_display");
  message_display.textContent = msg;
  console.log(msg);
  display_model.style.display = "block";
}

let exit_btn = getId("message_exit");
// let show_btn = getId("show_exit");

exit_btn.addEventListener("click", message_exit);
// show_btn.addEventListener("click", message_show);
