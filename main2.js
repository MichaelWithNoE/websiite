// Function to check if the clicked pixel is opaque
function isPixelOpaque(x, y, image) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;  // Use natural width to avoid scaling issues
    canvas.height = image.naturalHeight;

    // Calculate the scale factor for the image (based on the natural size vs displayed size)
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Adjust the click coordinates based on the scale
    const adjustedX = Math.floor(x * scaleX);
    const adjustedY = Math.floor(y * scaleY);


    

    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight); // Corrected property names
    const pixel = ctx.getImageData(adjustedX, adjustedY, 1, 1).data;

    // Debugging: Log the adjusted coordinates
    console.log(`Adjusted coordinates: (x: ${adjustedX}, y: ${adjustedY})`);

    return pixel[3] > 0;  // Check if the alpha value (transparency) is greater than 0
}

// Function to handle the click event
function handleInstrumentClick(event) {
    // Get the coordinates of the click on the page
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Adjust the coordinates and check for opacity on all images
    console.log(`Clicked at pixel coordinates: (x: ${x}, y: ${y})`);

    const trumpetImage = document.getElementById("trumpet");
    const clarinetImage = document.getElementById("clarinet");
    const banjoImage = document.getElementById("banjo");
    const pianoImage = document.getElementById("piano");
    const trombone1Image = document.getElementById("trombone1");
    const trombone2Image = document.getElementById("trombone2");
    const cymbalImage = document.getElementById("cymbal");
    const kickImage = document.getElementById("kick");
    const snareImage = document.getElementById("snare");

    window.onload = function() {
        const trumpetImage = document.getElementById("trumpet");
        scanOpaquePixels(trumpetImage);  // Scan for opaque pixels in the trumpet image

    }
    const isTrumpetOpaque = isPixelOpaque(x, y, trumpetImage);
    const isClarinetOpaque = isPixelOpaque(x, y, clarinetImage);
    const isBanjoOpaque = isPixelOpaque(x, y, banjoImage);
    const ispianoOpaque = isPixelOpaque(x, y, pianoImage);
    const istrombone1Opaque = isPixelOpaque(x, y, trombone1Image);
    const istrombone2Opaque = isPixelOpaque(x, y, trombone2Image);
    const iscymbalOpaque = isPixelOpaque(x, y, cymbalImage);
    const iskickOpaque = isPixelOpaque(x, y, kickImage);
    const issnareOpaque = isPixelOpaque(x, y, snareImage);

    // Log the result for each image
    console.log(`trumpet click = ${isTrumpetOpaque ? "opaque" : "transparent"}`);
    console.log(`clarinet click = ${isClarinetOpaque ? "opaque" : "transparent"}`);
    console.log(`banjo click = ${isBanjoOpaque ? "opaque" : "transparent"}`);
    console.log(`piano click = ${ispianoOpaque ? "opaque" : "transparent"}`);
    console.log(`trombone1 click = ${istrombone1Opaque ? "opaque" : "transparent"}`);
    console.log(`trombone2 click = ${istrombone2Opaque ? "opaque" : "transparent"}`);
    console.log(`cymbal click = ${iscymbalOpaque ? "opaque" : "transparent"}`);
    console.log(`kick click = ${iskickOpaque ? "opaque" : "transparent"}`);
    console.log(`snare click = ${issnareOpaque ? "opaque" : "transparent"}`);

    // Determine which instrument's sound to play
    let soundFile = "";

    if (isTrumpetOpaque) {
        soundFile = "trumpet-sound.mp3";
    } else if (isClarinetOpaque) {
        soundFile = "clarinet-sound.mp3";
    } else if (isBanjoOpaque) {
        soundFile = "banjo-sound.mp3";
    } else if (ispianoOpaque) {
        soundFile = "piano-sound.mp3";
    } else if (istrombone1Opaque) {
        soundFile = "trombone1-sound.mp3";
    } else if (istrombone2Opaque) {
        soundFile = "trombone2-sound.mp3";
    } else if (iscymbalOpaque) {
        soundFile = "cymbal-sound.mp3";
    } else if (iskickOpaque) {
        soundFile = "kick-sound.mp3";
    } else if (issnareOpaque) {
        soundFile = "snare-sound.mp3";
    }

    // If a valid instrument was clicked, play the sound
    if (soundFile) {
        try {
            const audio = new Audio(`img/${soundFile}`);
            audio.play()
                .then(() => console.log("Audio played successfully."))
                .catch((err) => console.error("Error playing audio:", err));
        } catch (err) {
            console.error("Audio creation failed:", err);
        }

        // Flash the instrument momentarily
        /*
        if (isTrumpetOpaque) document.getElementById("trumpet").style.opacity = 0.5;
        if (isClarinetOpaque) document.getElementById("clarinet").style.opacity = 0.5;
        if (isBanjoOpaque) document.getElementById("banjo").style.opacity = 0.5;
        if (ispianoOpaque) document.getElementById("piano").style.opacity = 0.5;
        if (istrombone1Opaque) document.getElementById("trombone1").style.opacity = 0.5;
        if (istrombone2Opaque) document.getElementById("trombone2").style.opacity = 0.5;
        if (iscymbalOpaque) document.getElementById("cymbal").style.opacity = 0.5;
        if (iskickOpaque) document.getElementById("kick").style.opacity = 0.5;
        if (issnareOpaque) document.getElementById("snare").style.filter = invert(100);

        setTimeout(() => {
            if (isTrumpetOpaque) document.getElementById("trumpet").style.opacity = 1;
            if (isClarinetOpaque) document.getElementById("clarinet").style.opacity = 1;
            if (isBanjoOpaque) document.getElementById("banjo").style.opacity = 1;
            if (ispianoOpaque) document.getElementById("piano").style.opacity = 1;
            if (istrombone1Opaque) document.getElementById("trombone1").style.opacity = 1;
            if (istrombone2Opaque) document.getElementById("trombone2").style.opacity = 1;
            if (iscymbalOpaque) document.getElementById("cymbal").style.opacity = 1;
            if (iskickOpaque) document.getElementById("kick").style.opacity = 1;
            if (issnareOpaque) document.getElementById("snare").style.filter = invert(100);
        }, 200); // Flash duration
        */
    } else {
        console.log("Clicked on a transparent pixel.");
    }
}

// Add event listeners to the instruments for the "mousedown" event
document.getElementById("trumpet").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("clarinet").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("banjo").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("piano").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("trombone1").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("trombone2").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("cymbal").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("kick").addEventListener("mousedown", handleInstrumentClick);
document.getElementById("snare").addEventListener("mousedown", handleInstrumentClick);
