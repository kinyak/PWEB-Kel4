tinymce.init({
        selector: 'textarea',
        license_key: 'gpl',
        placeholder: "tulis artikel disini",
        plugins: [ 'advlist', 'autolink', 'lists', 'link', 'charmap', 'anchor', 'searchreplace', 'code', 'insertdatetime', 'help', 'wordcount'],
        menubar: 'edit view insert format tools help',
        toolbar: 'undo redo | blocks | ' + 'bold italic backcolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
    });

// Get the form element
const form = document.getElementById('articleForm');

// Add an event listener for the form submission
form.addEventListener('submit', function(event) {
    // Trigger the save event for TinyMCE
    tinymce.triggerSave();
});

    function previewImage() {
        const gambar = document.querySelector('#gambar');
        
        const gambarPreview = document.querySelector('.img-preview');

        gambarPreview.style.display = 'block';

        const oFReader = new FileReader();
        oFReader.readAsDataURL(gambar.files[0]);

        oFReader.onload = function(oFREvent) {
            gambarPreview.src = oFREvent.target.result;
        }
    }

