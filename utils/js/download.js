function downloadTwo(data) {

    var fill = `<?xml version="1.0" encoding="UTF-8"?>

    <manifest identifier="man00001">
        <organization default="toc00001"><tableofcontents identifier="toc00001"/></organization>
        <resources>
            <resource baseurl="res00001" file="res00001.dat" identifier="res00001" type="assessment/x-bb-pool"/>
        </resources>
    </manifest>`

    var zip = new JSZip();
    zip.file("imsmanifest.xml", fill);
    zip.file("res00001.dat", data);
    zip.generateAsync({type:"blob"})
    .then(function(content) {
      // see FileSaver.js
      saveAs(content, "blackboard.zip");
    });
}