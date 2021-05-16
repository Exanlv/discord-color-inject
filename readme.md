# Discord Color Changer
Change the accent color of discord, without modifying the client

Thanks to https://medium.com/@dany74q/injecting-js-into-electron-apps-and-adding-rtl-support-for-microsoft-teams-d315dfb212a6 for pointing me in the right direction

## TOS warning
Discord TOS states you cannot modify the client, as this does not modify any of the discord client files but rather injects code after launch, it should(?) be compliant (depending on how you interpret "modify"). Use at your own risk.


### All systems
1. Clone this repository
2. `npm install`


### Linux
This'll show you how to modify your .desktop file for discord to make the inject launch alongside discord and open up the remote debugging port for chromium

Note: If your desktop environment does not make use of .desktop files, the install process will be different

1. Locate the .desktop file for discord

ex: 
```
$ locate *.desktop | grep discord
> /usr/share/applications/discord.desktop
```

Copy the `Exec` value, in my case `/usr/share/discord/Discord`

2. Create a new file (ex `/usr/bin/launch_discord`), use the path you found in step 1 in place of `/usr/share/discord/Discord`.
```
#!/bin/bash

nohup /usr/bin/node /home/exan/DiscordColor/src/index.js > /dev/null &
/usr/share/discord/Discord --remote-debugging-port=31337
```
Note: your node path may be different than this, verify by running `which node`.

3. Edit the .desktop file found in step 1, point `Exec` to the shell script you just created
```
Exec=/usr/bin/launch_discord
```

4. Close discord entirely and restart.

### Windows
Inc..

### MacOS
While I dont know how to install this in MacOS, it is still supported. If you are able to create install instructions for MacOS, a PR with these would be appreciated

### Custom Color
Optionally, create a custom color scheme with `node src/color.js "#FF0000" > src/inject/css.css` (replace FF0000 with your prefered color, leave the quotes)

After generating the css, either restart the client or run `node src/index.js`

If youre using a custom color, be careful with screenshots including these colors. Discord might ban you for it thinking its an alternative client. To quickly go back to vanilla styling, press `CTRL + R`. This will remove the custom CSS until restarted.

# Todo
- Optimize color generation