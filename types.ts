import React from 'react';

export enum ServiceType {
  API_INTEGRATION = 'API_INTEGRATION',
  BUSINESS_AUTOMATION = 'BUSINESS_AUTOMATION',
  CUSTOM_WEB_APPS = 'CUSTOM_WEB_APPS',
  INFORMATIONAL_SITES = 'INFORMATIONAL_SITES'
}

export interface ServiceItem {
  id: ServiceType;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ResumeRole {
  title: string;
  company: string;
  location: string; // or Remote
  period: string;
  details: string[];
  techStack?: string[];
}