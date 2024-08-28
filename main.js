import inquirer from "inquirer";
import chalk from "chalk";
let while_condiation = true;
class player {
    name;
    fuel = 100;
    constructor(myplayername) {
        this.name = myplayername;
    }
    fueldecrease() {
        this.fuel = this.fuel - 25;
    }
    fuelincrease() {
        this.fuel = this.fuel + 25;
    }
}
class opponent {
    name;
    fuel = 100;
    constructor(myenemyname) {
        this.name = myenemyname;
    }
    fueldecrease() {
        this.fuel = this.fuel - 25;
    }
    fuelincrease() {
        this.fuel = this.fuel + 25;
    }
}
console.log("welcome to the Adventure Game ");
let userinput = await inquirer.prompt([{
        type: "input",
        name: "myname",
        message: "Please enter your player name",
    },
    {
        type: "list",
        name: "opponentname",
        message: "select an opponent",
        choices: ["skeleton", "alien", "zombie"],
    }
]);
let { myname, opponentname } = userinput;
console.log(`${chalk.bold.green(myname)} vs ${chalk.bold.red(opponentname)}`);
let myplayer = new player(myname);
let myopponent = new opponent(opponentname);
do {
    let startmatch = await inquirer.prompt({
        type: "list",
        name: "options",
        message: "select options",
        choices: ["attack", "increase health", "run for life"]
    });
    if (startmatch.options === "attack")
        attack();
    if (startmatch.options === "increase health")
        increasehealth();
    if (startmatch.options === "run for life")
        runForLife();
    ///attack function start
    function attack() {
        //genating 0 and 1
        let number = Math.floor(Math.random() * 2);
        console.log(number);
        if (number === 0) {
            myplayer.fueldecrease();
            console.log(chalk.bold.blue(`${myplayer.name}'s fuel is ${chalk.bold.red(myplayer.fuel)}`));
            console.log(chalk.bold.blue(`${myopponent.name}'s fuel is ${chalk.bold.green(myopponent.fuel)}`));
            if (myplayer.fuel == 0) {
                console.log(chalk.bold.red(`${myplayer.name} lost ! better luck next time`));
                process.exit();
            }
        }
        else if (number == 1) {
            myopponent.fueldecrease();
            console.log(chalk.bold.blue(`${myplayer.name}'s fuel is ${chalk.bold.green(myplayer.fuel)}`));
            console.log(chalk.bold.blue(`${myopponent.name}'s fuel is ${chalk.bold.red(myopponent.fuel)}`));
            if (myopponent.fuel == 0) {
                console.log(chalk.bold.green(`congratulation ${myplayer.name} ! you won the game`));
                process.exit();
            }
        }
    }
    function increasehealth() {
        if (myplayer.fuel < 100) {
            myplayer.fuelincrease();
            console.log(chalk.bold.green(`${myplayer.name}'s fuel is increased to ${myplayer.fuel}`));
        }
        else if (myplayer.fuel == 100) {
            console.log(chalk.bold.green(`${myplayer.name}'s fuel is full`));
        }
    }
    function runForLife() {
        console.log(chalk.bold.red(`${myplayer.name} lost ! better luck next time`));
        process.exit();
    }
    let while_action = await inquirer.prompt([{
            type: "confirm",
            name: "exit",
            message: "do you want to continue",
            default: "true",
        }]);
    if (while_action.exit === false) {
        while_condiation = false;
    }
} while (while_condiation === true);
