function getFilename(contentDisposition) {
    const [, filenamePart] = contentDisposition.split(';')
    const [,filenameQuoted] = filenamePart.split('=')
    return filenameQuoted.trim('"');
}

function startUp() {
    const buttonInput = document.getElementById('input-button');
    const textInput = document.getElementById('input-text');
    const mainForm = document.getElementById('main-form')
    const fileInput = document.getElementById('input-file');
    mainForm.onsubmit = (e) => e.preventDefault();

    buttonInput.onclick = async function () {
        const requestBody = new FormData();
        requestBody.append('text', textInput.value)

        const response = await fetch('/api/text/to/image', {
            'body': requestBody,
            method: 'POST',
        });

        const blob = await response.blob()
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a')
        a.href = url;
        a.download = getFilename(response.headers.get('content-disposition'));
        document.body.appendChild(a)
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    window.ondrop = function (e) {
        console.log('ondrop')
        e.preventDefault();
        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    console.log(`... file[${i}].name = ${file.name}`)
                }
            })
        } else {
            [...e.dataTransfer.items].forEach((item, i) => {
                console.log(`...file[${i}].name = ${item.name}`)
            })
        }
    }
}

window.onload = startUp

