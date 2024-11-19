---
layout: default
title:  "LaTeX in PPT"
date:   2024-10-02 21:04:00 +0900
categories: posts
---
{% include post-header.html %}

https://www.jonathanleroux.org/software/iguanatex/

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/requirements.png"
max-width="80%"
%}

# Download
Download `MiKTeX`, `GhostScript`, `ImageMagick`, `TeX2img`.

## ppam
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/ppam.png"
max-width="80%"
%}

## MiKTeX
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/miktex.png"
max-width="80%"
%}

## GhostScript
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/ghostscript.png"
max-width="80%"
%}


## ImageMagick
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/imagemagick.png"
max-width="80%"
%}




## Tex2img
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/tex2img.png"
max-width="80%"
%}

# Install
Put `.ppam` in `C:\Users\user_name\Appdata\Roaming\Microsoft\Addins`

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/ppam-save.png"
max-width="80%"
%}

Create a directory at wherever you want.

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/create-directory.png"
max-width="80%"
%}

Install the every one except for `.ppam` in the directory and create `Temp` directory.


{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/install-and-create-temp.png"
max-width="80%"
%}

Add the path to the environment variable `Path`.
{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/Path.png"
max-width="80%"
%}

Check `PdfLaTeX` with these commands `Where $path:pdflatex` and `pdfLaTeX -shell-escape -interaction=batchmode iguanatex_tmp.tex`.

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/check-pdflatex.png"
max-width="80%"
%}

Open the MiKTeX Console as an admin and click the `Check for updates` then click `Updates page` to update.

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/miktex-console.png"
max-width="80%"
%}

Click `Update now`.

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/update-now.png"
max-width="80%"
%}

# Setup PowerPoint
Open PowerPoint > `File` > `Options` > `Add-Ins` > `Manage` > Choose `PowerPoint Add-Ins` > `Go` > `Add New` > Select `.ppam` file in the directory where you downloaded it > `Close`.

Set the `Temp` directory path, three `.exe` path, and the directory path where `pdflatex.exe` exists.

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/main-setting.png"
max-width="80%"
%}

{% include image.html 
path="/resources/2024-10-02-latex-in-ppt/generate.png"
max-width="80%"
%}
