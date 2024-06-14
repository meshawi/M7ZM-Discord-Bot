const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const questions = [
   "من لديه أفضل مهارات الطبخ؟",
    "من هو الأكثر مغامرة؟",
    "من هو أكبر دودة لقافة؟",
    "من هو الأكثر احتمالا لبدء عمل تجاري؟",
    "من يستطيع التحدث بمعظم اللغات؟",
    "من هو أفضل رقاص؟",
    "من لديه هواية فريدة من نوعها؟",
    "من يملك أفضل حس للدعابة؟",
    "من هو الأكثر رياضية؟",
    "من هو الأكثر أناقة؟",
    "من هو الأكثر ذكاءً في التكنولوجيا؟",
    "من لديه الوظيفة الأكثر إثارة للاهتمام؟",
    "من هو الأفضل في حل الألغاز؟",
    "من هو الأكثر فنية؟",
    "من هو أفضل راوي؟",
    "من هو الأفضل في حفظ الأسرار؟",
    "من هو الأكثر احتمالا للبقاء هادئا في الأزمات؟",
    "من هو الأفضل في التخطيط للمناسبات أو الرحلات؟",
    "من هو الأكثر احتمالا لمساعدة صديق في حاجة؟",
    "من هو الأكثر احتمالا أن يصبح مشهورا؟",
    "من هو الأكثر سخاء؟",
    "من هو الأكثر احتمالا أن يكون في الوقت المحدد؟",
    "من هو الأكثر احتمالا لمعرفة الحقائق العشوائية؟",
    "من لديه الحيوان الأليف الأكثر غرابة؟",
    "من هو الأفضل في ألعاب الفيديو؟",
    "من هو الأكثر احتمالا للذهاب للقفز بالمظلات؟",
    "من هو الأكثر احتمالا لتأليف كتاب؟",
    "من لديه أفضل ذاكرة؟",
    "من هو الأكثر تنافسية؟",
    "من هو الأكثر احتمالا أن يضحك الجميع؟",
    "من هو الأفضل في النقاش؟",
    "من هو الأكثر احتمالا لتجربة شيء جديد؟",
    "من هو الأكثر عرضة للتعثر على قدميه؟",
    "من هو ملك الدراما الأكبر؟",
    "من هو الأكثر عرضة للضياع في حيهم؟",
    "من يروي أسوأ النكات؟",
    "من هو الأكثر عرضة للنسيان؟",
    "من هو الأكثر خرقاء؟",
    "من لديه أسوأ شعور بالاتجاه؟",
    "من هو الأكثر احتمالا أن يدخل إلى الباب الزجاجي؟",
    "من هو الأكثر احتمالا لإرسال رسالة نصية إلى الشخص الخطأ؟",
    "من هو الأكثر احتمالاً أن يحبس نفسه خارج المنزل؟",
    "من هو الأكثر وقت في الحمام؟",
    "من لديه الضحكة الأكثر مرحاً؟",
    "من هو الأكثر عرضة للوقوع في مقلب؟",
    "من هو الأكثر عرضة للتحدث مع نفسه؟",
    "من هو الأسوأ في الحفاظ على الوجه المستقيم؟",
    "من هو الأكثر عرضة للضحك في اللحظة الخطأ؟",
    "من هو الأكثر احتمالا للرقص وكأن لا أحد يشاهد؟",
    "من هو الأسوأ في إفشاء الأسرار؟",
    "من هو الأكثر عرضة لنسيان موعد مهم؟",
    "من هو الأكثر عرضة لإسقاط هاتفه في المرحاض؟",
    "من هو الأكثر عرضة لنسيان ما كانوا يقولونه في منتصف الجملة؟",
    "من هو الأكثر احتمالا لخلط كلماته؟",
    "من هو الأكثر احتمالا لسكب شيء على نفسه؟",
    "من هو الأكثر احتمالا أن يروي قصة تحتوي على الكثير من التفاصيل؟",
    "من هم الأكثر عرضة لفقدان مفاتيحهم؟"
];

module.exports = {
    name: 'poll',
    description: 'Creates a poll for voting',
    options: [
        {
            name: 'participants',
            description: 'Enter the names of participants separated by commas',
            type: 3, // STRING type
            required: true,
        },
        {
            name: 'polls',
            description: 'Enter the number of polls (questions)',
            type: 4, // INTEGER type
            required: true,
        },
        {
            name: 'duration',
            description: 'Enter the duration for each poll in seconds (default is 30 seconds)',
            type: 4, // INTEGER type
            required: false,
        }
    ],
    async execute(interaction) {
        const participants = interaction.options.getString('participants').split(',').map(name => name.trim());
        const numberOfPolls = interaction.options.getInteger('polls');
        const pollDuration = (interaction.options.getInteger('duration') || 30) * 1000; // Default to 30 seconds

        const selectedQuestions = [];
        while (selectedQuestions.length < numberOfPolls && selectedQuestions.length < questions.length) {
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            if (!selectedQuestions.includes(randomQuestion)) {
                selectedQuestions.push(randomQuestion);
            }
        }

        await interaction.deferReply(); // Defer the reply to allow time for polls

        for (const question of selectedQuestions) {
            const embed = new EmbedBuilder()
                .setTitle('Poll Time!')
                .setDescription(`${question}\n\n${participants.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nPoll duration: ${pollDuration / 1000} seconds`)
                .setColor('#00FF00');

            const buttons = participants.map((p, i) => new ButtonBuilder()
                .setCustomId(`vote_${i + 1}`)
                .setLabel(`${i + 1}`)
                .setStyle(ButtonStyle.Primary));

            const row = new ActionRowBuilder().addComponents(buttons);

            await interaction.editReply({ embeds: [embed], components: [row] });

            const filter = i => i.customId.startsWith('vote_');
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: pollDuration });

            const votes = {};

            collector.on('collect', async i => {
                const participantIndex = parseInt(i.customId.split('_')[1]) - 1;
                const participantName = participants[participantIndex];
                votes[participantName] = (votes[participantName] || 0) + 1;
                await i.reply({ content: `You voted for ${participantName}`, ephemeral: true });
            });

            await new Promise(resolve => {
                collector.on('end', async () => {
                    let result = 'Poll results:\n';
                    for (const [name, count] of Object.entries(votes)) {
                        result += `${name}: ${count} votes\n`;
                    }

                    await interaction.followUp(result || 'No votes were cast.');
                    resolve();
                });
            });

            // Wait a bit before starting the next poll to give users time to see the results
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};
