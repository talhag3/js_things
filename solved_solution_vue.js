function getDataUri(url, callback) {
    console.log('getDataUri');
    var image = new Image();

    image.onload = function () {
        console.log("image onload----");
        var canvas = document.createElement('canvas');
        canvas.width = 144; 
        canvas.height = 144;

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
    image.setAttribute('crossOrigin', 'anonymous');
}


getDataUri(img_src, function(dataUri) {
    console.log("hi-----my code");
    console.log(dataUri);
    var data = dataUri.split(',')[1];
    data = window.atob(data);
    var ia = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    };
    
    var file=new Blob([ia], {type: 'image/jpeg'});

    var fmData = new FormData();
    fmData.append("image", file);

    axios({
        method: 'post',
        data: fmData,
        url: _this.API_URL+"upload_avatar",
        headers: _this.getAuthHeader()
    }).then(response => {
        if (response.data.status == 200 && response.data.result != 'undefined') {
            console.log("Success");
    } else {
        if (response.data.status != 200 && typeof response.data.message != 'undefined') {
            console.log("Not Uploaded ");
        }
    }
    }).catch(error => {
        console.log(error);
    });  
});