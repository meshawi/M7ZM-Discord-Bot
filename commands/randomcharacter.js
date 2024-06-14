module.exports = {
    name: 'randomcharacter',
    description: 'Gets a random character from the Brawlhalla API',
    options: [
        {
            name: "weapon",
            description: "Select a weapon to filter characters",
            type: 3, // STRING type
            required: false,
            choices: [
                { name: "Hammer", value: "Hammer" },
                { name: "Sword", value: "Sword" },
                { name: "Pistol", value: "Pistol" },
                { name: "RocketLance", value: "RocketLance" },
                { name: "Spear", value: "Spear" },
                { name: "Katar", value: "Katar" },
                { name: "Bow", value: "Bow" },
                { name: "Axe", value: "Axe" },
                { name: "Orb", value: "Orb" },
                { name: "Boots", value: "Boots" },
                { name: "Cannon", value: "Cannon" },
                { name: "Fists", value: "Fists" },
                { name: "Scythe", value: "Scythe" }
            ]
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const response = await fetch("https://brawlhalla.fly.dev/v1/legends/all");
            const data = await response.json();

            if (data.statusCode !== 200) {
                throw new Error('Failed to fetch data');
            }

            let legends = data.data;
            const selectedWeapon = interaction.options.getString('weapon');

            if (selectedWeapon) {
                legends = legends.filter(
                    legend => legend.weapon_one === selectedWeapon || legend.weapon_two === selectedWeapon
                );
            }

            const randomLegend = legends[Math.floor(Math.random() * legends.length)];

            await interaction.editReply({
                content: `Here is a random character for you:\n**${randomLegend.bio_name}**\nStrength: ${randomLegend.strength}\nDexterity: ${randomLegend.dexterity}\nDefense: ${randomLegend.defense}\nSpeed: ${randomLegend.speed}\nWeapons: ${randomLegend.weapon_one} / ${randomLegend.weapon_two}`,
                files: [randomLegend.thumbnail]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error fetching a random character.');
        }
    }
};
