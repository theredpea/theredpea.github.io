---
layout: post
title:  "Moving data from QVD to SQL Server"
date:   2020-12-20 11:22:00 -0700
excerpt_separator: <!--more-->
---

I had to move some large data (40GB+) from QVD file format (QlikView/Qlik Sense), into a database (SQL Server). I discuss some of the pitfalls I encountered in this post...

<!--more-->

# Filter Early
My QVD had data I didn't need;
 - SELECT as few columns and as few rows as possible; only what you need.
 - Don't try to JOIN in Qlik Sense Load Script; (Qlik Sense worked better when I loaded the tables separately)
 - Use an `WHERE NOT EXISTS(...)` statement to ensure the "xref" table didnt load unnecessary rows; and likewise the linked table (which effectively "INNER JOIN"s the resulting rows)
 - Write each separate table to CSV output
 - Use a `NullInterpret` or `IF(ISNULL(...))` technique, to distinguish `NULL` values from empty string values

# Store QVD Into CSV
Use Qlik Sense load script to store each of the relevant QVD files (one "table" per QVD), into a separate CSV file. 
- There is no simple way to use Qlik Sense load scripts to go directly from QVD -> SQL Server
- If we write to CSV file, we can use SQL Server Import Wizard/ SSIS to import from CSV -> SQL Server

CSV will not contain "schema" data, so to prepare for the next step, do this:
 - Export the field information from Qlik Sense; ([use the `FieldList` API](https://help.qlik.com/en-us/sense-developer/2.1/Subsystems/EngineAPI/Content/Structs/FieldList.htm) to get [`NxFieldDescription` data for each field](https://help.qlik.com/en-US/sense-developer/2.1/Subsystems/EngineAPI/Content/Structs/NxFieldDescription.htm)), including `qTags` (which tell us `$numeric` or `$ascii`), this helps us choose the right/"most efficient" datatype for each column in our database
 - Export a table showing the `=MAX(LEN([YourField]))` values, so if the field is `$ascii` in Qlik Sense (and therefore `varchar` in your database); you'll know what *size* to make your `varchar` column (this was a major stumbling block for me; I used `nvarchar(255)`, and for a table with many millions of rows; this took up unwieldy amounts of space on the database drive)
  
# SQL Server Import Wizard
Choose datatypes for the CSV "Input Columns"
- Choose Flat File as your input;  
- Check the CodePage; for me I could use `Latin1` aka `1252`; change that on first page of Import Wizard
- On the "Advanced" tab, choose the datatypes and char lengths for your CSV columns; use the most efficient datatype possible to speed up the import significantly (i.e. 10-100x faster), and decrease the size on the database
- See StackOverflow for warnings about Truncation Errors; may want to use the datatype lik `DT_TEXT` (a text stream) - this slowed down the process significantly for me, and by default used an inefficient datatype in the resulting database (`nvarchar(max)`). However, if you choose the `DT_TEXT` datatype for onr of your CSV formats
- Use Text Qualifier; the exported CSV from Qlik Sense  load scripts may use quotes `"..."` to wrap your values if your values contain commas -- until I used this, I ran into "Truncation Errors" many times

Allow the Input Columns to determine the resulting Output Columns in a *new table* (just an easy way to get your table created for you, automatically)

# JOIN in SQL Server
I use a `JOIN` in SQL Server (see earlier comment, I ran into limits trying to JOIN directly in the Qlik Sense load script)

 - Consider using `INSERT` instead of `SELECT ... INTO` (see Stack Overflow answer about this)