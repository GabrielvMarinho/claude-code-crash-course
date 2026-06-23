import data from './data.json';
import { toolCategories } from './tools';

// Engineers
export const getAllEngineers = () => data.engineers;
export const getEngineerById = (id) => data.engineers.find((e) => e.id === id);
export const getAvailableEngineers = () => data.engineers.filter((e) => e.available);
export const getEngineersBySkill = (skill) =>
  data.engineers.filter((e) => e.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));

// Services
export const getAllServices = () => data.services;
export const getServiceById = (id) => data.services.find((s) => s.id === id);

// Case studies
export const getAllCaseStudies = () => data.caseStudies;
export const getCaseStudiesByTag = (tag) =>
  data.caseStudies.filter((c) => c.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
export const getCaseStudiesByYear = (year) => data.caseStudies.filter((c) => c.year === year);

// FAQs
export const getAllFaqs = () => data.faqs;
export const searchFaqs = (term) => {
  const needle = term.toLowerCase();
  return data.faqs.filter(
    (f) => f.question.toLowerCase().includes(needle) || f.answer.toLowerCase().includes(needle)
  );
};

// Meta
export const getMeta = () => data.meta;

// Tools
export const getAllTools = () => toolCategories.flatMap((c) => c.tools);
export const getToolCategories = () => toolCategories;
export const getToolsByCategory = (category) =>
  toolCategories.find((c) => c.category === category)?.tools ?? [];
export const getToolByName = (name) => getAllTools().find((t) => t.name === name);
