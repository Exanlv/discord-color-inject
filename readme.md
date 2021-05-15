# Discord Color Changer
Change the accent color of discord, without modifying the client

Thanks to https://medium.com/@dany74q/injecting-js-into-electron-apps-and-adding-rtl-support-for-microsoft-teams-d315dfb212a6 for pointing me in the right direction

# Installing

1. Clone this repository
2. `npm install`

Optionally, create a custom color scheme with `node src/color.js "#FF0000" > src/inject/css.css` (replace FF0000 with your prefered color, leave the quotes)

3. Make sure discord is running on debugging port 31337 (more details in # Debugging Port)
4. When discord is finished loading, run `node src/index.js`

# Debugging Port

For this to function, you need to launch Discord with a debugging port.

## Linux

Locate the .desktop file for discord

ex: 
```
$ locate *.desktop | grep discord
> /usr/share/applications/discord.desktop
```

Edit this file, add `--remote-debugging-port=31337` to the `Exec` line
```
Exec=/usr/share/discord/Discord --remote-debugging-port=31337
```

## Windows
Theres a screenshot in the article which might help, other than that -> ??

## Mac OS
??

# Todo
- Make it so you dont have to run the script manually after each restart
- Find out whether this is against TOS and add a warning if it is
- Optimize color generation