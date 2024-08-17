// Add copy button above code blocks.
document.addEventListener("DOMContentLoaded", function(){
    const codeBlocks = document.querySelectorAll("pre code[class^='language-']");
    
    codeBlocks.forEach(codeBlock =>{
        const contentBtnCopy = "Copy";
        const contentBtnCopyClicked = "Copied!";

        const preElement = codeBlock.parentElement;

        // code header container
        const codeLanguage = document.createElement("span");
        codeLanguage.innerText = codeBlock.className.replace("language-", "");
        
        const btnCopy = document.createElement("button");
        btnCopy.className = "btn-copy";
        btnCopy.innerText = contentBtnCopy;
        const spanBtnCopy = document.createElement("span");
        spanBtnCopy.appendChild(btnCopy);
        
        const codeHeaderContainer = document.createElement("div");
        codeHeaderContainer.className = "code-header-container";
        codeHeaderContainer.appendChild(codeLanguage)
        codeHeaderContainer.appendChild(spanBtnCopy)
        
        // code block container
        const codeBlockContainer = document.createElement("div");
        codeBlockContainer.className = "code-block-container";
        codeBlockContainer.appendChild(codeBlock);

        // code container
        const codeContainer = document.createElement("div");
        codeContainer.className = "code-container";
        codeContainer.appendChild(codeHeaderContainer)
        codeContainer.appendChild(codeBlockContainer)

        // insert code container
        preElement.appendChild(codeContainer);


        // div(상단바) div(복사버튼) span button
        // div code

        btnCopy.addEventListener("click", function(){
            const code = codeBlock.textContent;

            navigator.clipboard.writeText(code).then(()=>{
                this.textContent = contentBtnCopyClicked;
                setTimeout(() => {
                    this.textContent = contentBtnCopy;
                }, 2000);
            });
        });
    })
})