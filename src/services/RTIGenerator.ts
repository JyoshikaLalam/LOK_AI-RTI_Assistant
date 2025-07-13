interface RTIResult {
  content: string;
  department: string;
  subject: string;
}

export class RTIGenerator {
  private departmentKeywords = {
    'Revenue': ['land', 'property', 'revenue', 'mutation', 'survey', 'registration'],
    'Health': ['health', 'hospital', 'medical', 'doctor', 'medicine', 'ayushman', 'healthcare'],
    'Education': ['school', 'education', 'teacher', 'student', 'scholarship', 'exam', 'university'],
    'PWD': ['road', 'construction', 'building', 'infrastructure', 'contractor', 'tender'],
    'Police': ['police', 'fir', 'crime', 'security', 'verification', 'case'],
    'Municipal': ['water', 'drainage', 'garbage', 'municipal', 'corporation', 'civic', 'tax']
  };

  private templates = {
    basic: `To,
The Public Information Officer,
[DEPARTMENT]

Subject: Request for Information under Right to Information Act, 2005

Sir/Madam,

Under Section 6(1) of the Right to Information Act, 2005, I hereby request the following information:

[QUERY_CONTENT]

I am also requesting the following details:
1. [SPECIFIC_REQUEST_1]
2. [SPECIFIC_REQUEST_2]
3. Name and designation of the officer responsible for the above information
4. Contact details of the concerned officer

I am enclosing the application fee of Rs. 10/- as required under the RTI Act.

If the information requested falls under another department, kindly transfer this application to the concerned department under Section 6(3) of the RTI Act and inform me of the same.

Please provide the information within the prescribed time limit of 30 days.

Thanking you,

Yours faithfully,
[APPLICANT_NAME]
Date: [DATE]`,

    status: `To,
The Public Information Officer,
[DEPARTMENT]

Subject: Status inquiry for [APPLICATION_TYPE] application under RTI Act 2005

Sir/Madam,

Under Section 6(1) of the Right to Information Act, 2005, I request information regarding my [APPLICATION_TYPE] application:

Application Details:
- Application/Reference Number: [REF_NUMBER]
- Date of Submission: [SUBMISSION_DATE]
- Office/Department: [OFFICE_NAME]

I request the following information:
1. Current status of the above application
2. Reason for delay (if any)
3. Expected timeline for completion
4. Name and contact details of the officer handling this application
5. Any additional documents required from my side
6. Copy of the complete file noting/proceedings related to my application

[ADDITIONAL_REQUESTS]

Please provide this information within 30 days as per RTI Act provisions.

Thanking you,

Yours faithfully,
[APPLICANT_NAME]
Date: [DATE]`
  };

  async generateRTI(userQuery: string, language: string = 'en'): Promise<RTIResult> {
    // Simulate AI processing with a realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Detect department
    const department = this.detectDepartment(userQuery);
    
    // Determine query type
    const queryType = this.detectQueryType(userQuery);
    
    // Generate appropriate RTI content
    const content = this.generateContent(userQuery, department, queryType);
    
    return {
      content,
      department,
      subject: this.generateSubject(userQuery, queryType)
    };
  }

  private detectDepartment(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    for (const [dept, keywords] of Object.entries(this.departmentKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return this.getDepartmentFullName(dept);
      }
    }
    
    return 'General Administration Department';
  }

  private getDepartmentFullName(shortName: string): string {
    const departmentNames = {
      'Revenue': 'Revenue Department',
      'Health': 'Department of Health & Family Welfare',
      'Education': 'Department of Education',
      'PWD': 'Public Works Department',
      'Police': 'Police Department',
      'Municipal': 'Municipal Corporation'
    };
    
    return departmentNames[shortName as keyof typeof departmentNames] || 'General Administration Department';
  }

  private detectQueryType(query: string): 'status' | 'basic' {
    const statusKeywords = ['status', 'application', 'submitted', 'pending', 'delay', 'processing'];
    const lowerQuery = query.toLowerCase();
    
    return statusKeywords.some(keyword => lowerQuery.includes(keyword)) ? 'status' : 'basic';
  }

  private generateContent(query: string, department: string, type: 'status' | 'basic'): string {
    const template = this.templates[type];
    const today = new Date().toLocaleDateString('en-IN');
    
    if (type === 'status') {
      return template
        .replace('[DEPARTMENT]', department)
        .replace(/\[APPLICATION_TYPE\]/g, this.extractApplicationType(query))
        .replace('[REF_NUMBER]', '[Please insert your reference number]')
        .replace('[SUBMISSION_DATE]', '[Please insert submission date]')
        .replace('[OFFICE_NAME]', department)
        .replace('[ADDITIONAL_REQUESTS]', this.generateAdditionalRequests(query))
        .replace('[APPLICANT_NAME]', '[Your Name]')
        .replace('[DATE]', today);
    } else {
      return template
        .replace('[DEPARTMENT]', department)
        .replace('[QUERY_CONTENT]', this.formatQueryContent(query))
        .replace('[SPECIFIC_REQUEST_1]', this.generateSpecificRequest(query, 1))
        .replace('[SPECIFIC_REQUEST_2]', this.generateSpecificRequest(query, 2))
        .replace('[APPLICANT_NAME]', '[Your Name]')
        .replace('[DATE]', today);
    }
  }

  private extractApplicationType(query: string): string {
    const applicationTypes = [
      'ration card', 'driving license', 'passport', 'adhaar card', 'voter id',
      'caste certificate', 'income certificate', 'domicile certificate',
      'birth certificate', 'death certificate', 'ayushman bharat'
    ];
    
    const lowerQuery = query.toLowerCase();
    const foundType = applicationTypes.find(type => lowerQuery.includes(type));
    
    return foundType || '[Application Type]';
  }

  private formatQueryContent(query: string): string {
    // Clean and format the user query for RTI
    let formatted = query.trim();
    
    // Remove first person references and make it formal
    formatted = formatted.replace(/\bmy\b/gi, 'the');
    formatted = formatted.replace(/\bi\b/gi, 'the applicant');
    formatted = formatted.replace(/\bme\b/gi, 'the applicant');
    
    // Ensure it starts with a capital letter
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Add proper ending if not present
    if (!formatted.endsWith('.') && !formatted.endsWith('?')) {
      formatted += '.';
    }
    
    return formatted;
  }

  private generateSpecificRequest(query: string, requestNumber: number): string {
    const commonRequests = [
      'Detailed breakdown of the information with supporting documents',
      'Timeline for any pending actions related to this matter',
      'Copies of all relevant files, records, and correspondence',
      'Details of any fees or charges applicable',
      'Information about the decision-making process followed',
      'Contact details of officers responsible for this matter'
    ];
    
    return commonRequests[requestNumber - 1] || `Additional information related to: ${query.substring(0, 50)}...`;
  }

  private generateAdditionalRequests(query: string): string {
    return `7. Any correspondence or communication related to my application
8. Details of any verification process conducted
9. List of documents currently on file for my application
10. Information about any fees paid and receipts issued`;
  }

  private generateSubject(query: string, type: 'status' | 'basic'): string {
    if (type === 'status') {
      const appType = this.extractApplicationType(query);
      return `Status inquiry for ${appType} application under RTI Act 2005`;
    } else {
      const topic = query.substring(0, 50).trim();
      return `Request for Information regarding ${topic}${topic.length > 50 ? '...' : ''} under RTI Act 2005`;
    }
  }
}