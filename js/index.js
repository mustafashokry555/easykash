document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */

  let reader ='';
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
      dropZoneElement.querySelector("p").remove();
      dropZoneElement.querySelector("div").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
  

  ////////////////////////////////////////
  $("#next").click(function(){
    if(reader.result == undefined)
      $("#eventCover .error").html("Upload Event Cover");
    else
      $("#eventCover .error").html("");

    valid(  $(".eventName .error"),       $('input[name="event-name"]'),       "Enter valid event name");
    valid(  $(".eventLocation .error"),   $('input[name="event-location"]'),   "Enter valid Location");
    valid(  $(".eventStart .error"),      $('input[name="event-start"]'),      "Enter  date");
    valid(  $(".eventEnd .error"),        $('input[name="event-end"]'),        "Enter date");
    valid(  $(".eventDesc .error"),       $('textarea[name="event-desc"]'),    "Enter Event Description");

  })


  function valid(element,input,error)
  {
    if(input.val() == "")
      element.html(error);
    else
      element.html("");
  }
  //////////////////////////////////////////////////////
