module.exports = {
    name: 'translate',
    description: 'Translates text between English and Arabic',
    options: [
        {
            name: 'direction',
            description: 'Select the translation direction',
            type: 3, // STRING type
            required: true,
            choices: [
                { name: 'English to Arabic', value: 'en-ar' },
                { name: 'Arabic to English', value: 'ar-en' }
            ]
        },
        {
            name: 'text',
            description: 'Enter the text to translate',
            type: 3, // STRING type
            required: true,
        }
    ],
    async execute(interaction) {
        const direction = interaction.options.getString('direction');
        const text = interaction.options.getString('text').toLowerCase();

        const enToArTranslationMap = {
            '2': 'ى',
            '3': 'ع',
            '4': 'ذ',
            '5': 'خ',
            '6': 'ط',
            '7': 'ح',
            '8': 'ق',
            '9': 'ص',
            'a': 'ا',
            'b': 'ب',
            'c': 'س',
            'd': 'د',
            'e': 'ي',
            'f': 'ف',
            'g': 'ق',
            'h': 'ه',
            'i': 'ي',
            'j': 'ج',
            'k': 'ك',
            'l': 'ل',
            'm': 'م',
            'n': 'ن',
            'o': 'و',
            'p': 'ب',
            'q': 'ك',
            'r': 'ر',
            's': 'س',
            't': 'ت',
            'u': 'و',
            'v': 'ڤ',
            'w': 'و',
            'x': 'اكس',
            'y': 'ي',
            'z': 'ز',
            'sh': 'ش',
            'th': 'ث',
            "3'": 'غ',
            "6'": 'ض',
            "9'": 'ظ',
        };

        const arToEnTranslationMap = {
            'ى': '2',
            'ع': '3',
            'ذ': '4',
            'خ': '5',
            'ط': '6',
            'ح': '7',
            'ق': '8',
            'ص': '9',
            'ا': 'a',
            'ب': 'b',
            'س': 'c',
            'د': 'd',
            'ي': 'e',
            'ف': 'f',
            'ق': 'g',
            'ه': 'h',
            'ي': 'i',
            'ج': 'j',
            'ك': 'k',
            'ل': 'l',
            'م': 'm',
            'ن': 'n',
            'و': 'o',
            'ر': 'r',
            'س': 's',
            'ت': 't',
            'ڤ': 'v',
            'اكس': 'x',
            'ي': 'y',
            'ز': 'z',
            'ش': 'sh',
            'ث': 'th',
            'ض': "6'",
            'ظ': "9'",
        };

        let output = '';

        if (direction === 'en-ar') {
            for (let i = 0; i < text.length; i++) {
                const translatedChar = enToArTranslationMap[text.substring(i, i + 2)];
                if (translatedChar) {
                    output += translatedChar;
                    i++; // Skip next character
                } else {
                    const char = enToArTranslationMap[text[i]];
                    output += char ? char : text[i];
                }
            }
        } else if (direction === 'ar-en') {
            for (let i = 0; i < text.length; i++) {
                const char = arToEnTranslationMap[text[i]];
                output += char ? char : text[i];
            }
        }

        await interaction.reply(`Translated text: ${output}`);
    }
};
