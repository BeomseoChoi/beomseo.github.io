// Add copy button above code blocks.
document.addEventListener("DOMContentLoaded", function(){
    const codeBlocks = document.querySelectorAll("div[class^='language-']");
    console.log(codeBlocks)
    codeBlocks.forEach(codeBlock =>{
        const contentBtnCopy = "Copy";
        const contentBtnCopyClicked = "Copied!";

        // code container
        const codeContainer = document.createElement("div");
        codeContainer.className = "code-container";
        codeBlock.parentElement.insertBefore(codeContainer, codeBlock)

        // code header container
        const codeLanguage = document.createElement("span");
        codeLanguage.innerText = codeBlock.className.replace("language-", "").replace(" highlighter-rouge", "");
        codeLanguage.className = "code-header-lang";
        
        const btnCopy = document.createElement("button");
        btnCopy.className = "btn-copy";
        btnCopy.innerText = contentBtnCopy;
        const spanBtnCopy = document.createElement("span");
        spanBtnCopy.appendChild(btnCopy);
        const divBtnCopy = document.createElement("div");
        divBtnCopy.appendChild(spanBtnCopy)
        
        const codeHeaderContainer = document.createElement("div");
        codeHeaderContainer.className = "code-header-container";
        codeHeaderContainer.appendChild(codeLanguage)
        codeHeaderContainer.appendChild(divBtnCopy)
        
        // code block container
        const codeBlockContainer = document.createElement("div");
        codeBlockContainer.className = "code-block-container";
        codeBlockContainer.appendChild(codeBlock);

        // append header and code block to code container
        codeContainer.appendChild(codeHeaderContainer)
        codeContainer.appendChild(codeBlockContainer)

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