module.exports = {
    name: 'gethero',
    description: 'Gets the hero details',
    options: [
        {
            name: "heroname",
            description: "Enter the Hero name",
            type: 3, // STRING type
            required: false,
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const heroName = interaction.options.getString('heroname');
            const apiUrl = heroName 
                ? `https://overfast-api.tekrop.fr/heroes/${heroName}`
                : `https://overfast-api.tekrop.fr/heroes`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (heroName) {
                const hero = data;

                await interaction.editReply({
                    content: `**${hero.name}**\nRole: ${hero.role}\nDescription: ${hero.description}\nLocation: ${hero.location}\nBirthday: ${hero.birthday}\nAge: ${hero.age}\nHitpoints: ${hero.hitpoints.total}\nAbilities:\n${hero.abilities.map(a => `- **${a.name}**: ${a.description}`).join('\n')}\nStory: ${hero.story.summary}`,
                    files: [hero.portrait]
                });
            } else {
                const heroList = data.map(hero => `**${hero.name}** (${hero.role})`).join('\n');

                await interaction.editReply({
                    content: `All Heroes:\n${heroList}`
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply(`Error: ${error.message}`);
        }
    }
};
