module.exports = {
    name: 'getglory',
    description: 'Gets the glory details for a given ID',
    options: [
        {
            name: "id",
            description: "Enter the Steam or Brawlhalla ID",
            type: 3, // STRING type
            required: true,
        },
        {
            name: "type",
            description: "Select the type of ID",
            type: 3, // STRING type
            required: true,
            choices: [
                { name: "Steam", value: "steam" },
                { name: "Brawlhalla", value: "brawl" }
            ]
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const id = interaction.options.getString('id');
            const type = interaction.options.getString('type');
            const apiUrl = type === 'steam' 
                ? `https://brawlhalla.fly.dev/v1/glory/steamid?steam_id=${id}` 
                : `https://brawlhalla.fly.dev/v1/glory/id?brawlhalla_id=${id}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.statusCode !== 200) {
                throw new Error(data.message || 'Failed to fetch data');
            }

            const gloryData = data.data;

            await interaction.editReply({
                content: `Glory details for **${gloryData.name}**:\nBest Elo: ${gloryData.bestElo}\nElo Reset: ${gloryData.eloReset}\nWins: ${gloryData.glory.wins}\nRating: ${gloryData.glory.rating}\nLast Synced: ${new Date(gloryData.lastSynced).toLocaleString()}`
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply(`Error: ${error.message}`);
        }
    }
};
