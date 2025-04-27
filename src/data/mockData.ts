import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: 'Job Recommendation System Failure',
    description: 'The recommendation algorithm unintentionally prioritized certain demographic groups, reducing visibility for equally qualified candidates. Early analysis indicates biased training data and lack of fairness constraints.',
    severity: 'Medium',
    reported_at: '2025-03-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Critical Misinformation by Language Model',
    description: 'A large language model generated inaccurate emergency response guidelines, risking user safety by presenting false information with high confidence. The issue highlights the dangers of hallucinations in critical decision-making contexts.',
    severity: 'High',
    reported_at: '2025-04-01T14:30:00Z'
  },
  {
    id: 3,
    title: 'Minor Data Leak via Chatbot',
    description: 'Chatbot inadvertently exposed non-sensitive user metadata during conversation. The exposed data included approximate location and device type, but no personally identifiable information was revealed.',
    severity: 'Low',
    reported_at: '2025-03-20T09:15:00Z'
  },
  {
    id: 4,
    title: 'Blocked API Breach Attempt',
    description: 'Suspicious activities targeting API endpoints to extract model weights were identified and successfully mitigated. Immediate security patches were applied, and enhanced monitoring has been deployed to prevent future breaches.',
    severity: 'High',
    reported_at: '2025-04-05T16:45:00Z'
  },
  {
    id: 5,
    title: 'Content Moderation Bypass',
    description: 'Users discovered a prompt technique that bypassed content moderation systems, allowing generation of policy-violating content. Emergency fix has been deployed while a more comprehensive solution is developed.',
    severity: 'Medium',
    reported_at: '2025-03-28T11:20:00Z'
  }
];