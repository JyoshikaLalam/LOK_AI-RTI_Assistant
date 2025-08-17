export class MisuseDetector {
  private misusePatterns = {
    en: [
      /\b(complaint|complain|grievance|problem|issue|help me|solve|fix)\b/i,
      /\b(personal|private|individual|my case|my problem)\b/i,
      /\b(why|when will|how long|give me|provide me|do this|arrange)\b/i,
      /\b(action|decision|order|direct|instruct|ensure)\b/i,
      /\b(salary|promotion|transfer|punishment|disciplinary)\b/i
    ],
    hi: [
      /\b(शिकायत|समस्या|परेशानी|मदद|हल|ठीक)\b/i,
      /\b(व्यक्तिगत|निजी|मेरा|मेरी)\b/i,
      /\b(क्यों|कब|कितना|दो|करो|व्यवस्था)\b/i,
      /\b(कार्रवाई|निर्णय|आदेश|निर्देश)\b/i,
      /\b(वेतन|पदोन्नति|स्थानांतरण)\b/i
    ],
    te: [
      /\b(ఫిర్యాదు|సమస్య|ఇబ్బంది|సహాయం|పరిష్కారం)\b/i,
      /\b(వ్యక్తిగత|నా|నాకు)\b/i,
      /\b(ఎందుకు|ఎప్పుడు|ఎంత|ఇవ్వండి|చేయండి)\b/i,
      /\b(చర్య|నిర్ణయం|ఆర్డర్|ఆదేశం)\b/i,
      /\b(జీతం|పదోన్నతి|బదిలీ)\b/i
    ]
  };

  private validRTIPatterns = {
    en: [
      /\b(information|details|records|documents|status|copy|list)\b/i,
      /\b(budget|allocation|expenditure|tender|contract|scheme)\b/i,
      /\b(application status|file|reference|proceedings)\b/i,
      /\b(policy|guidelines|criteria|procedure|process)\b/i
    ],
    hi: [
      /\b(जानकारी|विवरण|रिकॉर्ड|दस्तावेज|स्थिति|प्रति|सूची)\b/i,
      /\b(बजट|आवंटन|व्यय|टेंडर|अनुबंध|योजना)\b/i,
      /\b(आवेदन की स्थिति|फाइल|संदर्भ|कार्यवाही)\b/i,
      /\b(नीति|दिशानिर्देश|मानदंड|प्रक्रिया)\b/i
    ],
    te: [
      /\b(సమాచారం|వివరాలు|రికార్డులు|పత్రాలు|స్థితి|కాపీ|జాబితా)\b/i,
      /\b(బడ్జెట్|కేటాయింపు|వ్యయం|టెండర్|ఒప్పందం|పథకం)\b/i,
      /\b(దరఖాస్తు స్థితి|ఫైలు|సూచన|కార్యకలాపాలు)\b/i,
      /\b(విధానం|మార్గదర్శకాలు|ప్రమాణాలు|ప్రక్రియ)\b/i
    ]
  };

  async detectMisuse(query: string, language: string = 'en'): Promise<boolean> {
    const lang = language as keyof typeof this.misusePatterns;
    const misusePatterns = this.misusePatterns[lang] || this.misusePatterns.en;
    const validPatterns = this.validRTIPatterns[lang] || this.validRTIPatterns.en;

    // Check for misuse patterns
    const hasMisusePatterns = misusePatterns.some(pattern => pattern.test(query));
    
    // Check for valid RTI patterns
    const hasValidPatterns = validPatterns.some(pattern => pattern.test(query));

    // If has misuse patterns and no valid patterns, it's likely misuse
    if (hasMisusePatterns && !hasValidPatterns) {
      return true;
    }

    // Additional checks for very short or vague queries
    if (query.trim().length < 20) {
      return true;
    }

    // Check for personal pronouns without information-seeking context
    const personalPronouns = /\b(my|mine|me|i|myself)\b/gi;
    const informationWords = /\b(information|status|details|copy|list|records)\b/gi;
    
    const personalCount = (query.match(personalPronouns) || []).length;
    const infoCount = (query.match(informationWords) || []).length;
    
    if (personalCount > 2 && infoCount === 0) {
      return true;
    }

    return false;
  }

  getSuggestions(language: string = 'en'): string[] {
    const suggestions = {
      en: [
        'Ask for specific information or documents',
        'Use phrases like "Please provide information about..."',
        'Request status of specific applications with reference numbers',
        'Ask for copies of relevant documents or records',
        'Inquire about government policies, schemes, or procedures'
      ],
      hi: [
        'विशिष्ट जानकारी या दस्तावेजों के लिए पूछें',
        '"कृपया ... के बारे में जानकारी प्रदान करें" जैसे वाक्य का उपयोग करें',
        'संदर्भ संख्या के साथ विशिष्ट आवेदनों की स्थिति के लिए पूछें',
        'संबंधित दस्तावेजों या रिकॉर्ड की प्रतियों के लिए अनुरोध करें',
        'सरकारी नीतियों, योजनाओं या प्रक्रियाओं के बारे में पूछताछ करें'
      ],
      te: [
        'నిర్దిష్ట సమాచారం లేదా పత్రాల కోసం అడగండి',
        '"దయచేసి ... గురించి సమాచారం అందించండి" వంటి వాక్యాలను ఉపయోగించండి',
        'రిఫరెన్స్ నంబర్‌లతో నిర్దిష్ట దరఖాస్తుల స్థితి కోసం అడగండి',
        'సంబంధిత పత్రాలు లేదా రికార్డుల కాపీల కోసం అభ్యర్థించండి',
        'ప్రభుత్వ విధానాలు, పథకాలు లేదా ప్రక్రియల గురించి విచారించండి'
      ]
    };

    return suggestions[language as keyof typeof suggestions] || suggestions.en;
  }
}
