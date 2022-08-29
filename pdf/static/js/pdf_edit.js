/* Javascript for pdfXBlock. */
function pdfXBlockInitEdit(runtime, element) {
    function local_pdf_assets() {
        const upload_url = $('#upload_url').val()
        var req = jQuery.ajax({
            url: upload_url,
            method: 'GET',
            dataType: "json",
        });

        req.then(function(response) {
            $.each(response.assets, function (i, item) {
                $('#suggestions').append($('<option>', { 
                    value: item.portable_url,
                    text : item.display_name 
                }));
            });
        }, function(error) {
            console.error('failed to fetch assets', error)
        })
    }

    $(element).find('.action-cancel').bind('click', function () {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function () {
        var data = {
            'display_name': $('#pdf_edit_display_name').val(),
            url: $('#pdf_edit_url').val(),
            'allow_download': $('#pdf_edit_allow_download').val(),
            'source_text': $('#pdf_edit_source_text').val(),
            'source_url': $('#pdf_edit_source_url').val()
        };

        runtime.notify('save', { state: 'start' });

        var handlerUrl = runtime.handlerUrl(element, 'save_pdf');
        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
            if (response.result === 'success') {
                runtime.notify('save', { state: 'end' });
            }
            else {
                runtime.notify('error', { msg: response.message });
            }
        });
    });

    $(element).find('.action-upload').on('change', function (event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.set('file', file);

        const upload_url = $('#upload_url').val()

        var req = jQuery.ajax({
            url: upload_url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false
        });

        req.then(function(response) {
            document.getElementById("pdf_edit_url").value = response.asset.portable_url;
            $('#suggestions').append($('<option>', { 
                value: response.asset.portable_url.portable_url,
                text : response.asset.portable_url.display_name 
            }));
        }, function(error) {
            console.error('faild to upload pdf', error)
        })
    });

    local_pdf_assets();
}
