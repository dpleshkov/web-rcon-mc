# web-rcon-mc

Simple Node.js web frontend for RCON connections to a specified Minecraft server.

### Installation

Clone the repo and `cd` into it:
```bash
git clone https://github.com/dpleshkov/web-rcon-mc
cd web-rcon-mc
```
Install dependencies:
```bash
npm install
```
Create a `.env` file with the following fields:
```text
PORT=3742  # the port you want the webserver to listen on
RCON_HOST=your.minecraft.server.ip
RCON_PORT=25575  # RCON port
RCON_PASSWORD=rconpasswordtoyourminecraftserver
```

### Usage

Run `npm start` and open the page in your browser. 
You will be prompted to enter the RCON password. 

![](https://cdn.discordapp.com/attachments/512757801680896011/851625288864890961/unknown.png)

After which it will save the password locally to your browser, so you don't have to enter it
again. If you wish to change or reset the stored password, simply type `/password`.

![](https://cdn.discordapp.com/attachments/512757801680896011/851625622597795880/unknown.png)

After that, simply typing a Minecraft server command into the bottom box will
remotely execute it on the server and print out the result.

![](https://cdn.discordapp.com/attachments/512757801680896011/851625872078274571/unknown.png)

