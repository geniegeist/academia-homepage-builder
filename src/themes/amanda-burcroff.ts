import { Theme } from './theme';

const theme: Theme = {
  css: 'amanda-burcroff',
  defaultText: `# Viet Duc Nguyen

#### Mathematics PhD Student
  
#### Harvard University, Cambridge, MA
  
#### She / Her / Hers
  
-----
  
* [About Me](#about-me)
* [Research](#research)
* [Other Interests](#sd)
  
----
  
## About Me 
  
I am a first-year PhD student in mathematics at Harvard University advised by Lauren Williams. My main research interest is algebraic combinatorics, though I'm generally a fan of combinatorics of all flavors. Previously I have worked on projects involving hyperbolic Coxeter polytopes, graph domination, pattern avoidance, minimal additive complements, and combinatorics on words. I am currently thinking about problems involving cluster algebras. 
  
I spent the past two years in the UK sponsored by a Marshall scholarship. Last year I was a master's research student at Durham University, where I wrote a thesis "On Compact Hyperbolic Coxeter Polytopes with Few Facets" supervised by Pavel Tumarkin. I spent the 2019-2020 academic year in the Part III Mathematics program at Cambridge University, where I wrote an essay on "Tropical Structures in Mirror Symmetry" set by Mark Gross. 
  
I graduated from the University of Michigan in 2019. During that time, I had the pleasure of participating in the Budapest Semesters in Mathematics program, the University of Chicago REU, and the Duluth Combinatorics REU. I have returned to the Duluth REU as an advisor during the summers of 2020 and 2021.
  
## Research
  
### Submitted Papers
  
* [Unimodality and monotonic portions of certain domination polynomials](www.arxiv.org), 2021. With Grace O'Brien.
* [Sets arising as minimal additive complements in the integers](www.arxiv.org), 2020. With Noah Luntzlara.
  
### Other Work
  
* "On Compact Hyperbolic Coxeter Polytopes with Few Facets", a master's thesis submitted to Durham University under the supervision of Pavel Tumarkin
* "Tropical Structures in Mirror Symmetry", an essay written for the University of Cambridge Part III Mathematics Program and set by Mark Gross (available upon request)
  
  
  
## Other Interests
  
I am passionate about increasing diversity in STEM and access to mathematics for all students. Of course, there are many wonderful programs supporting mathematicians, but here are a few that I personally recommend. Please feel free to email me at the address toward the bottom of this page if you have questions about any of these programs.
  
**At Harvard:**
  
- Real Representations (support group for all underrepresented groups within the Harvard math department)
- Gender Inclusivity in Mathematics
- [Math Includes Mentorship Program](www.google.de)
  
**For Undergraduates**
  
- [Duluth Combinatorics REU](www.google.de)
- [Budapest Semesters in Math](www.google.de)
- University of Chicago Math REU
- Women and Mathematics Program at the IAS
- Graduate Research Opportunities for Women (GROW) Conference
  
Outside of mathematics, I also enjoy rowing, painting, puzzle gaming, running, and traveling.
  
------
  
*© 2021 Amanda Burcroff. All rights reserved.*
  
  `,
  generateHTML: (content: string) => {
    const html = `
<html>
<header>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="stylesheet.css">
</header>
<body>
<div class="wrapper">
${content}
</div>
</body>
</html>
    `;
    return html;
  },
  generateCSS: () => {
    const css = `html {
  display: flex;
  justify-content: center;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  width: 100%;
}

.wrapper {
  margin-top: 1em;
  width: 640px;
  color: #333d41;
  padding: calc(1em + 1ex);
}

.wrapper h1, .wrapper h2, .wrapper h4 {
  text-align: center;
}

.wrapper h3, .wrapper h5, .wrapper h6 {
  text-align: left;
}

.wrapper h1 {
  font-weight: bold;
}

.wrapper h4 {
  color: #3b464b;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.1em;
  line-height: 0.8em;
}

.wrapper ul li {
  margin: 0.4em 0;
}

.wrapper a {
  border-bottom: 1px solid #91b7c7;
  text-decoration: none;
  color: #333d41;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.wrapper a:hover {
  color: #91b7c7;
}
    `;
    return css;
  },
};

export default theme;
