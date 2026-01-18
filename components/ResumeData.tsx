import React from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, Check } from 'lucide-react';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">{title}</h2>
    <div className="space-y-8">
        {children}
    </div>
  </section>
);

const RoleCard: React.FC<{
  title: string;
  company: string;
  location: string;
  period: string;
  items: React.ReactNode[];
}> = ({ title, company, location, period, items }) => (
  <div className="relative pl-8 border-l border-slate-800 hover:border-primary transition-colors duration-300">
    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-slate-800 border border-slate-600 group-hover:border-primary transition-colors" />
    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs font-mono text-muted bg-slate-800/50 px-2 py-1 rounded">{period}</span>
    </div>
    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
        <span className="font-medium text-slate-300">{company}</span>
        <span className="w-1 h-1 bg-slate-600 rounded-full" />
        <span className="flex items-center gap-1"><MapPin size={12} /> {location}</span>
    </div>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-400 text-sm leading-relaxed flex items-start gap-2">
             <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
             <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ResumeContent: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-slate-900/50 p-8 rounded-xl border border-slate-800 shadow-2xl">
      <header className="mb-12 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-white mb-4">Tim Shoemake</h1>
        <p className="text-lg text-slate-400 mb-6">Full Stack Engineer &amp; Solution Architect</p>
        <div className="flex flex-wrap gap-4 text-sm text-primary">
            <a href="mailto:hello@timshoemake.io" className="hover:underline">hello@timshoemake.io</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/timshoemake/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <span>•</span>
            <a href="https://timshoemake.io" target="_blank" rel="noreferrer" className="hover:underline">timshoemake.io</a>
        </div>
      </header>

      <ResumeSection title="Skills & Abilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-slate-800/30 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Core Competencies</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                    Full Stack Engineering, SQL Databases, Object-Oriented Design, API Integration, ETL Processes, SaaS Architecture.
                </p>
           </div>
           <div className="bg-slate-800/30 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Technologies</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                    ASP.NET Core/MVC, Blazor, SQL, Angular, React, TypeScript, C#, Telerik, SSIS, Azure, Git, CI/CD.
                </p>
           </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Professional Experience">
         <RoleCard
            title="Senior Software Engineer"
            company="Origami Risk"
            location="Remote"
            period="Jan 2023 – Present"
            items={[
               "Engineered scalable SaaS solutions for the risk management and insurance sector.",
               "Architected and maintained core .NET/C# services and React front-ends for high-traffic enterprise applications.",
               "Collaborated with product teams to design and deliver high-impact features for diverse client needs.",
               "Optimized database performance and API response times."
            ]}
         />
         <RoleCard
            title="Founder, Contractor Services"
            company="Tim Shoemake, LLC"
            location="Remote"
            period="Jun 2017 – Present"
            items={[
                "Tower Loan (Current): Implemented electronic signatures for online loans, modernized JS libraries, and architected API microservices.",
                "Extra Nerds (2017–Current): Board Member & Treasurer. Started as developer, moved to Team Lead. Contribute to business planning.",
                "Good Therapy San Diego (2020–2022): Built custom HR data ingestion suite with Blazor & Telerik.",
                "Founded TS, LLC to serve SMBs with custom web development."
            ]}
         />
         <RoleCard
            title="Senior Consultant"
            company="ISI"
            location="Remote"
            period="Mar 2022 – Jan 2023"
            items={[
                "Delivered web app development and ETL solutions for 15+ projects (Margaritaville, Planet Hollywood, Benihana).",
                "Built ASP.NET Core/MVC web apps for healthcare, financial, and hospitality sectors.",
                "Designed ETL processes using SQL (SSMS) and C# console apps for HR data migration.",
                "Performed complex transformations using custom SQL stored procedures."
            ]}
         />
         <RoleCard
            title="Developer / Project Manager"
            company="Extra Nerds"
            location="Remote"
            period="Nov 2018 – Mar 2022"
            items={[
                "Acted as project manager, business analyst, and developer.",
                "Led teams using agile process, daily scrums, and sprint planning with clients.",
                "Managed scope, tracked progress, and facilitated team communication with Google Docs and Postman.",
                "Fostered healthy, flexible, professional team environments and positive feedback.",
                "Technologies: Angular 5–11, ASP.NET Web Forms/MVC, VB.NET."
            ]}
         />
         <RoleCard
            title="Senior Software Developer"
            company="Duff Capital Investors"
            location="Columbia, MS"
            period="Jul 2018 – Nov 2018"
            items={[
                "Implemented truck tire inventory service across 70+ Southern Tire Mart locations.",
                "Stack: Angular 7, Django, Python."
            ]}
         />
          <RoleCard
            title="Software Engineer"
            company="American HealthTech"
            location="Ridgeland, MS"
            period="Nov 2015 – Jun 2018"
            items={[
                "Architected new branch of major healthcare web application.",
                "Stack: Angular, MVC 4, C#, EF, SQL, LINQ, Unit Testing."
            ]}
         />
         <RoleCard
            title="Senior Software Developer"
            company="Pioneer Health"
            location="Magee, MS"
            period="Apr 2014 – Sept 2015"
            items={[
                "Led software/database development for new IT department serving 8+ hospitals and clinics nationwide.",
                "Built custom WinForms/WebApps (.NET/SQL) and data warehouses (SSIS) from scratch.",
                "Trained employees on version control; managed multiple projects simultaneously.",
                "Certifications: Infor Cloverleaf HL7 (Basic, Intermediate, Advanced, Administrator)."
            ]}
         />
         <RoleCard
            title="Junior Developer"
            company="Deloitte Consulting"
            location="Hattiesburg, MS"
            period="Mar 2012 – Apr 2014"
            items={[
                "Developed for secret clearance government projects (CMS, Homeland Security, Dept of Accounting).",
                "Technologies: .NET (C#, ASP.NET, SQL, Telerik)."
            ]}
         />
      </ResumeSection>

      <ResumeSection title="Education">
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
                <GraduationCap className="text-primary mt-1" size={20} />
                <div>
                    <h4 className="text-white font-medium">Bachelor’s, Management Information Systems</h4>
                    <p className="text-sm text-slate-400">The University of Southern Mississippi, 2009–2011</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <GraduationCap className="text-primary mt-1" size={20} />
                <div>
                    <h4 className="text-white font-medium">Associate’s, Liberal Arts</h4>
                    <p className="text-sm text-slate-400">Jones College, 2004–2006</p>
                </div>
            </div>
        </div>
      </ResumeSection>
    </div>
  );
};