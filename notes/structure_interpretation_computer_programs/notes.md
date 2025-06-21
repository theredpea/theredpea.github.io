[Structure and Interpretation of Computer Programs (SICP)](https://sarabander.github.io/sicp/html/index.xhtml)


# 1. Building Abstractions with Procedures

John Locke quote:
1. combine ideas
2. compare ideas
3. separate ideas
John Locke, An Essay Concerning Human Understanding (1690)

Computer programs

1. **Process**
   - **Processes** are "abstract beings that inhabit computers"
2. **Data**
   - Processes manipulate abstract things called **data**
3. **Program**
   - Processes evolve according to rules of a **program**

Programming language = symbolic expressions

Qualities of a good program:
 - Modularity
 
Qualities of a good/senior programmer:
 - Can visualize the behavior in advance
 - Can avoid unintended consequences / bugs
 
Lisp
 - Created by John McCarthy
 - "**recursion equations**", "Recursive Functions of Symbolic Expressions and Their Computation by Machine"
 - Reputation for being inefficient, but 
 - Good for designing **procedures**
 - Not formalized, many dialects, we'll use "Scheme" dialect
 - Procedures as data
     > Lisp dscriptions of processes , called procedures, can themselves be represented and manipulated as data

## 1.1 The Elements of Programming

- **primitive exprssions**, represent simplest entities
- **means of combination**, compound elements from simpler ones
- **means of abstraction**, compound elements named and manipulated

Two primitive elements
 1. **data**
 2.  **procedures**

This chapter deals with numerical data. (Numerical data can be very complex for computers, but we'll ignore these complexities for now.)

Sit at a terminal, type an **expression**, then **evaluate** the expression to get the result.