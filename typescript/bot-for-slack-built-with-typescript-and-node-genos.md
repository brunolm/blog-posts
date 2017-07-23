---
title: "Bot for Slack built with TypeScript and node - @genos"
tags: [genos, slack, typescript]
---

You can find the bot project on [my Github - slack-genos](https://github.com/brunolm/slack-genos).

<a href="https://github.com/brunolm/slack-genos" target="_blank"><img src="https://brunolm.files.wordpress.com/2017/01/genos-bot-slack.jpg" alt="genos-bot-slack" width="200" height="200" class="alignnone size-full wp-image-623" /></a>

There is a node package called <a href="https://www.npmjs.com/package/slack" target="_blank">slack</a> that extracts all the Slack API and create functions for each.

```bash
npm i -S slack
```

They don't provide TypeScript definition files, but we can create on own file under [`/typings` folder](https://github.com/brunolm/slack-genos/blob/master/typings/slack.d.ts).

With that I created a structure to run the bot.
<!--more-->

To run the bot you need to define two environment variables:

```bash
BOT_NAME
BOT_TOKEN
```

You can create a bot for your team at [my.slack.com/services/new/bot](https://my.slack.com/services/new/bot).

After installing all the dependencies (`npm i`) you can run the bot with

```bash
npm start
```

Which is going to execute `ts-node src/index.ts`.

The bot will start and load all files under `src/commands` and subfolders. All files there must follow a convention: the file should be a `.ts` and it should have a `.md` with the same name. The `.ts` file will be used to execute the command and the `.md` file will be used to provide help for that command.

If you have a `hello.ts` file then you need a `hello.md` file. The command will then be `hello`.

The bot monitor messages in all channels where it belongs and then if the message starts with `.` it will see if it has any commands with that name loaded. So if you have the `hello` command and someone types `.hello` it will run the command.

If someone types `.hello -h` or `.hello --help` it will then output the contents of `hello.md` file in the chat the command was received.

There are some sample commands:

- help: `.help` or `.help subfolder` will list all command in the folder
- msg: `.msg @user msg` or `.msg #channel msg` will send a message from the bot to the target
- random-member: `.random-member` will pick a random member from the channel and send a message saying they've been chosen
- cats: `.cats` sends a random cat image

You can create more folders and files to extend the bot.

- `.roll 2d10+4`: you can create commands to play RPG, for example something to parse dice rolling
- `.appear`: you can create random appear-in rooms without having to occupy a slot integration

Some examples of commands that people use quite often (these are not public commands... yet?):

- `.c`: integrates with an API that provides information when people have to clock-in/out and reminds a couple minutes before
- `.wifi`: display all networks and passwords

I'm thinking in a way to allow the bot to catch all messages, not just commands, so things like logs will be possible (save over 10k messages in a custom database). I'm also thinking in making a thread that runs every X time to run reminders and other operations that can be run in intervals of time.

If you have ideas and want to share you can post on [slack-genos/issues](https://github.com/brunolm/slack-genos/issues).

Have fun!
