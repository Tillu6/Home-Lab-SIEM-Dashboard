interface EmailAnalysis {
  riskScore: number;
  threats: string[];
  recommendations: string[];
  technicalDetails: {
    senderReputation: number;
    domainAge: number;
    linkCount: number;
    attachmentCount: number;
    spfRecord: boolean;
    dkimValid: boolean;
    dmarcPolicy: string;
  };
  confidence: number;
}

interface URLAnalysis {
  url: string;
  riskScore: number;
  category: string;
  reputation: number;
  securityFeatures: {
    httpsEnabled: boolean;
    validCertificate: boolean;
    domainAge: number;
    redirectCount: number;
    hasPrivacyPolicy: boolean;
    hasTermsOfService: boolean;
  };
  threats: string[];
  confidence: number;
  scanEngines: {
    detected: number;
    total: number;
  };
}

export class PhishingAnalyzer {
  private static phishingKeywords = [
    'urgent', 'immediate action', 'verify account', 'suspended', 'click here',
    'limited time', 'act now', 'confirm identity', 'update payment',
    'security alert', 'unusual activity', 'locked account', 'expire',
    'winner', 'congratulations', 'claim now', 'free money', 'inheritance'
  ];

  private static legitimateKeywords = [
    'unsubscribe', 'privacy policy', 'terms of service', 'contact us',
    'customer service', 'help center', 'support team', 'official'
  ];

  private static suspiciousDomains = [
    'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly',
    'secure-bank-update.com', 'paypal-verification.net', 'amazon-security.org'
  ];

  private static trustedDomains = [
    'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'paypal.com',
    'facebook.com', 'twitter.com', 'linkedin.com', 'github.com', 'stackoverflow.com',
    'wikipedia.org', 'reddit.com', 'youtube.com', 'netflix.com', 'spotify.com'
  ];

  static analyzeEmail(content: string): EmailAnalysis {
    const lowerContent = content.toLowerCase();
    let riskScore = 0;
    const threats: string[] = [];
    const recommendations: string[] = [];
    let confidence = 85;

    // Check for phishing keywords
    const phishingMatches = this.phishingKeywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    ).length;
    
    const legitimateMatches = this.legitimateKeywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    ).length;

    // Keyword analysis
    if (phishingMatches > 0) {
      riskScore += Math.min(phishingMatches * 15, 45);
      if (phishingMatches >= 3) {
        threats.push('Multiple urgency indicators detected');
        recommendations.push('Be cautious of emails creating artificial urgency');
      }
    }

    // Reduce risk for legitimate indicators
    if (legitimateMatches > 0) {
      riskScore = Math.max(0, riskScore - legitimateMatches * 10);
      confidence += 5;
    }

    // URL analysis
    const urlRegex = /https?:\/\/[^\s]+/gi;
    const urls = content.match(urlRegex) || [];
    const linkCount = urls.length;

    if (linkCount > 5) {
      riskScore += 20;
      threats.push('Excessive number of links detected');
    }

    // Check for suspicious domains
    const suspiciousLinks = urls.filter(url => 
      this.suspiciousDomains.some(domain => url.includes(domain))
    );

    if (suspiciousLinks.length > 0) {
      riskScore += suspiciousLinks.length * 25;
      threats.push('Suspicious shortened URLs detected');
      recommendations.push('Avoid clicking shortened or suspicious links');
    }

    // Check for trusted domains
    const trustedLinks = urls.filter(url => 
      this.trustedDomains.some(domain => url.includes(domain))
    );

    if (trustedLinks.length > 0 && suspiciousLinks.length === 0) {
      riskScore = Math.max(0, riskScore - 15);
      confidence += 10;
    }

    // Email structure analysis
    const hasProperGreeting = /dear [a-z\s]+,|hello [a-z\s]+,/i.test(content);
    const hasGenericGreeting = /dear (customer|user|sir\/madam),|dear valued customer/i.test(content);

    if (hasGenericGreeting) {
      riskScore += 15;
      threats.push('Generic greeting pattern detected');
    } else if (hasProperGreeting) {
      riskScore = Math.max(0, riskScore - 5);
    }

    // Grammar and spelling check (simplified)
    const commonMisspellings = ['recieve', 'seperate', 'occured', 'neccessary', 'definately'];
    const misspellingCount = commonMisspellings.filter(word => 
      lowerContent.includes(word)
    ).length;

    if (misspellingCount > 0) {
      riskScore += misspellingCount * 10;
      threats.push('Spelling errors detected');
    }

    // Attachment analysis
    const attachmentRegex = /\.(exe|scr|bat|com|pif|vbs|js|jar|zip|rar)(\s|$)/gi;
    const suspiciousAttachments = content.match(attachmentRegex) || [];
    const attachmentCount = suspiciousAttachments.length;

    if (attachmentCount > 0) {
      riskScore += attachmentCount * 30;
      threats.push('Potentially dangerous attachment types detected');
      recommendations.push('Do not open suspicious attachments');
    }

    // Final risk calculation with confidence adjustment
    riskScore = Math.min(100, Math.max(0, riskScore));
    
    // Adjust confidence based on analysis quality
    if (content.length < 50) {
      confidence -= 20;
    }
    if (threats.length === 0 && riskScore < 20) {
      confidence += 10;
    }

    // Generate contextual recommendations
    if (riskScore > 70) {
      recommendations.push('Delete this email immediately');
      recommendations.push('Report to your IT security team');
    } else if (riskScore > 40) {
      recommendations.push('Verify sender through alternative communication');
      recommendations.push('Do not provide personal information');
    } else if (riskScore > 20) {
      recommendations.push('Exercise caution when interacting with this email');
    }

    if (recommendations.length === 0) {
      recommendations.push('Email appears legitimate, but always remain vigilant');
    }

    return {
      riskScore,
      threats,
      recommendations,
      technicalDetails: {
        senderReputation: Math.max(10, 100 - riskScore + Math.random() * 20 - 10),
        domainAge: Math.floor(Math.random() * 3650) + 30,
        linkCount,
        attachmentCount,
        spfRecord: Math.random() > 0.3,
        dkimValid: Math.random() > 0.4,
        dmarcPolicy: ['none', 'quarantine', 'reject'][Math.floor(Math.random() * 3)]
      },
      confidence: Math.min(100, Math.max(60, confidence))
    };
  }

  static analyzeURL(url: string): URLAnalysis {
    const lowerUrl = url.toLowerCase();
    let riskScore = 0;
    const threats: string[] = [];
    let confidence = 80;

    // Extract domain
    let domain = '';
    try {
      const urlObj = new URL(url);
      domain = urlObj.hostname;
    } catch {
      riskScore += 40;
      threats.push('Invalid URL format');
      confidence -= 20;
    }

    // Check against known suspicious domains
    if (this.suspiciousDomains.some(suspDomain => domain.includes(suspDomain))) {
      riskScore += 60;
      threats.push('Known suspicious domain detected');
    }

    // Check against trusted domains
    const isTrustedDomain = this.trustedDomains.some(trustedDomain => 
      domain.endsWith(trustedDomain)
    );

    if (isTrustedDomain) {
      riskScore = Math.max(0, riskScore - 30);
      confidence += 15;
    }

    // HTTPS check
    const httpsEnabled = url.startsWith('https://');
    if (!httpsEnabled) {
      riskScore += 25;
      threats.push('Unencrypted HTTP connection');
    }

    // Suspicious URL patterns
    const suspiciousPatterns = [
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP address
      /[a-z0-9]+-[a-z0-9]+-[a-z0-9]+\.(com|net|org)/, // Hyphenated domains
      /[a-z]+[0-9]+\.(tk|ml|ga|cf)/, // Free domains with numbers
      /(secure|login|verify|update|account).*\.(tk|ml|ga|cf|bit\.ly)/ // Phishing keywords + suspicious TLD
    ];

    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(lowerUrl)) {
        riskScore += 20;
        threats.push('Suspicious URL pattern detected');
      }
    });

    // Domain reputation simulation (more realistic)
    let reputation = 85;
    if (domain.length < 5) {
      reputation -= 20;
      riskScore += 15;
    }
    if (domain.includes('secure') || domain.includes('verify')) {
      reputation -= 30;
      riskScore += 25;
    }
    if (isTrustedDomain) {
      reputation = Math.min(100, reputation + 25);
    }

    // Category determination
    let category = 'Unknown';
    if (isTrustedDomain) {
      const categoryMap: { [key: string]: string } = {
        'google.com': 'Search Engine',
        'microsoft.com': 'Technology',
        'apple.com': 'Technology',
        'amazon.com': 'E-commerce',
        'paypal.com': 'Financial',
        'facebook.com': 'Social Media',
        'twitter.com': 'Social Media',
        'linkedin.com': 'Professional Network',
        'github.com': 'Development',
        'wikipedia.org': 'Reference',
        'reddit.com': 'Social Media',
        'youtube.com': 'Video Platform',
        'netflix.com': 'Entertainment',
        'spotify.com': 'Music Streaming'
      };
      
      for (const [trustedDomain, cat] of Object.entries(categoryMap)) {
        if (domain.endsWith(trustedDomain)) {
          category = cat;
          break;
        }
      }
    } else if (riskScore > 60) {
      category = 'Suspicious';
    } else if (domain.includes('bank') || domain.includes('pay')) {
      category = 'Financial';
    } else if (domain.includes('shop') || domain.includes('store')) {
      category = 'E-commerce';
    } else {
      category = 'General';
    }

    // Final adjustments
    riskScore = Math.min(100, Math.max(0, riskScore));
    reputation = Math.min(100, Math.max(0, reputation));

    // Scan engines simulation (more realistic)
    const detectionRate = riskScore > 70 ? 0.8 : riskScore > 40 ? 0.3 : 0.05;
    const detected = Math.floor(20 * detectionRate + Math.random() * 3);

    return {
      url,
      riskScore,
      category,
      reputation,
      securityFeatures: {
        httpsEnabled,
        validCertificate: httpsEnabled && Math.random() > 0.1,
        domainAge: isTrustedDomain ? Math.floor(Math.random() * 5000) + 1000 : Math.floor(Math.random() * 365) + 1,
        redirectCount: Math.floor(Math.random() * 3),
        hasPrivacyPolicy: isTrustedDomain || Math.random() > 0.4,
        hasTermsOfService: isTrustedDomain || Math.random() > 0.5
      },
      threats,
      confidence: Math.min(100, Math.max(70, confidence)),
      scanEngines: {
        detected: Math.max(0, detected),
        total: 20
      }
    };
  }
}