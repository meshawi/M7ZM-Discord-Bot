
# M7ZM Discord Bot 🤖

This is a Discord bot designed to perform various tasks, including creating polls, fetching game data, and translating text between English and Arabic.

## Table of Contents 📚
- [Features ✨](#features-✨)
- [Prerequisites 📋](#prerequisites-📋)
- [Setup ⚙️](#setup-⚙️)
- [Directory Structure 🗂️](#directory-structure-🗂️)
- [Commands 💬](#commands-💬)
  - [Welcome Command 🎉](#welcome-command-🎉)
  - [Random Character Command 🎲](#random-character-command-🎲)
  - [Get Glory Command 🏆](#get-glory-command-🏆)
  - [Get Clan Command 🛡️](#get-clan-command-🛡️)
  - [Get Legend Command 🗡️](#get-legend-command-🗡️)
  - [Get Hero Command 🦸](#get-hero-command-🦸)
  - [Random Hero Command 🎰](#random-hero-command-🎰)
  - [Translate Command 🌐](#translate-command-🌐)
  - [Poll Command 🗳️](#poll-command-🗳️)
- [Deployment 🚀](#deployment-🚀)
  - [Deploy Commands 🛠️](#deploy-commands-🛠️)
- [Running the Bot 🏃](#running-the-bot-🏃)
- [Environment Variables 🌍](#environment-variables-🌍)
- [License 📜](#license-📜)

## Features ✨

- **Welcome Command**: Welcomes the user who used the command.
- **Random Character Command**: Fetches a random character from the Brawlhalla API with optional weapon filters.
- **Get Glory Command**: Retrieves glory details for a given ID (Steam or Brawlhalla).
- **Get Clan Command**: Fetches clan details for a given clan ID.
- **Get Legend Command**: Fetches legend details from the Brawlhalla API.
- **Get Hero Command**: Fetches hero details from the Overfast API.
- **Random Hero Command**: Fetches a random Overwatch hero with optional role and type filters.
- **Translate Command**: Translates text between English and Arabic.
- **Poll Command**: Creates a poll for voting with pre-stored questions.

## Prerequisites 📋

- Node.js
- npm
- A Discord bot token
- Environment variables file (`.env`)

## Setup ⚙️

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   npm install dotenv
   npm install discord.js@latest
   npm install node-fetch
   ```

3. **Create a `.env` file**

   Create a `.env` file in the root directory and add your bot token, server ID, and channel ID.

   ```env
   TOKEN=your-bot-token
   SERVER_ID=your-server-id
   CHANNEL_ID=your-channel-id
   ```

4. **Register the slash commands**

   Deploy the slash commands to your server using the `deploy-commands.js` script.

   ```bash
   node deploy-commands.js
   ```

5. **Run the Bot**

   Run the bot on the server using the `app.js` script.

   ```bash
   node app.js
   ```

## Directory Structure 🗂️

```
project-root/
│
├── commands/
│   ├── welcome.js
│   ├── randomcharacter.js
│   ├── getglory.js
│   ├── getclan.js
│   ├── getlegend.js
│   ├── gethero.js
│   ├── randomhero.js
│   ├── translate.js
│   └── poll.js
│
├── deploy-commands.js
├── app.js
├── .env
└── package.json
```

## Commands 💬

### Welcome Command 🎉

**File**: `commands/welcome.js`

**Description**: Welcomes the user who used the command.

**Usage**: `/welcome`

### Random Character Command 🎲

**File**: `commands/randomcharacter.js`

**Description**: Fetches a random character from the Brawlhalla API with optional weapon filters.

**Usage**: `/randomcharacter [weapon]`

### Get Glory Command 🏆

**File**: `commands/getglory.js`

**Description**: Retrieves the glory details for a given ID (Steam or Brawlhalla).

**Usage**: `/getglory id:<id> type:<steam|brawl>`

### Get Clan Command 🛡️

**File**: `commands/getclan.js`

**Description**: Fetches clan details for a given clan ID.

**Usage**: `/getclan clanid:<id>`

### Get Legend Command 🗡️

**File**: `commands/getlegend.js`

**Description**: Fetches legend details from the Brawlhalla API.

**Usage**: `/getlegend [legendname]`

### Get Hero Command 🦸

**File**: `commands/gethero.js`

**Description**: Fetches hero details from the Overfast API.

**Usage**: `/gethero [heroname]`

### Random Hero Command 🎰

**File**: `commands/randomhero.js`

**Description**: Fetches a random Overwatch hero with optional role and type filters.

**Usage**: `/randomhero [role] [type]`

### Translate Command 🌐

**File**: `commands/translate.js`

**Description**: Translates text between English and Arabic.

**Usage**: `/translate direction:<en-ar|ar-en> text:<text>`

### Poll Command 🗳️

**File**: `commands/poll.js`

**Description**: Creates a poll for voting with pre-stored questions.

**Usage**: `/poll participants:<names> polls:<number> [duration]`

## Deployment 🚀

### Deploy Commands 🛠️

Deploy the slash commands to the specified server.

```bash
node deploy-commands.js
```

## Running the Bot 🏃

Start the bot using the following command:

```bash
node app.js
```

## Environment Variables 🌍

Ensure your `.env` file contains the following variables:

```env
TOKEN=your-bot-token
SERVER_ID=your-server-id
CHANNEL_ID=your-channel-id
```

## License 📜

This script or bot is proprietary and confidential.

**Copyright © Mohammed Aleshawi**

All rights reserved.

No part of this script or bot may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of Mohammed Aleshawi.

For permission requests, contact Mohammed Aleshawi.
