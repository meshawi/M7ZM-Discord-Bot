module.exports = {
    name: 'getlegend',
    description: 'Gets the legend details',
    options: [
        {
            name: "legendname",
            description: "Enter the Legend name",
            type: 3, // STRING type
            required: false,
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const legendName = interaction.options.getString('legendname');
            const apiUrl = legendName 
                ? `https://brawlhalla.fly.dev/v1/legends/name?legend_name=${legendName}`
                : `https://brawlhalla.fly.dev/v1/legends/all`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.statusCode !== 200) {
                throw new Error(data.message || 'Failed to fetch data');
            }

            const legends = data.data;

            if (legendName) {
                const legend = legends;

                await interaction.editReply({
                    content: `**${legend.bio_name}**\nAka: ${legend.bio_aka}\nWeapons: ${legend.weapon_one} / ${legend.weapon_two}\nStrength: ${legend.strength}\nDexterity: ${legend.dexterity}\nDefense: ${legend.defense}\nSpeed: ${legend.speed}`,
                    files: [legend.thumbnail]
                });
            } else {
                const legendList = legends.map(legend => `**${legend.bio_name}** (${legend.weapon_one} / ${legend.weapon_two})`).join('\n');

                await interaction.editReply({
                    content: `All Legends:\n${legendList}`
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply(`Error: ${error.message}`);
        }
    }
};
