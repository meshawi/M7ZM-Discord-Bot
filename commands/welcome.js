module.exports = {
    name: 'welcome',
    description: 'Welcomes the user who used the command',
    async execute(interaction) {
        await interaction.reply(`Welcome, ${interaction.user.username}!`);
    }
};
