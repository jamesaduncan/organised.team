# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is organised.team, a standards-compliant approach to managing services, needs, policies and teams using Schema.org extensions and custom schemas. The project uses Eleventy (11ty) as a static site generator to build semantic HTML documentation from Liquid templates.

Eventually this project will use rusty-beam (http://github.com/jamesaduncan/rusty-beam/) as its main application server.

## Architecture

### Core Structure
- **src/**: Source templates and content (Liquid templates, HTML files, CSS)
- **docs/**: Generated output directory (built HTML files)
- **eleventy.config.mjs**: Eleventy configuration with input/output directories

### Schema System
The project implements a hierarchical schema system:

**Schema.org Extensions:**
- `Schema`: Meta-schema for defining schemas
- `Property`: Defines schema properties
- `Cardinal`: Cardinality constraints
- `Enumerated`: Enumerated values

**Domain-Specific Schemas:**
- `Policy`: Policy definitions with statement, description, and scope
- `Organization`: Organizational structures
- `Team`: Team definitions
- `UserNeed`: User requirements
- `Role`: Role definitions within skills frameworks
- `Skill`: Skill definitions
- `SkillsFramework`: Structured skill frameworks (e.g., government-digital-data)

### Template System
- **Liquid templates**: All content files use `.liquid` extension
- **Layouts**: Multiple specialized layouts in `src/_includes/`:
  - `schema.liquid`: Base layout for schema definitions
  - `role.liquid`: Layout for role definitions in skills frameworks
  - `skill.liquid`: Layout for skill definitions
  - `skillsframework.liquid`: Layout for skills framework overview pages
  - `organization.liquid`: Layout for organization profiles
  - `person.liquid`: Layout for person profiles
- **Front matter**: YAML configuration including `layout`, `title`, `framework`, `tags`, `description`
- **Semantic HTML**: Heavy use of microdata attributes (`itemscope`, `itemtype`, `itemprop`)

## Development Commands

### Build
```bash
npx @11ty/eleventy
```

### Development Server
```bash
npx @11ty/eleventy --serve
```
Runs on port 8080 by default, with file watching enabled.

### Watch Mode (no server)
```bash
npx @11ty/eleventy --watch
```

### Incremental Build
```bash
npx @11ty/eleventy --incremental
```

### Configuration
The project uses ESM configuration in `eleventy.config.mjs` with:
- Input directory: `src`
- Output directory: `docs`
- CSS passthrough copy enabled for `src/styles.css`

## Content Creation Patterns

### Schema Files
All schema files follow this pattern:
```liquid
--- 
layout: schema
schematype: [SchemaName]
tags: schema
description: [Description]
---
<p itemprop="description">
[Detailed description]
</p>
<table>
    <caption itemprop="name">[SchemaName]</caption>
    <!-- Property definitions -->
</table>
```

### Role Files
Role definitions in skills frameworks follow this pattern:
```liquid
---
layout: role
title: [Role Title]
framework:
  name: [Framework Name]
  url: [Framework URL]
---
<meta itemprop="framework" content="[framework-url]">
<meta itemprop="scope" content="[scope-url]">

<p itemprop="description">[Role description]</p>

<section class="role-details">
    <h2>Typical responsibilities</h2>
    <ul>
        <li itemprop="responsibility">[Responsibility]</li>
    </ul>
</section>

<div class="required-skills">
    <h2>Required Skills</h2>
    <ul>
        <li>
            <a href="[skill-url]">[Skill Name]</a>
            <span class="proficiency-level">[Awareness|Working|Practitioner|Expert]</span>
        </li>
    </ul>
</div>

<div class="career-progression">
    <h2>Career progression</h2>
    <p>Previous role: <a href="[previous-role-url]">[Previous Role]</a></p>
    <p>Next role: <a href="[next-role-url]">[Next Role]</a></p>
</div>

<div class="civil-service-grades">
    <h2>Indicative Civil Service grades</h2>
    <ul>
        <li>[Grade descriptions]</li>
    </ul>
</div>
```

### Skill Files
Skill definitions follow this pattern:
```liquid
---
layout: skill
title: [Skill Title]
framework:
  name: [Framework Name]
  url: [Framework URL]
---
<meta itemprop="framework" content="[framework-url]">
<meta itemprop="skillType" content="[skill-type]">

<p itemprop="description">[Skill description]</p>

<div class="proficiency-levels">
    <h2>Proficiency Levels</h2>
    <ol class="skill-levels">
        <li>
            <h3>Awareness</h3>
            <p>[Awareness level description]</p>
        </li>
        <li>
            <h3>Working</h3>
            <p>[Working level description]</p>
        </li>
        <li>
            <h3>Practitioner</h3>
            <p>[Practitioner level description]</p>
        </li>
        <li>
            <h3>Expert</h3>
            <p>[Expert level description]</p>
        </li>
    </ol>
</div>

<div class="related-skills">
    <h2>Related Skills</h2>
    <ul>
        <li><a href="[skill-url]" itemprop="relatedSkill">[Related Skill]</a></li>
    </ul>
</div>

<div class="synonyms">
    <h2>Alternative Names</h2>
    <span itemprop="synonym">[Synonym]</span>
</div>
```

### Property Definitions
Properties are defined with microdata structure:
```html
<tr itemprop="property" itemscope itemtype="https://organised.team/Property">
    <td itemprop="name">[property-name]</td>
    <td itemprop="type">[schema.org-type-url]</td>
    <td itemprop="cardinality">[0..1|1|0..n]</td>
    <td itemprop="description">[description]</td>
</tr>
```

### URL Conventions
- Schema URLs: `https://organised.team/schema/[SchemaName]`
- Property URLs: `https://organised.team/schema/Property`
- SkillsFramework URLs: `https://organised.team/SkillsFramework/[framework-name]`
- Role URLs: `https://organised.team/SkillsFramework/[framework]/roles/[role-name]`
- Skill URLs: `https://organised.team/SkillsFramework/[framework]/skills/[skill-name]`
- Inherits from Schema.org: `https://schema.org/[Type]`

## Current Project Status

The project has completed its transition from static HTML to Eleventy with comprehensive content:

### ✅ **Completed Infrastructure**
- **Eleventy Configuration**: Full ESM configuration with input/output directories
- **Template System**: Complete set of specialized Liquid layouts for all content types
- **Schema System**: Core schemas converted and fully functional
- **Build Pipeline**: CSS passthrough, file watching, and live server capabilities

### ✅ **Government Digital and Data Framework (Complete)**
- **150+ Role Pages**: Complete coverage across all 8 DDaT profession categories
  - Architecture (20 roles): Business, Data, Enterprise, Network, Security, Solution, Technical
  - Chief Digital & Data (3 roles): CDO, CISO, CTO  
  - Data (23 roles): Analytics Engineer, Data Scientist, Data Engineer, ML Engineer, etc.
  - IT Operations (36 roles): Infrastructure, Service Management, Incident Management, etc.
  - Product & Delivery (19 roles): Product Manager, Business Analyst, Delivery Manager, etc.
  - Quality Assurance Testing (11 roles): QA Analyst, Test Engineer, Test Manager
  - Software Development (8 roles): DevOps, Frontend, Software Developer
  - User-Centred Design (31 roles): UX, Content, Service Design, Accessibility, etc.

- **50+ Skill Pages**: Comprehensive skill definitions with 4-level proficiency framework
  - Technical skills (programming, data, security, architecture)
  - Leadership skills (people management, strategy, governance)
  - Process skills (agile delivery, testing, incident management)
  - Design skills (user research, accessibility, service design)

### ✅ **Content Features**
- **Semantic HTML**: All content uses proper schema.org microdata
- **Career Pathways**: Complete progression paths within role families
- **Skill Proficiency**: 4-level framework (Awareness → Working → Practitioner → Expert)
- **Civil Service Integration**: Appropriate grade mappings for all roles
- **Cross-Referencing**: Proper linking between roles, skills, and frameworks

### ✅ **Organization & People**
- **Organization profiles**: Stance Global Ltd template and layout
- **Person profiles**: Individual contributor pages with structured data

## Development Guidelines

When working with this codebase:

1. **All new content should use `.liquid` templates** with appropriate layouts
2. **Follow established patterns** for role, skill, and schema definitions  
3. **Maintain semantic HTML** structure with proper microdata attributes
4. **Use consistent URL conventions** for cross-referencing
5. **Preserve career progression** logic in role definitions
6. **Include proper skill proficiency levels** in role requirements
7. **Test with live server**: Use `npx @11ty/eleventy --serve --watch` for development

## Framework Extension

To add new skills frameworks or extend existing ones:
1. Create framework overview page using `skillsframework` layout
2. Follow role and skill template patterns for consistency  
3. Ensure proper cross-referencing between roles and skills
4. Maintain semantic HTML and microdata attributes
5. Update main framework page with new role/skill links