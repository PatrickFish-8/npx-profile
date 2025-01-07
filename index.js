#!/usr/bin/env node
'use strict';

import chalk from 'chalk'
import boxen from 'boxen'
import clear from 'clear'
import inquirer from 'inquirer'
import Enquirer from 'enquirer'
import open from 'open'
import terminalImage from 'terminal-image';
import got from 'got';
import playSound from 'play-sound';


const mountains = await got("https://github.com/PatrickFish-8/npx-profile/blob/master/assets/mountains.jpg?raw=true").buffer();

clear();

const data = {
    name: chalk.bold.green("@pfish"),
    github: chalk.hex('#787878')("https://github.com/PatrickFish-8"),
    npx: chalk.hex('#787878')("npx pfish"),
    email: chalk.hex('#787878')("patrickfish10@icloud.com"),

    labelGitHub: chalk.hex('#9E9E9E').bold("git:"),
    labelEmail: chalk.hex('#9E9E9E').bold("eml:"),
    labelCard: chalk.hex('#9E9E9E').bold("npm:"),

}

const card = boxen(
    [
    `${data.name}`,
    ``,
    `${data.labelGitHub} ${data.github}`,
    `${data.labelCard} ${data.npx}`,
    `${data.labelEmail} ${data.email}`,
    ``,
    `${chalk("c'est la vie.")}`,
    `${chalk.italic("it's the life.")}`,
    ].join("\n"),
    {
        margin:0,
        padding: { top: 1, bottom: 1, right: 2, left: 2},
        borderStyle: "double",
        borderColor: "white"
    }
);

console.log(card);
console.log();

const options = {
    type: 'list',
    name: 'actions',
    message: 'select action', 
    choices: [
        {
            name: '| resume',
            value: async () => {
                console.log("opening resume ...")
                open("https://docs.google.com/document/d/1ww4sUPmC81j8lw_XrHVBjQQ61HpWrnSYz5TosbV7zSI/edit?tab=t.0");
            }
        },
        {
            name: '| beautiful view',
            value: async () => {
                try {
                    console.log(await terminalImage.buffer(mountains, {width: '100%'}));
                    console.log('Isn\'t that a nice view?')
                } catch (err) {
                    console.log(err);
                }
            }
        },
        {
            name: '| cat',
            value: async () => {
                try {
                    open("https://www.youtube.com/watch?v=5nxY9rMaE50&ab_channel=Bara");
                    console.log("what the hell is wrong with this cat??");
                } catch (err) {
                    console.log(err);
                }
            }
        },
        {
            name: '| song',
            value: async () => {
                try {

                } catch (err) {
                    console.log(err);
                }
            }
        },
        '- exit'
    ]
}

function main() {
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == "- exit") {
            return;
        } 
        else {
            console.log('-'.repeat(40))
            await answer.actions();
            console.log('-'.repeat(40))

            Enquirer.prompt({
                type: "toggle",
                name: "again",
                message: "exit?",
                default: false
            }).then(answer => {
                if (answer.again == false) {
                    main();
                }
            });
        }
    });
}


main();
