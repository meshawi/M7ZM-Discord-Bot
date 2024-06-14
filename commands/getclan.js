module.exports = {
    name: 'getclan',
    description: 'Gets the clan details for a given clan ID',
    options: [
        {
            name: "clanid",
            description: "Enter the Clan ID",
            type: 3, // STRING type
            required: true,
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const clanId = interaction.options.getString('clanid');
            const apiUrl = `https://brawlhalla.fly.dev/v1/utils/clan?clan_id=${clanId}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.statusCode !== 200) {
                throw new Error(data.message || 'Failed to fetch data');
            }

            const clanData = data.data;
            const clanMembers = clanData.clan.map(member => `**${member.name}** (${member.rank}) - XP: ${member.xp}`).join('\n');

            await interaction.editReply({
                content: `Clan details for **${clanData.clan_name}**:\nClan XP: ${clanData.clan_xp}\nClan Created: ${new Date(clanData.clan_create_date * 1000).toLocaleDateString()}\nMembers:\n${clanMembers}`
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply(`Error: ${error.message}`);
        }
    }
};
