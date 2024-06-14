const HERO_TYPES = {
    hitscan: [
        "Ashe",
        "Bastion",
        "Cassidy",
        "Reaper",
        "Soldier: 76",
        "Sombra",
        "Tracer",
        "Widowmaker",
    ],
    projectile: [
        "Ana",
        "Baptiste",
        "Doomfist",
        "Echo",
        "Genji",
        "Hanzo",
        "Junkrat",
        "Lucio",
        "Mei",
        "Orisa",
        "Pharah",
        "Roadhog",
        "Sigma",
        "Symmetra",
        "Torbjörn",
        "Zenyatta",
        "Zarya",
        "Venture"
    ],
    beam: ["Moira", "Symmetra", "Zarya", "Winston"],
    melee: ["Brigitte", "Reinhardt"],
};

module.exports = {
    name: 'randomhero',
    description: 'Gets a random Overwatch hero',
    options: [
        {
            name: "role",
            description: "Select a role to filter heroes",
            type: 3, // STRING type
            required: false,
            choices: [
                { name: "Tank", value: "tank" },
                { name: "Damage", value: "damage" },
                { name: "Support", value: "support" }
            ]
        },
        {
            name: "type",
            description: "Select a type to filter heroes",
            type: 3, // STRING type,
            required: false,
            choices: [
                { name: "Hitscan", value: "hitscan" },
                { name: "Projectile", value: "projectile" },
                { name: "Beam", value: "beam" },
                { name: "Melee", value: "melee" }
            ]
        }
    ],
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const fetch = (await import('node-fetch')).default; // Dynamic import

            const role = interaction.options.getString('role');
            const type = interaction.options.getString('type');
            const apiUrl = `https://overfast-api.tekrop.fr/heroes`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            let heroes = data;

            if (role) {
                heroes = heroes.filter(hero => hero.role.toLowerCase() === role.toLowerCase());
            }

            if (type) {
                const heroNames = HERO_TYPES[type.toLowerCase()] || [];
                heroes = heroes.filter(hero => heroNames.includes(hero.name));
            }

            const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

            await interaction.editReply({
                content: `Here is a random hero for you:\n**${randomHero.name}**\nRole: ${randomHero.role}`,
                files: [randomHero.portrait]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply(`Error: ${error.message}`);
        }
    }
};
