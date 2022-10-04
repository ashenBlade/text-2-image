function startUp() {
    const buttonInput = document.getElementById('input-button');
    const textareaInput = document.getElementById('input-text');
    const fileInput = document.getElementById('input-file');
    const inputFileDiv = document.getElementById('upload-file-div');
    const removeFileButton = document.getElementById('remove-file-button');
    const uploadFilename = document.getElementById('upload-filename');
    const mainForm = document.getElementById('main-form');

    function isTextInput() {
        return !textareaInput.disabled;
    }

    function isFileInput() {
        return !fileInput.disabled;
    }

    function switchToText() {
        textareaInput.classList.remove('d-none');
        textareaInput.hidden = false;
        textareaInput.disabled = false;

        inputFileDiv.classList.add('d-none');
        inputFileDiv.hidden = true;
        inputFileDiv.disabled = true;
        fileInput.disabled = true;

        buttonInput.disabled = !isTextInInput();

        mainForm.enctype = 'application/x-www-form-urlencoded';
    }

    function switchToFile() {
        textareaInput.classList.add('d-none')
        textareaInput.hidden = true;
        textareaInput.disabled = true;

        inputFileDiv.classList.remove('d-none');
        inputFileDiv.hidden = false;
        inputFileDiv.disabled = false;
        fileInput.disabled = false;

        buttonInput.disabled = !isFileInInput();

        mainForm.enctype = 'multipart/form-data'
    }

    function isFileInInput() {
        return fileInput.files.length > 0;
    }

    function isTextInInput() {
        return textareaInput.value.length > 0;
    }

    textareaInput.addEventListener('input', e => {
        if (textareaInput.value.length === 0) {
            buttonInput.disabled = true;
        } else if (textareaInput.value.length === 1) {
            buttonInput.disabled = false;
        }
    });


    buttonInput.onclick = async function () {
        return !(isTextInput() && !isTextInInput());
    }

    removeFileButton.onclick = function (e) {
        e.preventDefault();
        fileInput.files.length = 0;
        switchToText();
    }

    window.ondrop = async function (e) {
        e.preventDefault();
        if (e.dataTransfer.files.length === 1) {
            fileInput.files = e.dataTransfer.files;
            uploadFilename.innerHTML = e.dataTransfer.files[0].name;
            switchToFile();
        } else {
            alert('Choose only single file')
        }
    }
}

window.onload = startUp

